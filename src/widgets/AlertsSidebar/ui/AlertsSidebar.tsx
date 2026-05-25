import { Box, Typography, Skeleton } from '@mui/material';
import s from './AlertsSidebar.module.css';

export const AlertsSidebar = () => {
  return (
    <>
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
    </>
  );
};
