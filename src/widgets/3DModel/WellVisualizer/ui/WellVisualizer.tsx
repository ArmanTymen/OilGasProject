import React, { useState, type JSX, type ReactNode } from 'react';
import * as THREE from 'three';
import s from './WellVisualizer.module.css';
import { WellScene } from '../../WellScene';
import { WellVisualizerControls } from '@/features/well-visualizer-controls/WellVisualizerControls';

interface WellVisualizerProps {
  wellId: number;
  drillStringRef: React.RefObject<THREE.Group | null>;
  children?: ReactNode;
}

export const WellVisualizer = React.memo(
  ({ drillStringRef, children, wellId }: WellVisualizerProps): JSX.Element => {
    const [isFocusedOnBit, setIsFocusedOnBit] = useState<boolean>(false);
    const handleToggleFocus = () => setIsFocusedOnBit((prev) => !prev);

    return (
      <div className={s.root}>
        <WellVisualizerControls isFocusedOnBit={isFocusedOnBit} onToggleFocus={handleToggleFocus} />

        <WellScene wellId={wellId} drillStringRef={drillStringRef} isFocusedOnBit={isFocusedOnBit}>
          {children}
        </WellScene>
      </div>
    );
  },
);
