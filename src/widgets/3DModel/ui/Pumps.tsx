import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { type GLTF } from 'three-stdlib';
import { useMemo, type JSX } from 'react';
import { type ThreeElements } from '@react-three/fiber';

interface PumpsformGLTF extends GLTF {
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material>;
}

type PumpsProps = ThreeElements['group'];

export const Pumps = (props: PumpsProps): JSX.Element => {
  const { scene } = useGLTF('/model/pump.glb') as unknown as PumpsformGLTF;

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
      <primitive object={scene} />
    </group>
  );
};

useGLTF.preload('/model/pump.glb');
