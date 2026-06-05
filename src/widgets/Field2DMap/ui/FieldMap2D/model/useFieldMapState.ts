import { useState, useMemo } from 'react';
import type { WellData } from '@/entities/well';
import type { Cluster, SelectedWellExtended } from '@/entities/well/model/types';
import { useSelector } from 'react-redux';
import { selectWellQuery } from '@/entities/well/selectors/wellSelectors';
interface FieldMapStateResult {
  data: WellData[] | undefined;
  isLoading: boolean;
  selectedField: WellData | undefined;
  selectedCluster: Cluster | undefined;
  selectedWell: SelectedWellExtended | null;
  selectedFieldId: number | null;
  selectedClusterId: number | null;
  setSelectedFieldId: (id: number | null) => void;
  setSelectedClusterId: (id: number | null) => void;
  setSelectedWellId: (id: number | null) => void;
}

export const useFieldMapState = (): FieldMapStateResult => {
  const { data, isLoading } = useSelector(selectWellQuery);
  const [selectedFieldId, setSelectedFieldId] = useState<number | null>(null);
  const [selectedClusterId, setSelectedClusterId] = useState<number | null>(null);
  const [selectedWellId, setSelectedWellId] = useState<number | null>(null);

  const selectedField = useMemo(() => {
    if (!data || !selectedFieldId) return undefined;
    return data.find((f) => f.id === selectedFieldId);
  }, [data, selectedFieldId]);

  const selectedCluster = useMemo(() => {
    if (!selectedField || !selectedClusterId) return undefined;
    return selectedField.clusters.find((c) => c.id === selectedClusterId);
  }, [selectedField, selectedClusterId]);

  const selectedWell = useMemo<SelectedWellExtended | null>(() => {
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
