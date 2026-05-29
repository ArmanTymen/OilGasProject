import { Chart } from 'react-chartjs-2';
import s from './FieldProductionChart.module.css';
import { useFieldProductionData } from '../../model/useFieldProductionData';
import {
  buildFieldProductionChartData,
  fieldProductionChartOptions,
} from '../../model/fieldProductionConfig';
import type { ChartData } from 'chart.js';
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  BarController,
  LineController,
} from 'chart.js';

ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  BarController,
  LineController,
);

export const FieldProductionChart = () => {
  const { labels, values, totalDebit, isLoading, error } = useFieldProductionData();

  if (isLoading) return <div className={s.status}>Загрузка...</div>;
  if (error) return <div className={`${s.status} ${s.error}`}>Ошибка загрузки</div>;
  if (!labels.length) return null;

  return (
    <div className={s.root}>
      <div className={s.chartWrapper}>
        <Chart
          type="bar"
          data={buildFieldProductionChartData(labels, values) as unknown as ChartData<'bar'>}
          options={fieldProductionChartOptions(totalDebit)}
        />
      </div>
    </div>
  );
};
