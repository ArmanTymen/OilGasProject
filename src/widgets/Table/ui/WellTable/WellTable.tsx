import { useRef } from 'react';
import {
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Box,
  TableSortLabel,
} from '@mui/material';
import { useVirtualizer } from '@tanstack/react-virtual';
import s from './WellTable.module.css';
import { useWellData } from '../../model/useWellData';
import { useWellSort } from '../../model/useWellSort';
import TableFilters from '../TableFilters/TableFilters';
import { WellRow } from '../WellRow/WellRow';
import { selectWellTableStatus } from '@/entities/well/selectors/wellSelectors';
import { useSelector } from 'react-redux';

export const WellTable = () => {
  const { isLoading, error } = useSelector(selectWellTableStatus);
  const parentRef = useRef<HTMLDivElement>(null);
  const {
    allWells,
    filteredWells,
    setFilterField,
    setFilterCluster,
    setFilterWell,
    filterField,
    filterCluster,
    filterWell,
  } = useWellData();

  const { sortField, sortDirection, handleSort, sortedWells, columns } = useWellSort(filteredWells);

  const rowVirtualizer = useVirtualizer({
    count: sortedWells.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 15,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  return (
    <div className={s.root}>
      <TableFilters
        allWells={allWells}
        filteredWells={filteredWells}
        filterField={filterField}
        filterCluster={filterCluster}
        filterWell={filterWell}
        setFilterField={setFilterField}
        setFilterCluster={setFilterCluster}
        setFilterWell={setFilterWell}
      />

      <TableContainer component={Paper} className={s.tableContainer} ref={parentRef}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.key} className={s.headerCell}>
                  <TableSortLabel
                    active={sortField === col.key}
                    direction={sortField === col.key ? sortDirection : 'asc'}
                    onClick={() => handleSort(col.key)}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" style={{ height: '400px' }}>
                  <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                    <CircularProgress size={40} />
                    <span>Загрузка данных скважин...</span>
                  </Box>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  align="center"
                  style={{ height: '400px', color: 'red' }}
                >
                  Ошибка при загрузке реестра
                </TableCell>
              </TableRow>
            ) : virtualRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" style={{ height: '400px' }}>
                  Нет данных по заданным фильтрам
                </TableCell>
              </TableRow>
            ) : (
              <>
                {virtualRows.length > 0 && (
                  <TableRow className={s.spacerRow} style={{ height: `${virtualRows[0].start}px` }}>
                    <TableCell colSpan={columns.length} style={{ padding: 0, border: 0 }} />
                  </TableRow>
                )}
                {virtualRows.map((virtualRow) => (
                  <WellRow key={virtualRow.key} well={sortedWells[virtualRow.index]} />
                ))}
                {virtualRows.length > 0 && (
                  <TableRow
                    className={s.spacerRow}
                    style={{ height: `${totalSize - virtualRows[virtualRows.length - 1].end}px` }}
                  >
                    <TableCell colSpan={columns.length} className={s.spacerCell} />
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
