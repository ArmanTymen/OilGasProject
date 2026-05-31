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

interface WellSceneProps {
  drillStringRef: React.RefObject<THREE.Group | null>;
  isFocusedOnBit: boolean;
  truckTrigger: number;
  children?: ReactNode;
}

const BIT_WORLD_POSITION: [number, number, number] = [-12, -124.8, -9];

export const WellScene = ({
  drillStringRef,
  isFocusedOnBit,
  truckTrigger,
  children,
}: WellSceneProps): JSX.Element => {
  const orbitControlsRef = useRef<OrbitControlsImpl>(null);

  return (
    <Canvas dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <Perf />
        <PerspectiveCamera makeDefault position={[35, 10, 85]} fov={45} />

        <OrbitControls
          ref={orbitControlsRef}
          makeDefault
          enableDamping
          maxDistance={200}
          minDistance={2}
          maxPolarAngle={Math.PI / 1.5}
          target={[25, 0, 75]}
        />

        <CameraController
          isFocused={isFocusedOnBit}
          bitPosition={BIT_WORLD_POSITION}
          controlsRef={orbitControlsRef}
        />

        <EnvironmentMask />
        <SceneEnvironment />

        {children}

        <Ground position={[0, -117.5, 0]} />
        <DrillString ref={drillStringRef} position={[-12, 5.2, -9]} />
        <OilReservoir position={[-16, -138, -9]} />
        <MainScene position={[0, 1.2, 0]} truckTrigger={truckTrigger} />
      </Suspense>
    </Canvas>
  );
};
