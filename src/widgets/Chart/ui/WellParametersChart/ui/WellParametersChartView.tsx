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
  type ChartData,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { CircularProgress, Box } from '@mui/material';
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

interface WellParametersChartViewProps {
  wellId: number | null;
  paramType: 'pressure' | 'gas' | 'rpm';
}

export const WellParametersChartView = ({ wellId, paramType }: WellParametersChartViewProps) => {
  const { points, isLoading } = useWellParametersData(wellId, paramType);

  const chartData: ChartData<'line'> = useMemo(() => {
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
          grid: { color: 'rgba(200,200,200,0.2)' },
          title: {
            display: true,
            text: paramType === 'pressure' ? 'атм' : paramType === 'gas' ? '%' : 'RPM',
          },
        },
        x: {
          offset: true,
          grid: { color: 'rgba(200,200,200,0.1)' },
          title: { display: true, text: 'Время' },
        },
      },
    }),
    [paramType],
  );

  return (
    <div className={s.chartContainer}>
      {isLoading ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
          gap={2}
        >
          <CircularProgress size={40} style={{ color: '#ff6600' }} />
          <span style={{ color: '#6b7280', fontSize: '14px' }}>Загрузка истории...</span>
        </Box>
      ) : !wellId || points.length === 0 ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
          color="#6b7280"
        >
          Нет данных для отображения
        </Box>
      ) : (
        <Line data={chartData} options={chartOptions} />
      )}
    </div>
  );
};
