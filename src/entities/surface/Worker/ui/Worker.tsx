import { useMemo, type JSX } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { type GLTF } from 'three-stdlib';
import { type ThreeElements } from '@react-three/fiber';
import { SpeechBubble } from '@/shared/ui/SpeechBubble';

interface WorkerGLTF extends GLTF {
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material>;
}

type WorkerProps = ThreeElements['group'] & {
  message?: string | null;
};

export const Worker = ({ message = null, ...props }: WorkerProps): JSX.Element => {
  const { scene } = useGLTF('/model/worker.glb') as unknown as WorkerGLTF;

  // Изолируем модификацию теней на уровне инстанса компонента
  const clonedScene = useMemo(() => {
    const clone = scene.clone();

    clone.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    return clone;
  }, [scene]);

  return (
    <group {...props} dispose={null}>
      {message && <SpeechBubble message={message} position={[0, 2.5, 0]} />}

      <primitive object={clonedScene} />
    </group>
  );
};

useGLTF.preload('/model/worker.glb');
