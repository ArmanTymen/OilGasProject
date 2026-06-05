import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface UseTruckAnimationParams {
  runTrigger: number;
  onArrive?: () => void;
  nodes: Record<string, THREE.Object3D>;
  routeId: 'arrival' | 'departure' | 'leave';
}

const ROUTE_SPEEDS: Record<'arrival' | 'departure' | 'leave', number> = {
  arrival: 0.15,
  departure: 0.25,
  leave: 0.1,
};

const truckRoute = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(13, -0.3, 75),
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

const departureRoute = new THREE.CatmullRomCurve3(
  [new THREE.Vector3(15, 3.8, 2), new THREE.Vector3(2, 3.98, 8), new THREE.Vector3(-6, 3.98, 7)],
  false,
  'centripetal',
);

const leaveRoute = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(-6, 3.98, 7),
    new THREE.Vector3(-5, 3.98, 8),
    new THREE.Vector3(0, 3.98, 15),
    new THREE.Vector3(3, 3.98, 18),
    new THREE.Vector3(3, 3.8, 22),
    new THREE.Vector3(3, 1.75, 30),
    new THREE.Vector3(3, -0.3, 38),
    new THREE.Vector3(3, -0.3, 45),
    new THREE.Vector3(-20, -0.3, 95),
    new THREE.Vector3(-23, -0.3, 110),
    new THREE.Vector3(-25, -0.3, 120),
    new THREE.Vector3(0, -0.3, 150),
    new THREE.Vector3(2, -0.3, 155),
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

export const useTruckAnimation = ({
  runTrigger,
  onArrive,
  nodes,
  routeId,
}: UseTruckAnimationParams) => {
  const groupRef = useRef<THREE.Group>(null);
  const innerGroupRef = useRef<THREE.Group>(null);
  const progress = useRef<number>(0);
  const hasFiredArrival = useRef<boolean>(false);

  useEffect(() => {
    progress.current = 0;
    hasFiredArrival.current = false;
  }, [runTrigger, routeId]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const activeRoute =
      routeId === 'arrival' ? truckRoute : routeId === 'departure' ? departureRoute : leaveRoute;

    if (progress.current >= 1) {
      if (!hasFiredArrival.current) {
        hasFiredArrival.current = true;
        if (onArrive) onArrive();
      }
      return;
    }

    const currentSpeed = ROUTE_SPEEDS[routeId];

    progress.current += delta * currentSpeed;
    const safeProgress = Math.min(progress.current, 1);

    const currentPos = activeRoute.getPointAt(safeProgress);
    groupRef.current.position.copy(currentPos);

    const tangentProgress = Math.min(safeProgress, 0.999);
    const tangent = activeRoute.getTangentAt(tangentProgress).normalize();

    if (routeId === 'departure') {
      tangent.multiplyScalar(-1);
    }

    const lookAtTarget = new THREE.Vector3().copy(currentPos).add(tangent);
    groupRef.current.lookAt(lookAtTarget);

    if (innerGroupRef.current) {
      const basePitch = -Math.PI / 3.6;
      const upRampPitch = -Math.PI / 3;

      const downRampPitch = basePitch + (basePitch - upRampPitch);

      let targetPitch = basePitch;

      if (routeId === 'leave') {
        const isOnRamp = currentPos.y > 0.5 && currentPos.y < 3.7;
        targetPitch = isOnRamp ? downRampPitch : basePitch;
      } else {
        const isOnRamp = currentPos.y > -0.2 && currentPos.y < 3.7;
        targetPitch = isOnRamp ? upRampPitch : basePitch;
      }

      innerGroupRef.current.rotation.x = THREE.MathUtils.damp(
        innerGroupRef.current.rotation.x,
        targetPitch,
        5,
        delta,
      );
    }

    const wheelSpeed: number = delta * currentSpeed * 30;

    WHEEL_NODE_NAMES.forEach((wheelName: string) => {
      const wheelNode: THREE.Object3D | undefined = nodes[wheelName];
      if (wheelNode) {
        const currentWheelSpeed = routeId === 'departure' ? -wheelSpeed : wheelSpeed;
        wheelNode.rotation.x += currentWheelSpeed;
      }
    });
  });

  return { groupRef, innerGroupRef };
};
