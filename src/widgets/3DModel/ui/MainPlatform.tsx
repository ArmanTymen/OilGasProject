import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { type GLTF } from 'three-stdlib';
import { useMemo, type JSX } from 'react';
import { type ThreeElements } from '@react-three/fiber';

interface MainPlatformGLTF extends GLTF {
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material>;
}

type MainPlatformProps = ThreeElements['group'];

export const MainPlatform = (props: MainPlatformProps): JSX.Element => {
  const { scene } = useGLTF('/model/main_platform.glb') as unknown as MainPlatformGLTF;

  useMemo(() => {
    const customMaterial = new THREE.MeshStandardMaterial({
      color: '#2a2e33',
      roughness: 0.6,
      metalness: 0.5,
    });

    scene.traverse((child: THREE.Object3D) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        mesh.material = customMaterial;
      }
    });
  }, [scene]);

  return (
    <group {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
};

useGLTF.preload('/model/main_platform.glb');
