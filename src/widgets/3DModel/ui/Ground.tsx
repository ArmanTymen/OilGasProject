import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { type GLTF } from 'three-stdlib';
import { useLayoutEffect, type JSX } from 'react';
import { type ThreeElements } from '@react-three/fiber';

interface GroundGLTF extends GLTF {
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material>;
}

type GroundProps = ThreeElements['group'];

export const Ground = (props: GroundProps): JSX.Element => {
  const { scene, materials } = useGLTF('/model/gr.glb') as unknown as GroundGLTF;

  useLayoutEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const material = child.material;
        const materialArray = Array.isArray(material) ? material : [material];

        materialArray.forEach((mat) => {
          if (mat && mat.name && materials[mat.name]) {
            const targetMaterial = materials[mat.name];
            child.material = targetMaterial;

            targetMaterial.side = THREE.DoubleSide;

            targetMaterial.transparent = true;

            targetMaterial.opacity = 0.4;

            targetMaterial.depthWrite = false;

            targetMaterial.needsUpdate = true;
          }
        });
      }
    });
  }, [scene, materials]);

  return (
    <group {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
};

useGLTF.preload('/model/gr.glb');
