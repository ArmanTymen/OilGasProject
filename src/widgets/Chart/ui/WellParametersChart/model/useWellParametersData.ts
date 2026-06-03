import { socketClient, useGetDrillingStreamQuery, type IDrillingDelta } from '@/entities/well';
import { useEffect, useState, useRef } from 'react';

type ParamType = 'pressure' | 'gas' | 'rpm';

export interface ChartPoint {
  time: string;
  value: number;
}

export const useWellParametersData = (wellId: number | null, paramType: ParamType) => {
  const { data: wells, isLoading } = useGetDrillingStreamQuery();

  const [points, setPoints] = useState<ChartPoint[]>([]);

  const isInitialized = useRef<boolean>(false);
  const currentContext = useRef<{ wellId: number | null; paramType: ParamType | null }>({
    wellId: null,
    paramType: null,
  });

  useEffect(() => {
    if (!wellId || !wells) return;

    if (
      currentContext.current.wellId !== wellId ||
      currentContext.current.paramType !== paramType
    ) {
      isInitialized.current = false;
      currentContext.current = { wellId, paramType };
      setTimeout(() => setPoints([]), 0);
    }

    if (isInitialized.current) return;

    const well = wells.find((w) => w.id === wellId);
    if (!well) return;

    const initialHistory: ChartPoint[] = well.history.map((point) => ({
      time: new Date(point.timestamp).toLocaleTimeString('ru-RU', { hour12: false }),
      value:
        paramType === 'pressure'
          ? point.pumpPressure
          : paramType === 'gas'
            ? point.gasContent
            : point.rpm,
    }));

    setTimeout(() => setPoints(initialHistory.slice(-200)), 0);
    isInitialized.current = true;
  }, [wellId, wells, paramType]);

  useEffect(() => {
    if (!wellId) return;

    const handleUpdate = (deltas: IDrillingDelta[]) => {
      const delta = deltas.find((d) => d.id === wellId);

      if (!delta?.newHistoryPoint) return;

      const value =
        paramType === 'pressure'
          ? delta.newHistoryPoint.pumpPressure
          : paramType === 'gas'
            ? delta.newHistoryPoint.gasContent
            : delta.newHistoryPoint.rpm;

      const newPoint: ChartPoint = {
        time: new Date(delta.newHistoryPoint.timestamp).toLocaleTimeString('ru-RU', {
          hour12: false,
        }),
        value,
      };

      setPoints((prev) => [...prev.slice(-199), newPoint]);
    };

    socketClient.on('drilling:update', handleUpdate);

    return () => {
      socketClient.off('drilling:update', handleUpdate);
    };
  }, [wellId, paramType]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints((prev) => {
        if (!prev.length) return prev;

        const last = prev[prev.length - 1];
        const newIntervalPoint: ChartPoint = {
          time: new Date().toLocaleTimeString('ru-RU', { hour12: false }),
          value: last.value,
        };

        return [...prev.slice(-199), newIntervalPoint];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return {
    points,
    isLoading,
  };
};
