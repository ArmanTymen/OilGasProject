import { useRef, type ReactElement } from 'react';
import { useGetWellStreamQuery } from '@/entities/well/api/wellApi';
import {
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { useVirtualizer } from '@tanstack/react-virtual';
import s from './WellTable.module.css';
import { useWellData } from '@widgets/Table/model/useWellData';
import TableFilters from '@widgets/Table/ui/TableFilters/TableFilters';
import { WellRow } from '@widgets/Table/ui/WellRow/WellRow';

function WellTable(): ReactElement {
  'use no memo';

  const { data, error, isLoading } = useGetWellStreamQuery('');
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
  } = useWellData(data);

  // Точечно отключаем реальное правило React 19 для несовместимых библиотек
  // eslint-disable-next-line react-hooks/incompatible-library
  const rowVirtualizer = useVirtualizer({
    count: filteredWells.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 15,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className={s.root}>
      {data && (
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
      )}
      <TableContainer component={Paper} className={s.tableContainer} ref={parentRef}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className={s.headerCell}>Мест.</TableCell>
              <TableCell className={s.headerCell}>Куст</TableCell>
              <TableCell className={s.headerCell}>Скважина</TableCell>
              <TableCell className={s.headerCell}>Ток</TableCell>
              <TableCell className={s.headerCell}>Напр.</TableCell>
              <TableCell className={s.headerCell}>Давление</TableCell>
              <TableCell className={s.headerCell}>Темп.</TableCell>
              <TableCell className={s.headerCell}>Дебит</TableCell>
              <TableCell className={s.headerCell}>Расход</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {virtualRows.length > 0 && (
              <TableRow className={s.spacerRow} style={{ height: `${virtualRows[0].start}px` }}>
                <TableCell colSpan={9} style={{ padding: 0, border: 0 }} />
              </TableRow>
            )}
            {virtualRows.map((virtualRow) => (
              <WellRow key={virtualRow.key} well={filteredWells[virtualRow.index]} />
            ))}
            {virtualRows.length > 0 && (
              <TableRow
                className={s.spacerRow}
                style={{ height: `${totalSize - virtualRows[virtualRows.length - 1].end}px` }}
              >
                <TableCell colSpan={9} className={s.spacerCell} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default WellTable;
