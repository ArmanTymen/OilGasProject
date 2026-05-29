// model/useFieldMapState.ts
import { useState, useMemo } from 'react';
import { useGetWellStreamQuery } from '@/entities/well/api/wellApi';

export const useFieldMapState = () => {
  const { data, isLoading } = useGetWellStreamQuery();
  const [selectedFieldId, setSelectedFieldId] = useState<number | null>(null);
  const [selectedClusterId, setSelectedClusterId] = useState<number | null>(null);
  const [selectedWellId, setSelectedWellId] = useState<number | null>(null);

  const selectedField = data?.find((f) => f.id === selectedFieldId);
  const selectedCluster = selectedField?.clusters.find((c) => c.id === selectedClusterId);

  const selectedWell = useMemo(() => {
    if (!selectedCluster || !selectedField || selectedWellId === null) return null;
    const wellData = selectedCluster.wells.find((w) => w.id === selectedWellId);
    if (!wellData) return null;
    return {
      ...wellData,
      fieldName: selectedField.field,
      clusterName: selectedCluster.cluster,
    };
  }, [selectedCluster, selectedField, selectedWellId]);

  return {
    data,
    isLoading,
    selectedField,
    selectedCluster,
    selectedWell,
    selectedFieldId,
    selectedClusterId,
    setSelectedFieldId,
    setSelectedClusterId,
    setSelectedWellId,
  };
};
