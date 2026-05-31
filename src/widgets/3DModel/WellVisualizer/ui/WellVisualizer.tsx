import { useState, type JSX, type ReactNode } from 'react';
import * as THREE from 'three';
import s from './WellVisualizer.module.css';
import { WellScene } from '../../WellScene';
import { WellVisualizerControls } from '@/features/well-visualizer-controls/WellVisualizerControls';

interface WellVisualizerProps {
  drillStringRef: React.RefObject<THREE.Group | null>;
  children?: ReactNode;
}

export const WellVisualizer = ({ drillStringRef, children }: WellVisualizerProps): JSX.Element => {
  const [isFocusedOnBit, setIsFocusedOnBit] = useState<boolean>(false);
  const [truckTrigger, setTruckTrigger] = useState<number>(0);

  const handleToggleFocus = () => setIsFocusedOnBit((prev) => !prev);
  const handleRestartTruck = () => setTruckTrigger((prev) => prev + 1);

  return (
    <div className={s.root}>
      <WellVisualizerControls
        isFocusedOnBit={isFocusedOnBit}
        onToggleFocus={handleToggleFocus}
        onRestartTruck={handleRestartTruck}
      />

      <WellScene
        drillStringRef={drillStringRef}
        isFocusedOnBit={isFocusedOnBit}
        truckTrigger={truckTrigger}
      >
        {children}
      </WellScene>
    </div>
  );
};
