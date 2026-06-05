import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectChartWithStatus } from '@/entities/well/selectors/wellSelectors';

export interface ChartPoint {
  time: string;
  actual: number;
  plan: number;
}

export const useChart = () => {
  const { isLoading, error, totalActual, totalPlan } = useSelector(selectChartWithStatus);
  const [points, setPoints] = useState<ChartPoint[]>([]);

  useEffect(() => {
    if (totalActual === undefined) return;

    const actualValue = totalActual;
    const planValue = totalPlan;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('ru-RU', { hour12: false });

    queueMicrotask(() => {
      setPoints((prevPoints: ChartPoint[]) => {
        if (prevPoints.length === 0) {
          const initialHistory: ChartPoint[] = [];

          for (let i = 60; i > 0; i--) {
            const pastTime = new Date(now.getTime() - i * 5000);
            const noise = actualValue * (Math.random() * 0.002 - 0.001);

            initialHistory.push({
              time: pastTime.toLocaleTimeString('ru-RU', { hour12: false }),
              actual: Number((actualValue + noise).toFixed(2)),
              plan: planValue,
            });
          }

          return [...initialHistory, { time: timeStr, actual: actualValue, plan: planValue }];
        }

        const lastPoint = prevPoints[prevPoints.length - 1];
        if (lastPoint.time === timeStr) {
          if (lastPoint.actual !== actualValue || lastPoint.plan !== planValue) {
            return [
              ...prevPoints.slice(0, -1),
              { ...lastPoint, actual: actualValue, plan: planValue },
            ];
          }
          return prevPoints;
        }

        return [...prevPoints.slice(-199), { time: timeStr, actual: actualValue, plan: planValue }];
      });
    });
  }, [totalActual, totalPlan]);

  return { points, isLoading, error };
};
