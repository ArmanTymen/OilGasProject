import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  type ChartOptions,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { useWellParametersData } from '../model/useWellParametersData';
import s from './WellParametersChartView.module.css';

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

interface Props {
  wellId: number | null;
  paramType: 'pressure' | 'gas' | 'rpm';
}

export const WellParametersChartView = ({ wellId, paramType }: Props) => {
  const { points, isLoading } = useWellParametersData(wellId, paramType);

  const chartData = useMemo(() => {
    const label =
      paramType === 'pressure'
        ? 'Давление (атм)'
        : paramType === 'gas'
          ? 'Содержание газа (%)'
          : 'Обороты (RPM)';

    return {
      labels: points.map((p) => p.time),
      datasets: [
        {
          label,
          data: points.map((p) => Number(p.value.toFixed(2))),
          borderColor: '#ff6600',
          backgroundColor: 'rgba(255,102,0,0.1)',
          tension: 0.3,
          fill: true,
          pointRadius: 2,
          pointHoverRadius: 5,
          spanGaps: false,
        },
      ],
    };
  }, [points, paramType]);

  const chartOptions: ChartOptions<'line'> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 0 },
      plugins: {
        zoom: {
          pan: { enabled: true, mode: 'x' },
          zoom: { wheel: { enabled: true }, mode: 'x' },
        },
        tooltip: { mode: 'index', intersect: false },
        legend: { display: true },
      },
      scales: {
        y: {
          beginAtZero: false,
          grid: {
            color: 'rgba(200,200,200,0.2)',
            drawBorder: true,
          },
          title: {
            display: true,
            text: paramType === 'pressure' ? 'атм' : paramType === 'gas' ? '%' : 'RPM',
          },
        },
        x: {
          offset: true,
          grid: {
            color: 'rgba(200,200,200,0.1)',
            drawTicks: true,
          },
          title: {
            display: true,
            text: 'Время',
          },
        },
      },
    }),
    [paramType],
  );

  if (isLoading) return <div className={s.loader}>Загрузка истории...</div>;
  if (!wellId || points.length === 0)
    return <div className={s.noData}>Нет данных для отображения</div>;

  return (
    <div className={s.chartContainer}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};
