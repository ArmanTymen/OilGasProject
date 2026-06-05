import type { ChartData, ChartOptions, TooltipItem } from 'chart.js';

const palette = [
  '#4CAF50',
  '#FF9800',
  '#2196F3',
  '#9C27B0',
  '#F44336',
  '#00BCD4',
  '#FFEB3B',
  '#795548',
  '#607D8B',
  '#E91E63',
];

export const buildFieldProductionChartData = (
  labels: string[],
  values: number[],
): ChartData<'bar' | 'line'> => ({
  labels,
  datasets: [
    {
      type: 'bar' as const,
      label: 'Добыча (м³/сут)',
      data: values,
      backgroundColor: labels.map((_, i) => palette[i % palette.length]),
      borderRadius: 4,
      order: 2,
    },
    {
      type: 'line' as const,
      label: 'Центры столбцов',
      data: values.map((v) => v / 2),
      borderColor: 'rgba(255, 99, 132, 0.8)',
      borderWidth: 2,
      pointRadius: 5,
      pointBackgroundColor: 'rgba(255, 99, 132, 1)',
      pointBorderColor: 'white',
      pointBorderWidth: 2,
      fill: false,
      tension: 0,
      order: 1,
    },
  ],
});

export const fieldProductionChartOptions = (totalDebit: number): ChartOptions<'bar'> => ({
  responsive: true,
  maintainAspectRatio: false,
  scales: { y: { beginAtZero: true } },
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (context: TooltipItem<'bar'>) => {
          const value = context.parsed.y;
          if (value === null) return '';
          const percentage = totalDebit > 0 ? ((value / totalDebit) * 100).toFixed(1) : '0.0';
          return `${value.toLocaleString('ru-RU')} м³/сут (${percentage}%)`;
        },
      },
    },
  },
});
