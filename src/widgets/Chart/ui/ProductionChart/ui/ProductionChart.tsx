import { useMemo } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  type TooltipItem,
  type ChartOptions,
  type ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import s from './ProductionChart.module.css';
import { useChart } from '../model/useChart';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  zoomPlugin,
);

export const ProductionChart = () => {
  const { points, isLoading, error } = useChart();

  const chartData: ChartData<'line'> = useMemo(
    () => ({
      labels: points.map((p) => p.time),
      datasets: [
        {
          label: 'Фактическая добыча',
          data: points.map((p) => p.actual),
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          tension: 0.3,
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 5,
          borderWidth: 2,
          spanGaps: false,
        },
        {
          label: 'План добычи',
          data: points.map((p) => p.plan),
          borderColor: '#2196F3',
          backgroundColor: 'transparent',
          tension: 0.3,
          fill: false,
          pointRadius: 0,
          pointHoverRadius: 5,
          borderWidth: 2,
          borderDash: [5, 5],
          spanGaps: false,
        },
      ],
    }),
    [points],
  );

  const chartOptions: ChartOptions<'line'> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 0 },
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            pointStyle: 'line',
            boxWidth: 16,
            boxHeight: 14,
            padding: 12,
          },
        },
        tooltip: {
          callbacks: {
            label: (context: TooltipItem<'line'>) => {
              const value = context.parsed.y;
              const label = context.dataset.label || '';
              let result = `${label}: ${value?.toLocaleString('ru-RU')}`;

              if (context.datasetIndex === 0) {
                const planDataset = context.chart.data.datasets[1];
                const planValue = planDataset.data[context.dataIndex] as number;
                if (planValue && planValue !== 0 && value !== null) {
                  const deviation = ((value - planValue) / planValue) * 100;
                  const sign = deviation >= 0 ? '+' : '';
                  result += ` (${sign}${deviation.toFixed(1)}%)`;
                }
              }
              return result;
            },
          },
        },
        zoom: {
          limits: {
            x: { min: 0, max: 'original' },
          },
          zoom: {
            wheel: { enabled: true },
            pinch: { enabled: true },
            mode: 'x',
          },
          pan: {
            enabled: true,
            mode: 'x',
          },
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          grid: {
            color: 'rgba(200,200,200,0.2)',
            drawBorder: true,
          },
        },
        x: {
          offset: true,
          grid: {
            color: 'rgba(200,200,200,0.1)',
            drawTicks: true,
          },
        },
      },
    }),
    [],
  );

  if (isLoading) return <div className={s.status}>Загрузка аналитики...</div>;
  if (error) return <div className={`${s.status} ${s.error}`}>Ошибка загрузки данных</div>;
  if (points.length === 0) return <div className={s.status}>Нет данных для отображения</div>;

  return (
    <div className={s.root}>
      <div className={s.chartWrapper}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};
