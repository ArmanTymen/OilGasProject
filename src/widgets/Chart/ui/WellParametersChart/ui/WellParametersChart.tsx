import { useEffect, useState } from 'react';
import { useGetDrillingStreamQuery } from '@/entities/well';
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

  if (isLoading) return <div className={s.loader}>Загрузка скважин...</div>;
  if (!wells || wells.length === 0) return <div className={s.noData}>Нет данных по скважинам</div>;

  return (
    <div className={s.wellParametersContainer}>
      <aside className={s.wellListSidebar}>
        <WellList wells={wells} selectedWellId={selectedWellId} onSelectWell={setSelectedWellId} />
      </aside>
      <div className={s.chartArea}>
        <div className={s.paramButtons}>
          <button
            className={`${s.paramBtn} ${paramType === 'pressure' ? s.activeParam : ''}`}
            onClick={() => setParamType('pressure')}
          >
            Давление (атм)
          </button>
          <button
            className={`${s.paramBtn} ${paramType === 'gas' ? s.activeParam : ''}`}
            onClick={() => setParamType('gas')}
          >
            Содержание газа (%)
          </button>
          <button
            className={`${s.paramBtn} ${paramType === 'rpm' ? s.activeParam : ''}`}
            onClick={() => setParamType('rpm')}
          >
            Обороты (RPM)
          </button>
        </div>
        <WellParametersChartView wellId={selectedWellId} paramType={paramType} />
      </div>
    </div>
  );
};
