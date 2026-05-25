import type { ExtendedWell } from '@/widgets/Table/model/useWellData';
import * as XLSX from 'xlsx';

interface ExcelWorkerInput {
  filteredWells: ExtendedWell[];
}
self.onmessage = (e: MessageEvent<ExcelWorkerInput>) => {
  const { filteredWells } = e.data;
  const dataToExport = filteredWells.map(
    (well: ExtendedWell): Record<string, string | number | undefined> => ({
      Месторождение: well.fieldName,
      Куст: well.clusterName,
      Скважина: well.well,
      'Ток (I)': well.I,
      'Напряжение (U)': well.U,
      Давление: well.pressure,
      Температура: well.temperature,
      Дебит: well.debit,
      'Скорость потока': well.flowRate,
    }),
  );

  const worksheet = XLSX.utils.json_to_sheet(dataToExport);

  // Добавляем автоматическую ширину колонок (базовый расчет)
  const objectMaxLength: number[][] = dataToExport.map((row) =>
    Object.values(row).map((val) => val?.toString().length || 0),
  );

  const colWidths = objectMaxLength[0]?.map((_, i) => ({
    wch: Math.max(...objectMaxLength.map((row) => row[i]), 15),
  }));

  worksheet['!cols'] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Скважины');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  self.postMessage(excelBuffer);
};
