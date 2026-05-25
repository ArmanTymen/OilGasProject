import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import s from './ProductionChart.module.css';
import { useGetAnalyticsQuery } from '@/entities/well/api/wellApi';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

type ChartPoint = {
  time: string;
  actual: number;
  plan: number;
};

export const ProductionChart = () => {
  const { data, isFetching, isLoading, error } = useGetAnalyticsQuery();
  const [points, setPoints] = useState<ChartPoint[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!data) return;
      setPoints((prev) =>
        [
          ...prev,
          {
            time: new Date().toLocaleTimeString(),
            actual: data.totalActual,
            plan: data.totalPlan,
          },
        ].slice(-30),
      );
    }, 10000);
    return () => clearInterval(interval);
  }, [data]);

  const chartData = {
    labels: points.map((p) => p.time),
    datasets: [
      {
        label: 'Фактическая добыча',
        data: points.map((p) => p.actual),
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        tension: 0.3,
        fill: true,
      },
      {
        label: 'План добычи',
        data: points.map((p) => p.plan),
        borderColor: '#2196F3',
        borderDash: [5, 5],
        backgroundColor: 'transparent',
        tension: 0.3,
      },
    ],
  };

  if (isLoading) return <div className={s.status}>Загрузка аналитики...</div>;
  if (error) return <div className={`${s.status} ${s.error}`}>Ошибка загрузки данных</div>;

  return (
    <div className={s.root}>
      <div className={s.header}>
        <button
          className={s.button}
          onClick={() => {
            if (!data) return;
            setPoints((prev) =>
              [
                ...prev,
                {
                  time: new Date().toLocaleTimeString(),
                  actual: data.totalActual,
                  plan: data.totalPlan,
                },
              ].slice(-30),
            );
          }}
          disabled={isFetching}
        >
          {isFetching ? 'Считаю...' : 'Обновить вручную'}
        </button>
      </div>

      <div className={s.chartWrapper}>
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 500 },
            scales: {
              y: { beginAtZero: false },
            },
          }}
        />
      </div>
    </div>
  );
};
