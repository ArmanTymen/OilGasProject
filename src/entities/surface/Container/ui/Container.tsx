import { useMemo, type JSX } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { type GLTF } from 'three-stdlib';
import { type ThreeElements } from '@react-three/fiber';

interface ContainerformGLTF extends GLTF {
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material>;
}

type ContainerProps = ThreeElements['group'];

export const Container = (props: ContainerProps): JSX.Element => {
  const { scene } = useGLTF('/model/container.glb') as unknown as ContainerformGLTF;

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

useGLTF.preload('/model/container.glb');
