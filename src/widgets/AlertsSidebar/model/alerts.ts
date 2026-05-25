export interface AlertTemplate {
  type: 'warning' | 'error' | 'info';
  text: string;
}
export const ALERT_TEMPLATES: AlertTemplate[] = [
  { type: 'warning', text: 'Скачок напряжения на кусте №12' },
  { type: 'error', text: 'Остановка насоса на скв. 44-17' },
  { type: 'warning', text: 'Превышение температуры на УЭЦН-09' },
  { type: 'info', text: 'Плановое ТО на кусте №3 завершено' },
  { type: 'error', text: 'Обрыв связи с контроллером скв. 21-03' },
  { type: 'warning', text: 'Падение дебита ниже нормы на скв. 56-02' },
  { type: 'info', text: 'Запущена процедура опрессовки на кусте №8' },
  { type: 'error', text: 'Аварийное отключение УЭЦН-12' },
  { type: 'warning', text: 'Повышенная вибрация на скв. 33-11' },
  { type: 'info', text: 'Обновление прошивки контроллера куст №5' },
  { type: 'warning', text: 'Превышение давления на скв. 19-45' },
  { type: 'error', text: 'Порыв кабеля на кусте №7' },
  { type: 'info', text: 'Завершена замена датчика на скв. 88-01' },
  { type: 'warning', text: 'Низкий уровень масла в ТМПН-03' },
  { type: 'error', text: 'КЗ на выходе СУ скв. 62-09' },
  { type: 'info', text: 'Плановая остановка куста №1 на ремонт' },
  { type: 'warning', text: 'Отклонение по току на скв. 15-22' },
  { type: 'error', text: 'Загазованность на площадке куст №4' },
  { type: 'warning', text: 'Снижение изоляции кабеля УЭЦН-07' },
  { type: 'info', text: 'Закончена калибровка расходомера на кусте №9' },
];
