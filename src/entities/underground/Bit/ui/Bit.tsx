import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { type GLTF } from 'three-stdlib';
import { type ThreeElements } from '@react-three/fiber';

interface BitformGLTF extends GLTF {
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material>;
}

type BitProps = ThreeElements['group'];

export const Bit = (props: BitProps) => {
  const { scene } = useGLTF('/model/bit.glb') as unknown as BitformGLTF;
  const { clonedScene, customMaterials } = useMemo(() => {
    const clone = scene.clone();

    const trackedMaterials: THREE.Material[] = [];

    clone.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        const materials = Array.isArray(child.material) ? child.material : [child.material];

        const newMaterials = materials.map((mat: THREE.Material) => {
          if (mat instanceof THREE.MeshStandardMaterial) {
            const clonedMat = mat.clone();

            clonedMat.color.set('#aaaaaa');
            clonedMat.emissive.set('#ffffff');
            clonedMat.emissiveIntensity = 0.15;
            clonedMat.metalness = 0.9;
            clonedMat.roughness = 0.4;

            trackedMaterials.push(clonedMat);

            return clonedMat;
          }
          return mat;
        });

        child.material = Array.isArray(child.material) ? newMaterials : newMaterials[0];
      }
    });

    return { clonedScene: clone, customMaterials: trackedMaterials };
  }, [scene]);

  useEffect(() => {
    return () => {
      customMaterials.forEach((mat: THREE.Material) => {
        mat.dispose();
      });
    };
  }, [customMaterials]);

  return (
    <group {...props} dispose={null}>
      <group rotation={[Math.PI, 0, 0]} position={[0, 0, 0]}>
        <primitive object={clonedScene} />
      </group>
    </group>
  );
};
