import type { WellData } from '@/entities/well/model/types';
import { useMemo, useState } from 'react';

type RawWellFromData = WellData['clusters'][number]['wells'][number];

export interface ExtendedWell extends RawWellFromData {
  fieldName: string;
  clusterName: string;
}

export const useWellData = (data: WellData[] | undefined) => {
  const [filterField, setFilterField] = useState('');
  const [filterCluster, setFilterCluster] = useState('');
  const [filterWell, setFilterWell] = useState('');
  const allWells = useMemo((): ExtendedWell[] => {
    return (
      data?.flatMap((f) =>
        f.clusters.flatMap((c) =>
          c.wells.map((w) => ({
            ...w,
            fieldName: f.field,
            clusterName: c.cluster,
            pressure: Number(w.pressure.toFixed(2)),
            temperature: Number(w.temperature.toFixed(2)),
            flowRate: Number(w.flowRate.toFixed(2)),
            debit: Number(w.debit.toFixed(2)),
            I: Number(w.I.toFixed(2)),
            U: Number(w.U.toFixed(2)),
          })),
        ),
      ) || []
    );
  }, [data]);

  const filteredWells = useMemo(() => {
    return allWells.filter(
      (well) =>
        (filterField === '' || well.fieldName === filterField) &&
        (filterCluster === '' || well.clusterName === filterCluster) &&
        (filterWell === '' || well.well.toLowerCase().includes(filterWell.toLowerCase())),
    );
  }, [allWells, filterField, filterCluster, filterWell]);

  return {
    allWells,
    filteredWells,
    setFilterField,
    setFilterCluster,
    setFilterWell,
    filterField,
    filterCluster,
    filterWell,
  };
};
