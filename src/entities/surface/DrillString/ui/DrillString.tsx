import { useRef, useEffect, type JSX } from 'react';
import * as THREE from 'three';
import { useFrame, type ThreeElements } from '@react-three/fiber';
import { Bit } from '@/entities/underground/Bit';
import { DEPTH_SCALE } from '@/entities/well/model/constants';
import { socketClient, useGetDrillingStreamQuery, type IDrillingDelta } from '@/entities/well';

const PIPE_RADIUS = 0.18;

type DrillStringProps = ThreeElements['group'] & {
  wellId: number;
};

export const DrillString = ({ wellId, ...props }: DrillStringProps): JSX.Element => {
  const stringGroupRef = useRef<THREE.Group>(null);
  const pipeMeshRef = useRef<THREE.Mesh>(null);
  const bitGroupRef = useRef<THREE.Group>(null);
  const currentRpmRef = useRef<number>(0);

  const { data: wells } = useGetDrillingStreamQuery();
  const currentWell = wells?.find((w) => w.id === wellId);
  const initialDepth = currentWell?.currentDepth ?? 0;
  const status = currentWell?.status;

  useEffect(() => {
    if (!pipeMeshRef.current || !bitGroupRef.current) return;
    const visualDepth = initialDepth * DEPTH_SCALE;
    pipeMeshRef.current.scale.y = visualDepth;
    pipeMeshRef.current.position.y = -0.5 * visualDepth;
    bitGroupRef.current.position.y = -visualDepth;
  }, [initialDepth]);

  useEffect(() => {
    if (!wellId) return;

    const handleUpdate = (deltas: IDrillingDelta[]) => {
      const delta = deltas.find((d) => d.id === wellId);
      if (!delta?.bottomHoleCoord) return;

      const currentDepth = Math.abs(delta.bottomHoleCoord.y);
      const visualDepth = currentDepth * DEPTH_SCALE;

      if (pipeMeshRef.current) {
        pipeMeshRef.current.scale.y = visualDepth;
        pipeMeshRef.current.position.y = -0.5 * visualDepth;
      }
      if (bitGroupRef.current) {
        bitGroupRef.current.position.y = -visualDepth;
      }

      if (delta.newHistoryPoint?.rpm) {
        currentRpmRef.current = delta.newHistoryPoint.rpm;
      }
    };

    socketClient.on('drilling:update', handleUpdate);
    return () => {
      socketClient.off('drilling:update', handleUpdate);
    };
  }, [wellId]);

  useFrame((_, delta) => {
    if (status === 'бурение' && bitGroupRef.current && currentRpmRef.current > 0) {
      const rotationSpeed = (currentRpmRef.current * Math.PI * 2) / 60;
      bitGroupRef.current.rotation.y += rotationSpeed * delta;
    }
  });

  useEffect(() => {
    if (!pipeMeshRef.current) return;
    const material = pipeMeshRef.current.material as THREE.MeshStandardMaterial;

    switch (status) {
      case 'бурение':
        material.color.setHex(0xff6600);
        material.emissiveIntensity = 0.4;
        material.transparent = false;
        break;
      case 'спо':
        material.color.setHex(0xccaa88);
        material.emissiveIntensity = 0.1;
        material.transparent = false;
        break;
      case 'промывка':
        material.color.setHex(0x3399ff);
        material.emissiveIntensity = 0;
        material.transparent = false;
        break;
      case 'простой':
        material.color.setHex(0x888888);
        material.emissiveIntensity = 0;
        material.transparent = true;
        material.opacity = 0.6;
        break;
      default:
        break;
    }
  }, [status]);

  return (
    <group ref={stringGroupRef} {...props}>
      <mesh ref={pipeMeshRef} position={[0, -0.5, 0]} castShadow>
        <cylinderGeometry args={[PIPE_RADIUS, PIPE_RADIUS, 1, 16]} />
        <meshStandardMaterial
          color="#ff6600"
          emissive="#ff6600"
          emissiveIntensity={0.4}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
      <group ref={bitGroupRef} position={[0, -1, 0]} scale={[5, 5, 5]}>
        <Bit />
      </group>
    </group>
  );
};
