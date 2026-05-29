import { Suspense, type JSX } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { SceneEnvironment } from './SceneEnvironment';
import { MainScene } from './MainScene';
import s from './Well3DVisualizer.module.css';
import { Perf } from 'r3f-perf';
import { Ground } from './Ground';
import { EnvironmentMask } from './EnvironmentMask';

export const WellVisualizer = (): JSX.Element => {
  return (
    <div className={s.root}>
      <Canvas shadows>
        <Suspense fallback={null}>
          <Perf />
          <PerspectiveCamera makeDefault position={[15, 10, 20]} fov={45} />
          <OrbitControls
            makeDefault
            enableDamping
            maxDistance={80}
            minDistance={5}
            maxPolarAngle={Math.PI / 1.5}
          />

          <EnvironmentMask />
          <SceneEnvironment />
          <group position={[0, 0, 0]}>
            <Ground position={[0, -117.5, 0]} />
            <MainScene position={[0, 1.2, 0]} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
};
