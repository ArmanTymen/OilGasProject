import { useMemo } from 'react';
import { useGetDrillingStreamQuery } from '@/entities/well';

type ParamType = 'pressure' | 'gas' | 'rpm';

export interface ChartPoint {
  time: string;
  value: number;
}

export const useWellParametersData = (wellId: number | null, paramType: ParamType) => {
  const { data: wells, isLoading } = useGetDrillingStreamQuery();

  const points = useMemo<ChartPoint[]>(() => {
    if (!wellId || !wells) {
      return [];
    }

    const well = wells.find((w) => w.id === wellId);

    if (!well || !well.history) {
      return [];
    }

    return well.history.slice(-200).map((point) => {
      let value: number;

      switch (paramType) {
        case 'pressure':
          value = point.pumpPressure;
          break;
        case 'gas':
          value = point.gasContent;
          break;
        case 'rpm':
          value = point.rpm;
          break;
      }

      return {
        time: new Date(point.timestamp).toLocaleTimeString('ru-RU', { hour12: false }),
        value,
      };
    });
  }, [wellId, wells, paramType]);

  return {
    points,
    isLoading,
  };
};
