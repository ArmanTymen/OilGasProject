import { useState, useMemo } from 'react';
import type { ExtendedWell } from '@/entities/well/model/types';

export type SortField = keyof ExtendedWell | '';
export type SortDirection = 'asc' | 'desc';

export const useWellSort = (filteredWells: ExtendedWell[]) => {
  const [sortField, setSortField] = useState<SortField>('');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedWells = useMemo(() => {
    if (!sortField) return filteredWells;
    return [...filteredWells].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (aVal == null || bVal == null) return 0;
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });
  }, [filteredWells, sortField, sortDirection]);

  const columns: { key: SortField; label: string }[] = [
    { key: 'fieldName', label: 'Мест.' },
    { key: 'clusterName', label: 'Куст' },
    { key: 'well', label: 'Скважина' },
    { key: 'I', label: 'Ток' },
    { key: 'U', label: 'Напр.' },
    { key: 'pressure', label: 'Давление' },
    { key: 'temperature', label: 'Темп.' },
    { key: 'debit', label: 'Дебит' },
    { key: 'flowRate', label: 'Расход' },
  ];

  return { sortField, sortDirection, handleSort, sortedWells, columns };
};
