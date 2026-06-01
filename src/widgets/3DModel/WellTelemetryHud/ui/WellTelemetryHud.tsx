import type { Well } from '@/entities/well/model/types';
import s from './WellTelemetryHud.module.css';
interface WellTelemetryHudProps {
  activeWell: Well;
  onOpenModal: () => void;
  wellsCount: number;
  isTablet?: boolean;
  isMobile?: boolean;
}

export const WellTelemetryHud = ({
  activeWell,
  onOpenModal,
  wellsCount,
  isTablet,
  isMobile,
}: WellTelemetryHudProps) => {
  const isPressureExceeded = activeWell.pumpPressure > activeWell.limits.maxPumpPressure;

  if (isMobile) return null;
  if (isTablet) {
    return (
      <div className={s.hudOverlayTablet}>
        <div className={s.hudCardTablet}>
          <h3>{activeWell.wellName}</h3>
          <p>Статус: {activeWell.status}</p>
          <div>Глубина: {activeWell.currentDepth.toFixed(0)} м</div>
          <div>RPM: {activeWell.rpm}</div>
          <div>Давление: {Math.round(activeWell.pumpPressure)} атм</div>
          <button onClick={onOpenModal}>Сменить скважину ({wellsCount})</button>
        </div>
      </div>
    );
  }

  return (
    <div className={s.hudOverlay}>
      <div className={s.hudCard}>
        <h3>{activeWell.wellName}</h3>
        <p>
          Статус:{' '}
          <span className={s.statusBadge} data-status={activeWell.status}>
            {activeWell.status.toUpperCase()}
          </span>
        </p>
      </div>
      <div className={s.hudCard}>
        <span className={s.label}>Глубина забоя</span>
        <span className={s.value}>{activeWell.currentDepth.toFixed(2)} м</span>
      </div>
      <div className={s.hudCard}>
        <span className={s.label}>Скорость (ROP)</span>
        <span className={s.value}>{activeWell.rop} м/ч</span>
      </div>
      <div className={s.hudCard}>
        <span className={s.label}>Обороты ротора</span>
        <span className={s.value}>{activeWell.rpm} об/мин</span>
      </div>
      <div className={s.hudCard}>
        <span className={s.label}>Давление насоса</span>
        <span className={s.value} style={{ color: isPressureExceeded ? '#ff3333' : '#00ff66' }}>
          {Math.round(activeWell.pumpPressure)} / {activeWell.limits.maxPumpPressure} атм
        </span>
      </div>
      <button className={s.selectWellBtn} onClick={onOpenModal}>
        Выбрать скважину ({wellsCount})
      </button>
    </div>
  );
};
