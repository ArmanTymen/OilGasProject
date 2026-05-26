import { useEffect, useState, useRef } from 'react';
import { useGetAnalyticsQuery } from '@/entities/well/api/wellApi';

type ChartPoint = {
  time: string;
  actual: number;
  plan: number;
};

export const useChart = () => {
  const { data, isLoading, error } = useGetAnalyticsQuery();
  const [points, setPoints] = useState<ChartPoint[]>([]);

  const isInitialized = useRef<boolean>(false);

  useEffect(() => {
    if (!data) return;

    if (!isInitialized.current) {
      const now = Date.now();
      const initialPoints: ChartPoint[] = [];
      const targetActual = data.totalActual;
      const targetPlan = data.totalPlan;
      const startValue = 55000;
      const historyLength = 60;

      for (let i = historyLength; i >= 0; i--) {
        const time = new Date(now - i * 10000).toLocaleTimeString();
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
    }

    const interval = setInterval(() => {
      setPoints((prev) => {
        const newPoints = [
          ...prev,
          {
            time: new Date().toLocaleTimeString(),
            actual: data.totalActual,
            plan: data.totalPlan,
          },
        ];

        return newPoints.slice(-1000);
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [data]);

  return { points, isLoading, error };
};
