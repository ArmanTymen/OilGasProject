import { useMemo } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import s from './TableFilters.module.css';
import ExportButtons from '../ExportButtons/ExportButtons';
import type { ExtendedWell } from '@widgets/Table/model/useWellData';

interface TableFiltersProps {
  allWells: ExtendedWell[];
  filteredWells: ExtendedWell[];
  filterField: string;
  filterCluster: string;
  filterWell: string;
  setFilterField: (val: string) => void;
  setFilterCluster: (val: string) => void;
  setFilterWell: (val: string) => void;
}

function TableFilters({
  allWells,
  setFilterField,
  setFilterCluster,
  setFilterWell,
  filterField,
  filterCluster,
  filterWell,
  filteredWells,
}: TableFiltersProps) {
  const fields = useMemo(() => [...new Set(allWells.map((w) => w.fieldName))], [allWells]);

  const clusters = useMemo(() => {
    const list = filterField ? allWells.filter((w) => w.fieldName === filterField) : allWells;
    return [...new Set(list.map((w) => w.clusterName))];
  }, [allWells, filterField]);

  return (
    <div className={s.root}>
      <div className={s.filters}>
        <FormControl size="small" className={s.filterItem}>
          <InputLabel>Месторождение</InputLabel>
          <Select
            label="Месторождение"
            value={filterField}
            onChange={(e) => {
              setFilterField(e.target.value);
              setFilterCluster('');
            }}
          >
            <MenuItem value="">Все</MenuItem>
            {fields.map((f) => (
              <MenuItem key={f} value={f}>
                {f}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" className={s.filterItem} disabled={!filterField}>
          <InputLabel>Куст</InputLabel>
          <Select
            label="Куст"
            value={filterCluster}
            onChange={(e) => setFilterCluster(e.target.value)}
          >
            <MenuItem value="">Все</MenuItem>
            {clusters.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Поиск скважины"
          size="small"
          variant="outlined"
          value={filterWell}
          onChange={(e) => setFilterWell(e.target.value)}
          className={s.filterItem}
        />

        <div className={s.actions}>
          <ExportButtons
            filteredWells={filteredWells}
            setFilterField={setFilterField}
            setFilterCluster={setFilterCluster}
            setFilterWell={setFilterWell}
          />
        </div>
      </div>
    </div>
  );
}

export default TableFilters;
