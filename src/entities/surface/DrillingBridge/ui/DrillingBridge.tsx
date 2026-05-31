import type { IDrillingDelta } from '@/entities/well';
import { socketClient } from '@/entities/well/api/socketClient';
import { useFrame } from '@react-three/fiber';
import React, { useRef, useEffect, type JSX } from 'react';
import * as THREE from 'three';

interface DrillingBridgeProps {
  wellId: number;
  drillStringRef: React.RefObject<THREE.Group | null>;
}

export const DrillingBridge = React.memo(
  ({ wellId, drillStringRef }: DrillingBridgeProps): JSX.Element | null => {
    const targetY = useRef<number>(5.2);
    const currentRpm = useRef<number>(0);

    useEffect(() => {
      if (!wellId) return;

      const handleDrillingUpdate = (deltas: IDrillingDelta[]) => {
        const delta = deltas.find((d) => d.id === wellId);

        if (delta) {
          targetY.current = 5.2 - delta.currentDepth * 0.05;

          if (delta.newHistoryPoint && delta.newHistoryPoint.rpm !== undefined) {
            currentRpm.current = delta.newHistoryPoint.rpm;
          }
        }
      };

      socketClient.on('drilling:update', handleDrillingUpdate);

      return () => {
        socketClient.off('drilling:update', handleDrillingUpdate);
      };
    }, [wellId]);

    console.log('Рендер DrillingBridge (3D)');

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
  },
);
