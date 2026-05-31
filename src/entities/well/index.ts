export { useGetDrillingStreamQuery } from './api/wellApi';

// Экспортируем нужные типы
export type {
  Well,
  WellData,
  IDrillingWell,
  IDrillingDelta,
  WellStatus,
  ProductionAnalytics,
  DepthData,
  IDrillingLimits,
  IDrillingHistoryPoint,
} from './model/types';

export { FIVE_MINUTES } from './model/constants';
