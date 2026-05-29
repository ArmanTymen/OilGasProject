import { Suspense, useState, type JSX } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { SceneEnvironment } from './SceneEnvironment';
import { MainScene } from './MainScene';
import s from './Well3DVisualizer.module.css';
import { Perf } from 'r3f-perf';
import { Ground } from './Ground';
import { EnvironmentMask } from './EnvironmentMask';
import { DrillString } from './DrillString';
import { CameraController } from './CameraController';
import { OilReservoir } from './OilReservoir';

export const WellVisualizer = (): JSX.Element => {
  const [isFocusedOnBit, setIsFocusedOnBit] = useState<boolean>(false);

  const BIT_WORLD_POSITION: [number, number, number] = [-12, -124.8, -9];

  return (
    <div className={s.root} style={{ position: 'relative' }}>
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
          transition: 'background 0.3s',
        }}
      >
        {isFocusedOnBit ? 'Вернуть камеру назад' : 'Фокус на долото'}
      </button>

      <Canvas shadows>
        <Suspense fallback={null}>
          <Perf />
          <PerspectiveCamera makeDefault position={[15, 10, 20]} fov={45} />

          <OrbitControls
            makeDefault
            enableDamping
            maxDistance={200}
            minDistance={2}
            maxPolarAngle={Math.PI / 1.5}
          />

          <CameraController isFocused={isFocusedOnBit} bitPosition={BIT_WORLD_POSITION} />

          <EnvironmentMask />
          <SceneEnvironment />

          <group position={[0, 0, 0]}>
            <Ground position={[0, -117.5, 0]} />
            <DrillString position={[-12, 5.2, -9]} />
            <OilReservoir position={[-16, -138, -9]} />
            <MainScene position={[0, 1.2, 0]} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
};
