import type { JSX } from 'react';
import s from './WellVisualizerControls.module.css';
import { useSceneDirectorStore } from '@/features/scene-director/SceneDirector';

interface WellVisualizerControlsProps {
  isFocusedOnBit: boolean;
  onToggleFocus: () => void;
}

export const WellVisualizerControls = ({
  isFocusedOnBit,
  onToggleFocus,
}: WellVisualizerControlsProps): JSX.Element => {
  const startSequence = useSceneDirectorStore((state) => state.startFirstSequence);

  return (
    <div className={s.controlsContainer}>
      <button
        onClick={onToggleFocus}
        className={`${s.controlBtn} ${isFocusedOnBit ? s.btnActive : ''}`}
      >
        {isFocusedOnBit ? 'Вернуть камеру назад' : 'Фокус на долото'}
      </button>

      <button onClick={startSequence} className={s.controlBtn}>
        Перезапустить грузовик
      </button>
    </div>
  );
};
