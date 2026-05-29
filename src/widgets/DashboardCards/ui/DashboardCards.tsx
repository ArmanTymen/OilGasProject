import { Paper, Typography, Skeleton } from '@mui/material';
import { useGetAnalyticsQuery, useGetWellStreamQuery } from '@/entities/well/api/wellApi';
import s from './DashboardCards.module.css';

export const DashboardCards = () => {
  const { data: analyticsData, isLoading: analyticsLoading } = useGetAnalyticsQuery();
  const { data: wellsData, isLoading: wellsLoading } = useGetWellStreamQuery();

  const isLoading = analyticsLoading || wellsLoading;

  if (isLoading || !analyticsData || !wellsData) {
    return (
      <section className={s.dashboardGrid}>
        {[1, 2, 3].map((i) => (
          <Paper key={i} sx={{ p: 3, borderLeft: '5px solid #ccc' }}>
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" height={60} />
          </Paper>
        ))}
      </section>
    );
  }

  const allWells = wellsData.flatMap((f) => f.clusters).flatMap((c) => c.wells);

  const activeWells = allWells.filter((w) => w.debit > 0).length;

  const criticalWells = allWells.filter(
    (w) => w.debit === 0 && w.pressure === 0 && w.temperature === 0,
  ).length;

  const cards = [
    { title: 'Суммарный дебит', value: `${analyticsData.totalActual} м³/сут`, color: '#4CAF50' },
    { title: 'Фонд в работе', value: `${activeWells} ед.`, color: '#2196F3' },
    { title: 'Аварийность', value: `${criticalWells} ед.`, color: '#f44336' },
  ];

  return (
    <section className={s.dashboardGrid}>
      {cards.map((card, idx) => (
        <Paper key={idx} sx={{ p: 3, borderLeft: `5px solid ${card.color}` }}>
          <Typography variant="subtitle2" color="text.secondary">
            {card.title}
          </Typography>
          <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
            {card.value}
          </Typography>
        </Paper>
      ))}
    </section>
  );
};
