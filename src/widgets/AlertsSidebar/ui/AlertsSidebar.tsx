import { Typography, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import { useAlerts } from '../model/useAlerts';
import s from './AlertsSidebar.module.css';
import { formatAlertTime, TYPE_ICONS } from '../model/TYPE_ICONS';

export const AlertsSidebar = () => {
  const { alerts, currentTime } = useAlerts();

  return (
    <aside className={s.alertsAside}>
      <Typography variant="h6" gutterBottom>
        Последние алерты
      </Typography>
      <List dense>
        {alerts.map((alert, idx) => (
          <ListItem key={idx} disablePadding className={s.alertItem}>
            <ListItemIcon sx={{ minWidth: 36 }}>{TYPE_ICONS[alert.type]}</ListItemIcon>
            <ListItemText
              primary={alert.text}
              secondary={formatAlertTime(currentTime)}
              primaryTypographyProps={{ variant: 'body2' }}
              secondaryTypographyProps={{ variant: 'caption' }}
            />
            <Chip
              label={
                alert.type === 'error' ? 'Критично' : alert.type === 'warning' ? 'Внимание' : 'Инфо'
              }
              size="small"
              color={
                alert.type === 'error' ? 'error' : alert.type === 'warning' ? 'warning' : 'info'
              }
              variant="outlined"
              sx={{ ml: 1 }}
            />
          </ListItem>
        ))}
      </List>
      <Typography
        variant="caption"
        color="text.disabled"
        sx={{ mt: 2, display: 'block', textAlign: 'center' }}
      >
        Фильтрация скважин по критическим параметрам (U, I, P)
      </Typography>
    </aside>
  );
};
