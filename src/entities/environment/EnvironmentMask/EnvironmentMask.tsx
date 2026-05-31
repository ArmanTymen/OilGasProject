import { type JSX } from 'react';
import * as THREE from 'three';
import { type ThreeElements } from '@react-three/fiber';

type EnvironmentMaskProps = ThreeElements['group'];

const MASK_SIZE = 1000;
const HALF_SIZE = MASK_SIZE / 2;

export const EnvironmentMask = (props: EnvironmentMaskProps): JSX.Element => {
  return (
    <group {...props}>
      <mesh position={[0, 1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[MASK_SIZE, MASK_SIZE]} />
        <meshStandardMaterial color="#e5d3b3" />
      </mesh>
      <mesh position={[0, -HALF_SIZE - 0.1, 0]}>
        <boxGeometry args={[MASK_SIZE, MASK_SIZE, MASK_SIZE]} />
        <meshBasicMaterial color="#1a1a1a" side={THREE.BackSide} fog={false} />
      </mesh>
    </group>
  );
};
