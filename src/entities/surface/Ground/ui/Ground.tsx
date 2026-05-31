import { useMemo, type JSX } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { type GLTF } from 'three-stdlib';
import { type ThreeElements } from '@react-three/fiber';

interface GroundGLTF extends GLTF {
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material>;
}

type GroundProps = ThreeElements['group'];

export const Ground = (props: GroundProps): JSX.Element => {
  const { scene } = useGLTF('/model/gr.glb') as unknown as GroundGLTF;

  const clonedScene = useMemo(() => {
    const clone = scene.clone();

    clone.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        const materials = Array.isArray(child.material) ? child.material : [child.material];

        const newMaterials = materials.map((mat: THREE.Material) => {
          const clonedMat = mat.clone();
          clonedMat.side = THREE.DoubleSide;
          clonedMat.transparent = true;
          clonedMat.opacity = 0.4;
          clonedMat.depthWrite = false;

          return clonedMat;
        });

        child.material = Array.isArray(child.material) ? newMaterials : newMaterials[0];
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

useGLTF.preload('/model/gr.glb');
