import { useMemo, type JSX } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { type GLTF } from 'three-stdlib';
import { type ThreeElements } from '@react-three/fiber';

interface PumpsformGLTF extends GLTF {
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material>;
}

type PumpsProps = ThreeElements['group'];

export const Pumps = (props: PumpsProps): JSX.Element => {
  const { scene } = useGLTF('/model/pump.glb') as unknown as PumpsformGLTF;

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

useGLTF.preload('/model/pump.glb');
