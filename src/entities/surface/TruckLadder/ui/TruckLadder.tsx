import { useMemo, type JSX } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { type GLTF } from 'three-stdlib';
import { type ThreeElements } from '@react-three/fiber';

interface TruckLadderGLTF extends GLTF {
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material>;
}

type TruckLadderProps = ThreeElements['group'];

const darkMetalMaterial = new THREE.MeshStandardMaterial({
  color: '#2a2e33',
  roughness: 0.6,
  metalness: 0.5,
});

export const TruckLadder = (props: TruckLadderProps): JSX.Element => {
  const { scene } = useGLTF('/model/rump1.glb') as unknown as TruckLadderGLTF;

  const clonedScene = useMemo(() => {
    const clone = scene.clone();

    clone.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = darkMetalMaterial;
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
