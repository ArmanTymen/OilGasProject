import { useGetWellStreamQuery } from '@/entities/well/api/wellApi';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from '@mui/material';
import styles from './TopWellsTable.module.css';
import { useSelector } from 'react-redux';
import { selectTop5Wells } from '@/entities/well/model/wellSelectors';

export const TopWellsTable = () => {
  const { isLoading } = useGetWellStreamQuery();
  const top5 = useSelector(selectTop5Wells);

  // Находим максимум только из 5 элементов, а не из всего массива скважин
  const maxDebit = top5.length > 0 ? Math.max(...top5.map((w) => w.debit)) : 1;

  if (isLoading || top5.length === 0) return null;

  return (
    <section className={styles.root}>
      <Typography variant="h6" gutterBottom>
        Скважины по maximalьному дебиту
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell className={styles.headerCell}>Скважина</TableCell>
              <TableCell className={styles.headerCell}>Месторождение</TableCell>
              <TableCell className={styles.headerCell} align="right">
                Дебит (м³/сут)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {top5.map((well, index) => {
              const isEven = index % 2 === 1;
              return (
                <TableRow key={well.id} className={isEven ? styles.rowEven : styles.rowOdd}>
                  <TableCell>{well.well}</TableCell>
                  <TableCell>{well.fieldName}</TableCell>
                  <TableCell align="right" className={styles.debitCell}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          flex: 1,
                          height: 6,
                          borderRadius: 3,
                          bgcolor: '#e0e0e0',
                          overflow: 'hidden',
                          maxWidth: 80,
                        }}
                      >
                        <Box
                          sx={{
                            height: '100%',
                            borderRadius: 3,
                            bgcolor: well.debit > 100 ? '#2e7d32' : '#1976d2',
                            width: `${(well.debit / maxDebit) * 100}%`,
                          }}
                        />
                      </Box>
                      <Typography variant="body2" fontWeight={600}>
                        {well.debit.toFixed(1)}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};
