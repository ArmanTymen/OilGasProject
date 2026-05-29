import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { type GLTF } from 'three-stdlib';
import { useMemo, type JSX } from 'react';
import { type ThreeElements } from '@react-three/fiber';

interface SurfaceformGLTF extends GLTF {
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material>;
}

type SurfaceProps = ThreeElements['group'];

export const Surface = (props: SurfaceProps): JSX.Element => {
  const { scene } = useGLTF('/model/surface.glb') as unknown as SurfaceformGLTF;

  useMemo(() => {
    const sandMaterial = new THREE.MeshStandardMaterial({
      color: '#d2b48c',
      roughness: 1.0,
      metalness: 0.0,
    });

    scene.traverse((child: THREE.Object3D) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        mesh.material = sandMaterial;
      }
    });
  }, [scene]);

  return (
    <group {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
};

useGLTF.preload('/model/surface.glb');
