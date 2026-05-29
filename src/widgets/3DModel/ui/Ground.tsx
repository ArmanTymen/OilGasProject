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
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        const material = mesh.material;

        const materialArray = Array.isArray(material) ? material : [material];

        materialArray.forEach((mat) => {
          if (mat && mat.name && materials[mat.name]) {
            mesh.material = materials[mat.name];

            if (!Array.isArray(mesh.material)) {
              mesh.material.side = THREE.DoubleSide;
              mesh.material.needsUpdate = true;
            }
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
