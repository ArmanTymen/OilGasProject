import { Suspense, useState, type JSX, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { SceneEnvironment } from './SceneEnvironment';
import { MainScene } from './MainScene';
import { Ground } from './Ground';
import { EnvironmentMask } from './EnvironmentMask';
import { DrillString } from './DrillString';
import { CameraController } from './CameraController';
import { OilReservoir } from './OilReservoir';
import { Perf } from 'r3f-perf';

interface WellVisualizerProps {
  drillStringRef: React.RefObject<THREE.Group | null>;
  children?: ReactNode;
}

export const WellVisualizer = ({ drillStringRef, children }: WellVisualizerProps): JSX.Element => {
  const [isFocusedOnBit, setIsFocusedOnBit] = useState<boolean>(false);
  const [truckTrigger, setTruckTrigger] = useState<number>(0);

  const BIT_WORLD_POSITION: [number, number, number] = [-12, -124.8, -9];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <button
        onClick={() => setIsFocusedOnBit((prev) => !prev)}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 10,
          padding: '10px 20px',
          background: isFocusedOnBit ? '#ff6600' : '#222222',
          color: '#ffffff',
          border: '1px solid #555555',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        {isFocusedOnBit ? 'Вернуть камеру назад' : 'Фокус на долото'}
      </button>

      <button
        onClick={() => setTruckTrigger((prev) => prev + 1)}
        style={{
          position: 'absolute',
          top: '70px',
          left: '20px',
          zIndex: 10,
          padding: '10px 20px',
          background: '#222222',
          color: '#ffffff',
          border: '1px solid #555555',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Перезапустить грузовик
      </button>

      <Canvas dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <Perf />
          <PerspectiveCamera makeDefault position={[35, 10, 85]} fov={45} />

          <OrbitControls
            makeDefault
            enableDamping
            maxDistance={200}
            minDistance={2}
            maxPolarAngle={Math.PI / 1.5}
            target={[25, 0, 75]}
          />

          <CameraController isFocused={isFocusedOnBit} bitPosition={BIT_WORLD_POSITION} />
          <EnvironmentMask />
          <SceneEnvironment />

          {children}

          <group position={[0, 0, 0]}>
            <Ground position={[0, -117.5, 0]} />
            <DrillString ref={drillStringRef} position={[-12, 5.2, -9]} />
            <OilReservoir position={[-16, -138, -9]} />

            <MainScene position={[0, 1.2, 0]} truckTrigger={truckTrigger} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
};
