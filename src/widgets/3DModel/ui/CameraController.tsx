import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface OrbitControlsTarget {
  target: THREE.Vector3;
  update: () => void;
}

interface CameraControllerProps {
  isFocused: boolean;
  bitPosition: [number, number, number];
}

export const CameraController = ({ isFocused, bitPosition }: CameraControllerProps): null => {
  const { camera, controls } = useThree();

  const savedCameraPos = useRef<THREE.Vector3>(new THREE.Vector3());
  const savedTargetPos = useRef<THREE.Vector3>(new THREE.Vector3());
  const isStateSaved = useRef<boolean>(false);

  const targetCameraPos = useRef<THREE.Vector3>(new THREE.Vector3());
  const targetTargetPos = useRef<THREE.Vector3>(new THREE.Vector3());

  const isAnimatingRef = useRef<boolean>(false);

  const [bitX, bitY, bitZ] = bitPosition;

  useEffect(() => {
    const orbitControls = controls as unknown as OrbitControlsTarget;
    if (!orbitControls) return;

    isAnimatingRef.current = true;

    if (isFocused) {
      savedCameraPos.current.copy(camera.position);
      savedTargetPos.current.copy(orbitControls.target);
      isStateSaved.current = true;

      targetCameraPos.current.set(bitX + 10, bitY + 5, bitZ + 10);
      targetTargetPos.current.set(bitX, bitY, bitZ);
    } else {
      if (isStateSaved.current) {
        targetCameraPos.current.copy(savedCameraPos.current);
        targetTargetPos.current.copy(savedTargetPos.current);
      } else {
        targetCameraPos.current.set(35, 10, 85);
        targetTargetPos.current.set(25, 0.9, 75);
      }
    }
  }, [isFocused, camera, controls, bitX, bitY, bitZ]);

  useFrame((_, delta) => {
    const orbitControls = controls as unknown as OrbitControlsTarget;

    if (!orbitControls || !isAnimatingRef.current) return;

    const speed = Math.min(delta * 5, 1);

    camera.position.lerp(targetCameraPos.current, speed);
    orbitControls.target.lerp(targetTargetPos.current, speed);

    if (camera.position.distanceTo(targetCameraPos.current) < 0.1) {
      camera.position.copy(targetCameraPos.current);
      orbitControls.target.copy(targetTargetPos.current);

      isAnimatingRef.current = false;
    }
  });

  return null;
};
