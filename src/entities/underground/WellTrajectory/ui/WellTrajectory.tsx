import React, { useEffect, useMemo, useRef, type JSX } from 'react';
import * as THREE from 'three';
import type { IDrillingDelta } from '../../../well/model/types';
import { socketClient } from '../../../well/api/socketClient';

interface WellTrajectoryProps {
  wellId: number;
}

export const WellTrajectory = React.memo(({ wellId }: WellTrajectoryProps): JSX.Element => {
  const geometry = useMemo(() => new THREE.BufferGeometry(), []);
  const material = useMemo(() => new THREE.LineBasicMaterial({ color: 'red', linewidth: 2 }), []);
  const line = useMemo(() => new THREE.Line(geometry, material), [geometry, material]);

  const historyPoints = useRef<THREE.Vector3[]>([]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useEffect(() => {
    if (!wellId) return;

    const handleUpdate = (deltas: IDrillingDelta[]) => {
      const delta = deltas.find((d) => d.id === wellId);

      if (delta && delta.bottomHoleCoord) {
        const newPoint = new THREE.Vector3(
          delta.bottomHoleCoord.x,
          delta.bottomHoleCoord.y,
          delta.bottomHoleCoord.z,
        );

        historyPoints.current.push(newPoint);

        if (historyPoints.current.length > 2000) {
          historyPoints.current.shift();
        }

        geometry.setFromPoints(historyPoints.current);
      }
    };

    socketClient.on('drilling:update', handleUpdate);

    return () => {
      socketClient.off('drilling:update', handleUpdate);
    };
  }, [wellId, geometry]);

  return <primitive object={line} />;
});
