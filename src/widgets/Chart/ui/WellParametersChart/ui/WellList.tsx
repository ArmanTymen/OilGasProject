import type { IDrillingWell } from '@/entities/well/model/types';
import s from './WellList.module.css';

interface WellListProps {
  wells: IDrillingWell[];
  selectedWellId: number | null;
  onSelectWell: (id: number) => void;
}

export const WellList = ({ wells, selectedWellId, onSelectWell }: WellListProps) => {
  return (
    <div className={s.wellList}>
      <h4>Скважины</h4>
      <ul>
        {wells.map((well) => (
          <li
            key={well.id}
            className={`${s.wellItem} ${selectedWellId === well.id ? s.selected : ''}`}
            onClick={() => onSelectWell(well.id)}
          >
            {well.wellName}
          </li>
        ))}
      </ul>
    </div>
  );
};
