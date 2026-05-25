import type { ExtendedWell } from "@/widgets/Table/model/useWellData";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// Воркер слушает сообщения от основного потока
self.onmessage = (e: MessageEvent) => {
    // fontBase64 — это наш шрифт, сконвертированный в строку, чтобы PDF "заговорил" по-русски
    const { filteredWells, fontBase64 } = e.data;

    // Инициализация PDF в альбомной ориентации ('l' - landscape)
    // Это важно для нефтегазовых таблиц, так как колонок обычно много
    const doc = new jsPDF({
        orientation: 'l',
        unit: 'mm',
        format: 'a4'
    });

    /** * РАБОТА СО ШРИФТОМ (Кириллица)
     * PDF библиотеки по умолчанию не поддерживают UTF-8. 
     * Мы используем виртуальную файловую систему (VFS), чтобы "подложить" свой шрифт.
     */
    doc.addFileToVFS("Roboto-Regular.ttf", fontBase64);
    doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
    doc.setFont("Roboto"); // Устанавливаем шрифт по умолчанию для всего документа

    // РИСУЕМ ШАПКУ ДОКУМЕНТА (Императивный подход)
    doc.setFontSize(18);
    doc.text("Технологический отчет по эксплуатации скважин", 14, 15);
    
    doc.setFontSize(10);
    doc.setTextColor(100); // Делаем дату серой
    doc.text(`Дата выгрузки: ${new Date().toLocaleString('ru-RU')}`, 14, 22);

    /**
     * ГЕНЕРАЦИЯ ТАБЛИЦЫ через плагин autoTable
     * Он автоматически разбивает данные на страницы и рисует заголовки на каждой новой странице.
     */
    autoTable(doc, {
        startY: 30, // Отступ сверху, чтобы не налезть на заголовок
        margin: { horizontal: 10 },
        
        // Стилизация: указываем наш шрифт, иначе в таблице будут пустые квадраты
        styles: { 
            font: "Roboto", 
            fontSize: 9,
            cellPadding: 3 
        },
        
        // Стили для заголовков таблицы
        headStyles: { 
            fillColor: [41, 128, 185], // Синий цвет (RGB)
            textColor: 255,
            fontStyle: 'normal'
        },

        head: [[
            'Месторождение', 
            'Куст', 
            'Скважина', 
            'Ток (I)', 
            'Напр. (U)', 
            'Давление', 
            'Темп.', 
            'Дебит', 
            'Поток'
        ]],

        body: filteredWells.map((well: ExtendedWell) => [
            well.fieldName,
            well.clusterName,
            well.well,
            well.I,
            well.U,
            well.pressure,
            well.temperature,
            well.debit,
            well.flowRate
        ]),
        didDrawPage: (data) => {
        const currentPage = data.pageNumber; // Номер текущей страницы
        
        doc.setFontSize(10);
        doc.setTextColor(150); // Серый цвет для футера

        // Текст: "Страница X"
        const text = `Страница ${currentPage}`;
        
        // Вычисляем позицию: низ страницы (A4 в ландшафте ~210мм высота)
        const pageSize = doc.internal.pageSize;
        const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        
        // Рисуем номер страницы внизу по центру
        doc.text(text, data.settings.margin.left, pageHeight - 10);
    },

    // ФИШКА ДЛЯ СОБЕСЕДОВАНИЯ: Условное форматирование
    // Если значение дебита слишком низкое, мы можем подсветить ячейку прямо в PDF
    didParseCell: (data) => {
    // Допустим, колонка "Дебит" имеет индекс 7
    if (data.section === 'body' && data.column.index === 7) {
        const rowData = filteredWells[data.row.index]; // Берем исходный объект скважины
        const fact = rowData.debit;
        const nominal = rowData.nominalDebit; // Номинал из базы

        // Если факт ниже номинала на 5% и более
        if (fact < nominal * 0.95) {
            data.cell.styles.textColor = [200, 0, 0]; // Красный текст
            data.cell.styles.fontStyle = 'bold';     // Жирный шрифт
            }
        }
    }
    });

    /**
     * ФИНАЛИЗАЦИЯ
     * Мы не скачиваем файл в воркере (у него нет доступа к DOM).
     * Мы отдаем бинарный буфер обратно в основной поток.
     */
    const pdfBuffer = doc.output('arraybuffer');
    self.postMessage(pdfBuffer);
};