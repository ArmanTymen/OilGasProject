import { Typography } from '@mui/material';
import s from './FADetailModal.module.css';

export const ParamRow = ({
  label,
  value,
  nominal,
  unit,
}: {
  label: string;
  value?: number;
  nominal?: number;
  unit?: string;
}) => {
  if (value === undefined || value === null) return null;
  const dev = nominal ? ((value - nominal) / nominal) * 100 : 0;
  const color = dev > 0 ? '#c62828' : dev < 0 ? '#2e7d32' : '#000';

  return (
    <Typography>
      <span className={s.paramLabel}>{label}:</span> {value.toFixed(2)}
      {unit}
      {nominal !== undefined && (
        <span className={s.deviation} style={{ color }}>
          (ном. {nominal.toFixed(2)}
          {unit}, {dev > 0 ? '+' : ''}
          {dev.toFixed(1)}%)
        </span>
      )}
    </Typography>
  );
};
