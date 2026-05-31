import type { IDrillingWell } from '@/entities/well/model/types';
import { useFrame } from '@react-three/fiber';
import { useRef, useEffect, type JSX } from 'react';
import * as THREE from 'three';

interface DrillingBridgeProps {
  activeWell: IDrillingWell | undefined;
  drillStringRef: React.RefObject<THREE.Group | null>;
}

export const DrillingBridge = ({
  activeWell,
  drillStringRef,
}: DrillingBridgeProps): JSX.Element | null => {
  const targetY = useRef<number>(5.2);
  const currentRpm = useRef<number>(0);

  useEffect(() => {
    if (!activeWell) return;
    targetY.current = 5.2 - activeWell.currentDepth * 0.05;
    currentRpm.current = activeWell.rpm;
  }, [activeWell]);

  useFrame((_, delta) => {
    if (!drillStringRef.current) return;

    drillStringRef.current.position.y = THREE.MathUtils.damp(
      drillStringRef.current.position.y,
      targetY.current,
      4,
      delta,
    );

    if (currentRpm.current > 0) {
      const rotationSpeed = (currentRpm.current * (Math.PI * 2)) / 60;
      drillStringRef.current.rotation.y += rotationSpeed * delta;
    }
  });

  return null;
};
