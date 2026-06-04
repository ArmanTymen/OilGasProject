import { useEffect, useState } from 'react';
import { useGetDrillingStreamQuery } from '@/entities/well';
import { CircularProgress, Box } from '@mui/material';
import s from './WellParametersChart.module.css';
import { WellList } from './WellList';
import { WellParametersChartView } from './WellParametersChartView';

export const WellParametersChart = () => {
  const { data: wells, isLoading } = useGetDrillingStreamQuery();
  const [selectedWellId, setSelectedWellId] = useState<number | null>(null);
  const [paramType, setParamType] = useState<'pressure' | 'gas' | 'rpm'>('pressure');

  useEffect(() => {
    if (wells?.length && selectedWellId === null) {
      setTimeout(() => {
        setSelectedWellId(wells[0].id);
      }, 0);
    }
  }, [wells, selectedWellId]);

  const hasNoData = !isLoading && (!wells || wells.length === 0);

  return (
    <div className={s.wellParametersContainer}>
      <aside className={s.wellListSidebar}>
        {isLoading ? (
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress size={24} />
          </Box>
        ) : hasNoData ? (
          <div className={s.noDataInside}>Нет скважин</div>
        ) : (
          <WellList
            wells={wells ?? []}
            selectedWellId={selectedWellId}
            onSelectWell={setSelectedWellId}
          />
        )}
      </aside>

      <div className={s.chartArea}>
        <div className={s.paramButtons}>
          <button
            className={`${s.paramBtn} ${paramType === 'pressure' ? s.activeParam : ''}`}
            onClick={() => setParamType('pressure')}
            disabled={isLoading || hasNoData}
          >
            Давление (атм)
          </button>
          <button
            className={`${s.paramBtn} ${paramType === 'gas' ? s.activeParam : ''}`}
            onClick={() => setParamType('gas')}
            disabled={isLoading || hasNoData}
          >
            Содержание газа (%)
          </button>
          <button
            className={`${s.paramBtn} ${paramType === 'rpm' ? s.activeParam : ''}`}
            onClick={() => setParamType('rpm')}
            disabled={isLoading || hasNoData}
          >
            Обороты (RPM)
          </button>
        </div>

        <WellParametersChartView wellId={selectedWellId} paramType={paramType} />
      </div>
    </div>
  );
};
