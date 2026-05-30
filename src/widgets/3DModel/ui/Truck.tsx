import * as THREE from 'three';
import { Html, useGLTF } from '@react-three/drei';
import { type GLTF } from 'three-stdlib';
import { useMemo, useRef, useEffect, type JSX } from 'react';
import { useFrame, type ThreeElements } from '@react-three/fiber';
import { bubbleStyle, tailInnerStyle, tailStyle } from './SceneDirectorText';

interface TruckGLTF extends GLTF {
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material>;
}

type TruckProps = ThreeElements['group'] & {
  runTrigger?: number;
  onArrive?: () => void;
  message?: string | null;
};

const truckRoute = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(25, -0.3, 75),
    new THREE.Vector3(12, -0.3, 75),
    new THREE.Vector3(8, -0.3, 70),
    new THREE.Vector3(4, -0.3, 65),
    new THREE.Vector3(4, -0.3, 50),
    new THREE.Vector3(3, -0.3, 38),

    new THREE.Vector3(3, 3.8, 22),

    new THREE.Vector3(3, 3.8, 15),
    new THREE.Vector3(4, 3.8, 13),
    new THREE.Vector3(6, 3.8, 10),
    new THREE.Vector3(10, 3.8, 8),
    new THREE.Vector3(15, 3.8, 2),
  ],
  false,
  'centripetal',
);

const WHEEL_NODE_NAMES: string[] = [
  'dump_truck_01_M_dump_truck_E_01_0001',
  'dump_truck_01_M_dump_truck_E_01_0002',
  'dump_truck_01_M_dump_truck_E_01_0003',
  'dump_truck_01_M_dump_truck_E_01_0004',
  'dump_truck_01_M_dump_truck_E_01_0005',
  'dump_truck_01_M_dump_truck_E_01_0006',
];

export const Truck = ({
  runTrigger = 0,
  onArrive,
  message = null,
  ...props
}: TruckProps): JSX.Element => {
  const { scene, nodes } = useGLTF('/model/trucks.glb') as unknown as TruckGLTF;
  console.log(nodes);
  const groupRef = useRef<THREE.Group>(null);
  const innerGroupRef = useRef<THREE.Group>(null);
  const progress = useRef<number>(0);

  const hasFiredArrival = useRef<boolean>(false);

  console.log(message);
  useEffect(() => {
    progress.current = 0;
    hasFiredArrival.current = false;
  }, [runTrigger]);

  useMemo(() => {
    scene.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;

    if (progress.current >= 1) {
      if (!hasFiredArrival.current) {
        hasFiredArrival.current = true;
        if (onArrive) onArrive();
      }
      return;
    }

    progress.current += delta * 0.15;
    const safeProgress = Math.min(progress.current, 1);

    const currentPos = truckRoute.getPointAt(safeProgress);
    groupRef.current.position.copy(currentPos);

    const tangentProgress = Math.min(safeProgress, 0.999);
    const tangent = truckRoute.getTangentAt(tangentProgress).normalize();
    const lookAtTarget = new THREE.Vector3().copy(currentPos).add(tangent);
    groupRef.current.lookAt(lookAtTarget);
    if (innerGroupRef.current) {
      const basePitch = -Math.PI / 3.6;

      const rampPitch = -Math.PI / 3;

      if (currentPos.y > -0.2 && currentPos.y < 3.7) {
        innerGroupRef.current.rotation.x = THREE.MathUtils.lerp(
          innerGroupRef.current.rotation.x,
          rampPitch,
          delta * 4,
        );
      } else {
        innerGroupRef.current.rotation.x = THREE.MathUtils.lerp(
          innerGroupRef.current.rotation.x,
          basePitch,
          delta * 5,
        );
      }
    }

    const wheelSpeed: number = delta * 5;

    WHEEL_NODE_NAMES.forEach((wheelName: string) => {
      const wheelNode: THREE.Object3D | undefined = nodes[wheelName];

      if (wheelNode) {
        wheelNode.rotation.x += wheelSpeed;
      }
    });
  });

  return (
    <group ref={groupRef} {...props} dispose={null}>
      {message && (
        <Html position={[0, 4.5, 0]} center distanceFactor={15} zIndexRange={[100, 0]}>
          <div style={bubbleStyle}>
            {message}
            <div style={tailStyle} />
            <div style={tailInnerStyle} />
          </div>
        </Html>
      )}

      <group ref={innerGroupRef} rotation={[-Math.PI / 3.6, -Math.PI / 40, 0]}>
        <primitive object={scene} position={[0, 0.15, 0]} />
      </group>
    </group>
  );
};

useGLTF.preload('/model/trucks.glb');
