import { useMemo, type JSX } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { type GLTF } from 'three-stdlib';
import { type ThreeElements } from '@react-three/fiber';

interface ContainersformGLTF extends GLTF {
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material>;
}

type ContainersProps = ThreeElements['group'];

export const Containers = (props: ContainersProps): JSX.Element => {
  const { scene } = useGLTF('/model/containers.glb') as unknown as ContainersformGLTF;

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
      <primitive object={clonedScene} />
    </group>
  );
};

useGLTF.preload('/model/containers.glb');
