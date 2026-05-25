import { Paper, Box, Typography, Skeleton } from '@mui/material';
import s from './HomePage.module.css';

const HomePage = () => {
  return (
    <main className={s.root}>
      <header className={s.hero}>
        <h1>Мониторинг месторождений</h1>
        <p>Оперативная сводка по состоянию фонда скважин</p>
      </header>

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

      <div className={s.contentLayout}>
        <section className={s.mainChart}>
          <Paper
            sx={{
              p: 3,
              height: 400,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#f9f9f9',
              border: '2px dashed #ddd',
            }}
          >
            <Box textAlign="center">
              <Typography variant="h6" color="text.secondary">
                ГРАФИК ДОБЫЧИ / КАРТА
              </Typography>
              <Typography variant="body2" color="text.disabled">
                Использовать Recharts для трендов или Leaflet для ГИС
              </Typography>
            </Box>
          </Paper>
        </section>

        <aside className={s.alertsAside}>
          <Typography variant="h6" gutterBottom>
            Последние алерты
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[1, 2, 3, 4].map((i) => (
              <Box key={i} sx={{ p: 1, borderBottom: '1px solid #eee' }}>
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="90%" />
              </Box>
            ))}
            <Typography
              variant="caption"
              color="text.disabled"
              sx={{ mt: 2, display: 'block', textAlign: 'center' }}
            >
              Фильтрация скважин по критическим параметрам (U, I, P)
            </Typography>
          </Box>
        </aside>
      </div>
    </main>
  );
};

export default HomePage;
