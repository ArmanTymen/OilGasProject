import { useMemo, type JSX } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { type GLTF } from 'three-stdlib';
import { type ThreeElements } from '@react-three/fiber';

interface SurfaceformGLTF extends GLTF {
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material>;
}

type SurfaceProps = ThreeElements['group'];

export const Surface = (props: SurfaceProps): JSX.Element => {
  const { scene } = useGLTF('/model/surface.glb') as unknown as SurfaceformGLTF;

  const clonedScene = useMemo(() => {
    const clone = scene.clone();

    const sandMaterial = new THREE.MeshStandardMaterial({
      color: '#d2b48c',
      roughness: 1.0,
      metalness: 0.0,
    });

    clone.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        child.material = sandMaterial;
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

useGLTF.preload('/model/surface.glb');
