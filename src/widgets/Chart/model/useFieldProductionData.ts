import { useGetWellStreamQuery } from '@/entities/well/api/wellApi';

export const useFieldProductionData = () => {
  const { data, isLoading, error } = useGetWellStreamQuery('');

  if (!data || isLoading || error)
    return { labels: [], values: [], totalDebit: 0, isLoading, error };

  const fieldTotals = new Map<string, number>();
  data.forEach((field) => {
    const totalDebit = field.clusters
      .flatMap((c) => c.wells)
      .reduce((sum, well) => sum + well.debit, 0);
    fieldTotals.set(field.field, (fieldTotals.get(field.field) || 0) + totalDebit);
  });

  const sortedFields = Array.from(fieldTotals.entries()).sort(([, a], [, b]) => b - a);
  const labels = sortedFields.map(([name]) => name);
  const values = sortedFields.map(([, value]) => value);
  const totalDebit = values.reduce((sum, v) => sum + v, 0);

  return { labels, values, totalDebit, isLoading, error };
};
