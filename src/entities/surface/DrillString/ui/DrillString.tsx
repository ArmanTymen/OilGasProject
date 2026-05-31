import { useRef, type JSX } from 'react';
import * as THREE from 'three';
import { useFrame, type ThreeElements } from '@react-three/fiber';
import { Bit } from '@/entities/underground/Bit';

const PIPE_LENGTH = 130;
const PIPE_RADIUS = 0.18;
const RPM = 60;
const ROTATION_SPEED = (RPM * Math.PI * 2) / 60;

type DrillStringProps = ThreeElements['group'];

export const DrillString = (props: DrillStringProps): JSX.Element => {
  const stringGroupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!stringGroupRef.current) return;

    stringGroupRef.current.rotation.y -= ROTATION_SPEED * delta;
  });

  return (
    <group ref={stringGroupRef} {...props}>
      <mesh position={[0, -PIPE_LENGTH / 2, 0]} castShadow>
        <cylinderGeometry args={[PIPE_RADIUS, PIPE_RADIUS, PIPE_LENGTH, 16]} />
        <meshStandardMaterial
          color="#ff6600"
          emissive="#ff6600"
          emissiveIntensity={0.4}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>

      <group position={[0, -PIPE_LENGTH, 0]} scale={[5, 5, 5]}>
        <Bit />
      </group>
    </group>
  );
};
