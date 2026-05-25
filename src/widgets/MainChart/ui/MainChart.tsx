import { Paper, Box, Typography } from '@mui/material';
import s from './MainChart.module.css';

export const MainChart = () => {
  return (
    <>
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
    </>
  );
};
