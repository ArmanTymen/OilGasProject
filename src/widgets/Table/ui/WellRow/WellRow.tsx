import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import type { ExtendedWell } from '@/entities/well/model/types';

interface WellRowProps {
  well: ExtendedWell & {
    nominalI?: number;
    nominalU?: number;
    nominalDebit?: number;
    nominalTemperature?: number;
    nominalPressure?: number;
    nominalFlowRate?: number;
  };
}

const DEVIATION_THRESHOLD = 10;

const isDeviated = (actual: number, nominal: number): boolean => {
  if (nominal === 0) return false;
  const deviation = Math.abs((actual - nominal) / nominal) * 100;
  return deviation > DEVIATION_THRESHOLD;
};

interface CellProps {
  value: number;
  nominal?: number;
}

const Cell = ({ value, nominal }: CellProps) => {
  const deviated = nominal !== undefined && isDeviated(value, nominal);

  return (
    <TableCell sx={deviated ? { color: '#d32f2f', fontWeight: 600 } : undefined}>
      {value.toFixed(2)}
    </TableCell>
  );
};

export const WellRow = React.memo(({ well }: WellRowProps) => {
  return (
    <TableRow style={{ height: '50px' }}>
      <TableCell>{well.fieldName}</TableCell>
      <TableCell>{well.clusterName}</TableCell>
      <TableCell>{well.well}</TableCell>

      <Cell value={well.I} nominal={well.nominalI} />
      <Cell value={well.U} nominal={well.nominalU} />
      <Cell value={well.pressure} nominal={well.nominalPressure} />
      <Cell value={well.temperature} nominal={well.nominalTemperature} />
      <Cell value={well.debit} nominal={well.nominalDebit} />
      <Cell value={well.flowRate} nominal={well.nominalFlowRate} />
    </TableRow>
  );
});

WellRow.displayName = 'WellRow';
