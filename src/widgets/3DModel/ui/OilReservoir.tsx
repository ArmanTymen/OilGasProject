import { type JSX } from 'react';
import { type ThreeElements } from '@react-three/fiber';

type OilReservoirProps = ThreeElements['group'];

export const OilReservoir = (props: OilReservoirProps): JSX.Element => {
  return (
    <group {...props}>
      <mesh scale={[1, 0.5, 1]}>
        <sphereGeometry args={[15, 32, 32]} />
        <meshStandardMaterial
          color="#050505"
          roughness={0.05}
          metalness={0.9}
          transparent={true}
          opacity={0.95}
        />
      </mesh>
    </group>
  );
};
