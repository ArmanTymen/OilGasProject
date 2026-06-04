import { selectFlattenedWells } from '@/entities/well/selectors/wellSelectors';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

export const useWellData = () => {
  const [filterField, setFilterField] = useState('');
  const [filterCluster, setFilterCluster] = useState('');
  const [filterWell, setFilterWell] = useState('');

  const allWells = useSelector(selectFlattenedWells);

  const filteredWells = useMemo(() => {
    return allWells.filter((well) => {
      const matchField = !filterField || well.fieldName === filterField;

      const matchCluster = !filterCluster || well.clusterName === filterCluster;

      const matchWell = !filterWell || well.well.toLowerCase().includes(filterWell.toLowerCase());

      return matchField && matchCluster && matchWell;
    });
  }, [allWells, filterField, filterCluster, filterWell]);

  return {
    allWells,
    filteredWells,
    setFilterField,
    setFilterCluster,
    setFilterWell,
    filterField,
    filterCluster,
    filterWell,
  };
};
