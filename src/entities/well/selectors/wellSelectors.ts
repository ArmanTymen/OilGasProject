import { createSelector } from '@reduxjs/toolkit';
import { wellApi } from '../api/wellApi';
import type { DashboardMetrics, ExtendedWell } from '../model/types';

const selectWellQuery = wellApi.endpoints.getWellStream.select();

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

interface ChartMetrics {
  totalActual: number;
  totalPlan: number;
}

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
