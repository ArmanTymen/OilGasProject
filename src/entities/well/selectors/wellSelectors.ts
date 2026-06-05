import { createSelector } from '@reduxjs/toolkit';
import { wellApi } from '../api/wellApi';
import type { DashboardMetrics, ExtendedWell } from '../model/types';
interface ChartMetrics {
  totalActual: number;
  totalPlan: number;
}

export const selectWellQuery = wellApi.endpoints.getWellStream.select();

export const selectFlattenedWells = createSelector([selectWellQuery], (result): ExtendedWell[] => {
  const data = result.data;
  if (!data) return [];

  const res: ExtendedWell[] = [];
  for (let i = 0; i < data.length; i++) {
    const field = data[i];
    for (let j = 0; j < field.clusters.length; j++) {
      const cluster = field.clusters[j];
      for (let k = 0; k < cluster.wells.length; k++) {
        const well = cluster.wells[k];
        res.push({
          ...well,
          fieldName: field.field,
          clusterName: cluster.cluster,
        });
      }
    }
  }
  return res;
});

export const selectTop5Wells = createSelector([selectFlattenedWells], (wells): ExtendedWell[] => {
  return [...wells].sort((a, b) => b.debit - a.debit).slice(0, 5);
});

export const selectTop5WithStatus = createSelector(
  [selectWellQuery, selectTop5Wells],
  (queryResult, top5) => ({
    isLoading: queryResult.isLoading,
    top5,
  }),
);

export const selectDashboardMetrics = createSelector(
  [selectFlattenedWells],
  (wells): DashboardMetrics => {
    let totalActual = 0;
    let activeCount = 0;
    let criticalCount = 0;

    for (let i = 0; i < wells.length; i++) {
      const w = wells[i];
      totalActual += w.debit;

      if (w.debit > 0) {
        activeCount++;
      } else if (w.debit === 0 && w.pressure === 0 && w.temperature === 0) {
        criticalCount++;
      }
    }

    return {
      totalActual: Number(totalActual.toFixed(2)),
      activeCount,
      criticalCount,
    };
  },
);

export const selectChartMetrics = createSelector([selectFlattenedWells], (wells): ChartMetrics => {
  let totalActual = 0;
  for (let i = 0; i < wells.length; i++) {
    totalActual += wells[i].debit;
  }
  return {
    totalActual: Number(totalActual.toFixed(2)),
    totalPlan: 65500,
  };
});

export const selectDashboardWithStatus = createSelector(
  [selectWellQuery, selectDashboardMetrics],
  (queryResult, metrics) => ({
    isLoading: queryResult.isLoading,
    error: queryResult.error,
    ...metrics,
  }),
);

export const selectChartWithStatus = createSelector(
  [selectWellQuery, selectChartMetrics],
  (queryResult, metrics) => ({
    isLoading: queryResult.isLoading,
    error: queryResult.error,
    ...metrics,
  }),
);

export const selectFieldProductionData = createSelector([selectWellQuery], (result) => {
  const data = result.data;
  if (!data || result.isLoading || result.error) {
    return { labels: [], values: [], totalDebit: 0 };
  }
  const fieldTotals = new Map<string, number>();
  data.forEach((field) => {
    const totalDebit = field.clusters
      .flatMap((c) => c.wells)
      .reduce((sum, well) => sum + well.debit, 0);
    fieldTotals.set(field.field, (fieldTotals.get(field.field) || 0) + totalDebit);
  });
  const sortedFields = Array.from(fieldTotals.entries()).sort(([, a], [, b]) => b - a);
  const labels = sortedFields.map(([name]) => name);
  const values = sortedFields.map(([, value]) => value);
  const totalDebit = values.reduce((sum, v) => sum + v, 0);
  return { labels, values, totalDebit };
});

export const selectFieldProductionWithStatus = createSelector(
  [selectWellQuery, selectFieldProductionData],
  (queryResult, data) => ({
    isLoading: queryResult.isLoading,
    error: queryResult.error,
    ...data,
  }),
);

export const selectWellTableStatus = createSelector([selectWellQuery], (result) => ({
  isLoading: result.isLoading,
  error: result.error,
}));
