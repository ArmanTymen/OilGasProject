import * as THREE from 'three';
import { Html, useGLTF } from '@react-three/drei';
import { type GLTF } from 'three-stdlib';
import { useMemo, type JSX } from 'react';
import { type ThreeElements } from '@react-three/fiber';
import { bubbleStyle, tailInnerStyle, tailStyle } from './SceneDirectorText';

interface WorkerGLTF extends GLTF {
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material>;
}

type WorkerProps = ThreeElements['group'] & {
  message?: string | null;
};

export const Worker = ({ message = null, ...props }: WorkerProps): JSX.Element => {
  const { scene } = useGLTF('/model/worker.glb') as unknown as WorkerGLTF;

  useMemo(() => {
    scene.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <group {...props} dispose={null}>
      {message && (
        <Html position={[0, 2.5, 0]} center distanceFactor={15} zIndexRange={[100, 0]}>
          <div style={bubbleStyle}>
            {message}
            <div style={tailStyle} />
            <div style={tailInnerStyle} />
          </div>
        </Html>
      )}

      <primitive object={scene} />
    </group>
  );
};

useGLTF.preload('/model/worker.glb');
