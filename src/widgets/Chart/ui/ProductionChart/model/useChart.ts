import { useEffect, useState, useRef } from 'react';
import { useGetDrillingStreamQuery } from '@/entities/well/api/wellApi';

export interface ChartPoint {
  time: string;
  actual: number;
  plan: number;
}

interface UseChartProps {
  wellId: number;
}

export const useChart = ({ wellId }: UseChartProps) => {
  const { data: drillingWells, isLoading, error } = useGetDrillingStreamQuery();
  const [points, setPoints] = useState<ChartPoint[]>([]);
  const isHistoryGenerated = useRef<boolean>(false);

  const latestMetrics = useRef<{ actual: number; plan: number }>({ actual: 0, plan: 0 });

  useEffect(() => {
    if (!drillingWells) return;

    const activeWell = drillingWells.find((w) => w.id === wellId);

    if (activeWell) {
      latestMetrics.current = {
        actual: activeWell.pumpPressure,
        plan: activeWell.limits?.maxPumpPressure || 150,
      };
    }
  }, [drillingWells, wellId]);

  useEffect(() => {
    if (!drillingWells || isHistoryGenerated.current) return;

    const initTimeoutId = setTimeout(() => {
      const now = Date.now();
      const initialPoints: ChartPoint[] = [];
      const targetActual = latestMetrics.current.actual;
      const targetPlan = latestMetrics.current.plan;

      const startValue = Math.max(0, targetActual - 20);
      const historyLength = 60;
      const stepIntervalMs = 5000;

      for (let i = historyLength; i >= 0; i--) {
        const time = new Date(now - i * stepIntervalMs).toLocaleTimeString('ru-RU', {
          hour12: false,
        });
        const progress = 1 - i / historyLength;
        const actualVal = startValue + (targetActual - startValue) * progress;

        initialPoints.push({
          time,
          actual: Math.round(actualVal),
          plan: targetPlan,
        });
      }

      setPoints(initialPoints);
      isHistoryGenerated.current = true;
    }, 0);

    const intervalId = setInterval(() => {
      const timeStr = new Date().toLocaleTimeString('ru-RU', { hour12: false });

      setPoints((prevPoints) => {
        if (prevPoints.length === 0) return prevPoints;

        const nextPoint: ChartPoint = {
          time: timeStr,
          actual: latestMetrics.current.actual,
          plan: latestMetrics.current.plan,
        };
        return [...prevPoints.slice(-199), nextPoint];
      });
    }, 5000);

    return () => {
      clearTimeout(initTimeoutId);
      clearInterval(intervalId);
    };
  }, [drillingWells]);

  useEffect(() => {
    if (wellId === 0 || !wellId) return;

    isHistoryGenerated.current = false;
    requestAnimationFrame(() => {
      setPoints((prev) => (prev.length === 0 ? prev : []));
    });
  }, [wellId]);

  return { points, isLoading, error };
};
