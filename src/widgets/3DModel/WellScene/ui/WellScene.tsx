import { Suspense, useRef, type JSX, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { Perf } from 'r3f-perf';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { Ground } from '@/entities/surface/Ground/ui/Ground';
import { DrillString } from '@/entities/surface/DrillString';
import { OilReservoir } from '@/entities/underground/OilResorvoir';
import { MainScene } from '../../MainScene';
import { EnvironmentMask } from '@/entities/environment/EnvironmentMask/EnvironmentMask';
import { CameraController } from '../../CameraController';
import { SceneEnvironment } from '../../SceneEnvironment';
import { useGetDrillingStreamQuery } from '@/entities/well';
import { DEPTH_SCALE } from '@/entities/well/model/constants';

interface WellSceneProps {
  wellId: number;
  drillStringRef: React.RefObject<THREE.Group | null>;
  isFocusedOnBit: boolean;
  children?: ReactNode;
}

export const WellScene = ({
  drillStringRef,
  isFocusedOnBit,
  children,
  wellId,
}: WellSceneProps): JSX.Element => {
  const { data: wells } = useGetDrillingStreamQuery();
  const orbitControlsRef = useRef<OrbitControlsImpl>(null);

  const currentWell = wells?.find((w) => w.id === wellId);

  const bitWorldPosition: [number, number, number] = (() => {
    if (!currentWell?.bottomHoleCoord) return [-12, -124.8, -9]; // fallback
    const realDepth = Math.abs(currentWell.bottomHoleCoord.y);
    const visualDepth = realDepth * DEPTH_SCALE;
    const bitY = 5.2 - visualDepth;
    return [-12, bitY, -9];
  })();

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{
        powerPreference: 'high-performance',
        antialias: false,
        depth: true,
        stencil: false,
      }}
    >
      <Suspense fallback={null}>
        <Perf />
        <PerspectiveCamera makeDefault position={[25, 30, 40]} fov={45} />

        <OrbitControls
          ref={orbitControlsRef}
          makeDefault
          enableDamping
          maxDistance={200}
          minDistance={2}
          maxPolarAngle={Math.PI / 1.5}
          target={[-12, -30, -9]}
        />

        <CameraController
          isFocused={isFocusedOnBit}
          bitPosition={bitWorldPosition}
          controlsRef={orbitControlsRef}
        />

        <EnvironmentMask />
        <SceneEnvironment />
        {children}

        <Ground position={[0, -117.5, 0]} />
        <DrillString wellId={wellId} ref={drillStringRef} position={[-12, 5.2, -9]} />
        <OilReservoir position={[-16, -138, -9]} />
        <MainScene position={[0, 1.2, 0]} />
      </Suspense>
    </Canvas>
  );
};
