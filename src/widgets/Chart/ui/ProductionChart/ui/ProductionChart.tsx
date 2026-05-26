import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  type TooltipItem,
  type ChartOptions,
  type ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import s from './ProductionChart.module.css';
import { useChart } from '../../../model/useChart';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  zoomPlugin,
);

export const ProductionChart = () => {
  const { points, isLoading, error } = useChart();

  if (isLoading) return <div className={s.status}>Загрузка аналитики...</div>;
  if (error) return <div className={`${s.status} ${s.error}`}>Ошибка загрузки данных</div>;

  const chartData: ChartData<'line'> = {
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
        borderWidth: 2,
      },
      {
        label: 'План добычи',
        data: points.map((p) => p.plan),
        borderColor: '#2196F3',
        backgroundColor: 'transparent',
        tension: 0.3,
        fill: false,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 250 },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      y: {
        beginAtZero: false,
      },
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
          // Индекс 0 — это абсолютное начало твоего текущего массива points
          x: { min: 0, max: 'original' },
        },
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          // Зум работает только по оси времени (X)
          mode: 'x',
        },
        pan: {
          enabled: true,
          // Скролл работает СТРОГО влево/вправо по оси X.
          // Это отключает блокировку, если случайно потянуть график вниз или вверх.
          mode: 'x',
        },
      },
    },
  };

  return (
    <div className={s.root}>
      <div className={s.chartWrapper}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};
