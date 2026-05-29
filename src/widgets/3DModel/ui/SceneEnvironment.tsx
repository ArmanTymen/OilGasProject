import { type JSX } from 'react';
import { Environment } from '@react-three/drei';

export const SceneEnvironment = (): JSX.Element => {
  return (
    <>
      <color attach="background" args={['#8fb6d6']} />

      <ambientLight intensity={0.2} />

      <directionalLight
        castShadow
        position={[40, 60, -20]}
        intensity={1.2}
        shadow-mapSize={[2048, 2048]}
      >
        <orthographicCamera attach="shadow-camera" args={[-60, 60, 60, -60, 0.1, 200]} />
      </directionalLight>

      <Environment preset="city" background={false} />
    </>
  );
};
