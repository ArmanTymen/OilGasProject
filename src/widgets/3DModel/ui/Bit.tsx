import { useLayoutEffect, type JSX } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { type GLTF } from 'three-stdlib';
import { type ThreeElements } from '@react-three/fiber';

interface BitformGLTF extends GLTF {
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material>;
}

type BitProps = ThreeElements['group'];

export const Bit = (props: BitProps): JSX.Element => {
  const { scene } = useGLTF('/model/bit.glb') as unknown as BitformGLTF;

  useLayoutEffect(() => {
    scene.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        const material = child.material;
        const materialArray = Array.isArray(material) ? material : [material];

        materialArray.forEach((mat) => {
          if (mat instanceof THREE.MeshStandardMaterial) {
            mat.color.set('#aaaaaa');
            mat.emissive.set('#ffffff');
            mat.emissiveIntensity = 0.15;
            mat.metalness = 0.9;
            mat.roughness = 0.4;
            mat.needsUpdate = true;
          }
        });
      }
    });
  }, [scene]);

  return (
    <group {...props} dispose={null}>
      <group rotation={[Math.PI, 0, 0]} position={[0, 0, 0]}>
        <primitive object={scene} />
      </group>
    </group>
  );
};

useGLTF.preload('/model/bit.glb');
