import { useEffect, useState, useRef } from 'react';
import { useGetAnalyticsQuery } from '@/entities/well/api/wellApi';

export interface ChartPoint {
  time: string;
  actual: number;
  plan: number;
}

export const useChart = () => {
  const { data, isLoading, error } = useGetAnalyticsQuery();
  const [points, setPoints] = useState<ChartPoint[]>([]);

  const isInitialized = useRef<boolean>(false);
  const latestData = useRef<{ actual: number; plan: number } | null>(null);

  useEffect(() => {
    if (data) {
      latestData.current = {
        actual: data.totalActual,
        plan: data.totalPlan,
      };
    }
  }, [data]);

  useEffect(() => {
    if (!data || isInitialized.current) return;

    const now = Date.now();
    const initialPoints: ChartPoint[] = [];
    const targetActual = data.totalActual;
    const targetPlan = data.totalPlan;

    const startValue = Math.max(0, targetActual - 5000);
    const historyLength = 60;

    for (let i = historyLength; i >= 0; i--) {
      const time = new Date(now - i * 5000).toLocaleTimeString('ru-RU', { hour12: false });
      const progress = 1 - i / historyLength;
      const actualVal = startValue + (targetActual - startValue) * progress;

      initialPoints.push({
        time,
        actual: Math.round(actualVal),
        plan: targetPlan,
      });
    }

    setTimeout(() => setPoints(initialPoints), 0);
    isInitialized.current = true;

    const interval = setInterval(() => {
      setPoints((prev) => {
        if (!latestData.current) return prev;

        const newPoint: ChartPoint = {
          time: new Date().toLocaleTimeString('ru-RU', { hour12: false }),
          actual: latestData.current.actual,
          plan: latestData.current.plan,
        };

        return [...prev.slice(-199), newPoint];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [data]);

  return { points, isLoading, error };
};
