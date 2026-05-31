import type { JSX } from 'react';
import s from './WellVisualizerControls.module.css';

interface WellVisualizerControlsProps {
  isFocusedOnBit: boolean;
  onToggleFocus: () => void;
  onRestartTruck: () => void;
}

export const WellVisualizerControls = ({
  isFocusedOnBit,
  onToggleFocus,
  onRestartTruck,
}: WellVisualizerControlsProps): JSX.Element => {
  return (
    <div className={s.controlsContainer}>
      <button
        onClick={onToggleFocus}
        className={`${s.controlBtn} ${isFocusedOnBit ? s.btnActive : ''}`}
      >
        {isFocusedOnBit ? 'Вернуть камеру назад' : 'Фокус на долото'}
      </button>

      <button onClick={onRestartTruck} className={s.controlBtn}>
        Перезапустить грузовик
      </button>
    </div>
  );
};
