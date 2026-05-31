import { useMemo, type JSX } from 'react';
import { useGLTF } from '@react-three/drei';
import { type GLTF } from 'three-stdlib';
import * as THREE from 'three';
import { type ThreeElements } from '@react-three/fiber';
import { useTruckAnimation } from '../lib/useTruckAnimation';
import { SpeechBubble } from '@/shared/ui/SpeechBubble';

interface TruckGLTF extends GLTF {
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material>;
}

type TruckProps = ThreeElements['group'] & {
  runTrigger?: number;
  onArrive?: () => void;
  message?: string | null;
  routeId: 'arrival' | 'departure' | 'leave';
};

export const Truck = ({
  runTrigger = 0,
  onArrive,
  message = null,
  routeId = 'arrival',
  ...props
}: TruckProps): JSX.Element => {
  const { scene, nodes } = useGLTF('/model/trucks.glb') as unknown as TruckGLTF;

  useMemo(() => {
    scene.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene]);

  const { groupRef, innerGroupRef } = useTruckAnimation({
    runTrigger,
    onArrive,
    nodes,
    routeId,
  });

  return (
    <group ref={groupRef} {...props} dispose={null}>
      {message && <SpeechBubble message={message} />}

      <group ref={innerGroupRef} rotation={[-Math.PI / 3.6, -Math.PI / 40, 0]}>
        <primitive object={scene} position={[0, 0.15, 0]} />
      </group>
    </group>
  );
};

useGLTF.preload('/model/trucks.glb');
