import * as THREE from 'three';
import { type JSX } from 'react';
import { type ThreeElements } from '@react-three/fiber';

type StraightPipeProps = ThreeElements['group'] & {
  path: THREE.LineCurve3 | THREE.CurvePath<THREE.Vector3>;
  radius?: number;
  tubularSegments?: number;
};

export const StraightPipe = ({
  path,
  radius = 0.08,
  tubularSegments = 64,
  ...props
}: StraightPipeProps): JSX.Element => {
  return (
    <group {...props}>
      <mesh castShadow receiveShadow>
        <tubeGeometry args={[path, tubularSegments, radius, 12, false]} />
        <meshStandardMaterial color="#24a148" metalness={0.6} roughness={0.2} />
      </mesh>
    </group>
  );
};
