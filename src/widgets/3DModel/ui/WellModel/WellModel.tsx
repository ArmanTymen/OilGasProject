import * as THREE from 'three';
import { useMemo } from 'react';
import { Html } from '@react-three/drei';
import s from '../Well3DVisualizer.module.css';

interface WellModelProps {
  points: THREE.Vector3[];
}

export const WellModel = ({ points }: WellModelProps) => {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);

  return (
    <group>
      <mesh>
        <tubeGeometry args={[curve, 64, 0.08, 12, false]} />
        <meshStandardMaterial color="#333" metalness={1} roughness={0.3} />
      </mesh>

      <mesh position={points[points.length - 1]}>
        <Html distanceFactor={10} center>
          <div className={s.bitLabel}>ТЕКУЩИЙ ЗАБОЙ</div>
        </Html>
      </mesh>

      <mesh position={[0, -5, 0]}>
        <cylinderGeometry args={[6, 6, 1.5, 32]} />
        <meshStandardMaterial
          color="#222"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
