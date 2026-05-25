import React from 'react';
import { TableRow, TableCell } from '@mui/material';

interface WellRowProps {
  well: {
    well: string;
    fieldName: string;
    clusterName: string;
    I: number;
    U: number;
    pressure: number;
    temperature: number;
    debit: number;
    flowRate: number;
  };
}

export const WellRow = React.memo(({ well }: WellRowProps) => {
  return (
    <TableRow style={{ height: '50px' }}>
      <TableCell>{well.fieldName}</TableCell>
      <TableCell>{well.clusterName}</TableCell>
      <TableCell>{well.well}</TableCell>
      <TableCell>{well.I}</TableCell>
      <TableCell>{well.U}</TableCell>
      <TableCell>{well.pressure}</TableCell>
      <TableCell>{well.temperature}</TableCell>
      <TableCell>{well.debit}</TableCell>
      <TableCell>{well.flowRate}</TableCell>
    </TableRow>
  );
});
