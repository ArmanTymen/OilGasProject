import { Paper, Typography, Skeleton } from '@mui/material';
import s from './DashboardCards.module.css';

export const DashboardCards = () => {
  return (
    <>
      <section className={s.dashboardGrid}>
        {[1, 2, 3].map((i) => (
          <Paper key={i} sx={{ p: 3, borderLeft: '5px solid #ccc' }}>
            <Typography variant="subtitle2" color="text.secondary">
              {i === 1
                ? 'TODO: Суммарный дебит'
                : i === 2
                  ? 'TODO: Фонд в работе'
                  : 'TODO: Аварийность'}
            </Typography>
            <Skeleton variant="text" width="60%" height={40} />
          </Paper>
        ))}
      </section>
    </>
  );
};
