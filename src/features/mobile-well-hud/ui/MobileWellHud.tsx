import { getStatusColor, getStatusDisplayText } from '@/entities/well/lib/wellStatusUtils';
import type { IDrillingWell } from '@/entities/well';
import s from './MobileWellHud.module.css';

interface MobileWellHudProps {
  activeWell: IDrillingWell;
  wells: IDrillingWell[];
  selectedWellId: number;
  onWellChange: (id: number) => void;
}

export const MobileWellHud = ({
  activeWell,
  wells,
  selectedWellId,
  onWellChange,
}: MobileWellHudProps) => {
  return (
    <div className={s.hud}>
      <div>
        Статус:{' '}
        <span
          style={{
            color: getStatusColor(activeWell.status),
            fontWeight: 'bold',
            fontSize: '1.1em',
          }}
        >
          {getStatusDisplayText(activeWell.status)}
        </span>
      </div>
      <div>Глубина: {activeWell.currentDepth.toFixed(2)} м</div>
      <div>RPM: {activeWell.rpm.toFixed(2)}</div>
      <div>Давление: {activeWell.pumpPressure.toFixed(2)} атм</div>
      <select
        className={s.wellSelect}
        value={selectedWellId}
        onChange={(e) => onWellChange(Number(e.target.value))}
      >
        {wells.map((well) => (
          <option key={well.id} value={well.id}>
            {well.wellName}
          </option>
        ))}
      </select>
    </div>
  );
};
