import { Paper, Typography, Skeleton } from '@mui/material';
import s from './DashboardCards.module.css';
import { useSelector } from 'react-redux';
import { selectDashboardWithStatus } from '@/entities/well/selectors/wellSelectors';

export const DashboardCards = () => {
  const { isLoading, totalActual, activeCount, criticalCount } =
    useSelector(selectDashboardWithStatus);

  if (isLoading) {
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

  const cards = [
    { title: 'Суммарный дебит', value: `${totalActual} м³/сут`, color: '#4CAF50' },
    { title: 'Фонд в работе', value: `${activeCount} ед.`, color: '#2196F3' },
    { title: 'Аварийность', value: `${criticalCount} ед.`, color: '#f44336' },
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
