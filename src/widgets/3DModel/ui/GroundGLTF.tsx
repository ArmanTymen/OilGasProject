import * as THREE from 'three';
import { type GLTF } from 'three-stdlib';

export type GroundGLTF = GLTF & {
  nodes: {
    [key: string]: THREE.Object3D;
  };
  materials: {
    [key: string]: THREE.MeshStandardMaterial;
  };
};
