import s from './WellVisualizerControls.module.css';
import { useSceneDirectorStore } from '@/features/scene-director/SceneDirector';

interface WellVisualizerControlsProps {
  isFocusedOnBit: boolean;
  onToggleFocus: () => void;
  isTablet?: boolean;
  isMobile?: boolean;
}

export const WellVisualizerControls = ({
  isFocusedOnBit,
  onToggleFocus,
  isTablet,
  isMobile,
}: WellVisualizerControlsProps) => {
  const startSequence = useSceneDirectorStore((state) => state.startFirstSequence);

  if (isMobile) return null;

  return (
    <div className={`${s.controlsContainer} ${isTablet ? s.tabletControls : ''}`}>
      <button
        onClick={onToggleFocus}
        className={`${s.controlBtn} ${isFocusedOnBit ? s.btnActive : ''}`}
      >
        {isFocusedOnBit ? 'Вернуть' : 'Фокус на долото'}
      </button>
      {!isTablet && (
        <button onClick={startSequence} className={s.controlBtn}>
          Перезапустить грузовик
        </button>
      )}
    </div>
  );
};
