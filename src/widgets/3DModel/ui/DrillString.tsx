import { useRef, type JSX } from 'react';
import * as THREE from 'three';
import { useFrame, type ThreeElements } from '@react-three/fiber';
import { Bit } from './Bit';

type DrillStringProps = ThreeElements['group'];

export const DrillString = (props: DrillStringProps): JSX.Element => {
  const pipeRef = useRef<THREE.Mesh>(null);
  const bitRef = useRef<THREE.Group>(null);
  const stringGroupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!bitRef.current || !stringGroupRef.current || !pipeRef.current) return;

    const rpm = 60;
    const rotationSpeed = (rpm * Math.PI * 2) / 60;

    bitRef.current.rotation.y -= rotationSpeed * 0.016;
    pipeRef.current.rotation.y = bitRef.current.rotation.y;
  });

  const PIPE_LENGTH = 130;
  const PIPE_RADIUS = 0.18;

  return (
    <group ref={stringGroupRef} {...props}>
      <mesh ref={pipeRef} position={[0, -PIPE_LENGTH / 2, 0]} castShadow>
        <cylinderGeometry args={[PIPE_RADIUS, PIPE_RADIUS, PIPE_LENGTH, 16]} />
        <meshStandardMaterial
          color="#ff6600"
          emissive="#ff6600"
          emissiveIntensity={0.4}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>

      <group ref={bitRef} position={[0, -PIPE_LENGTH, 0]} scale={[5, 5, 5]}>
        <Bit />
      </group>
    </group>
  );
};
