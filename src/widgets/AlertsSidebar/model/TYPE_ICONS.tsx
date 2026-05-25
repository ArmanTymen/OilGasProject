import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export const TYPE_ICONS = {
  warning: <WarningAmberIcon color="warning" />,
  error: <ErrorOutlineIcon color="error" />,
  info: <InfoOutlinedIcon color="info" />,
};

export const formatAlertTime = (date: Date): string =>
  date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
