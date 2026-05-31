import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

interface CameraControllerProps {
  isFocused: boolean;
  bitPosition: [number, number, number];
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}

export const CameraController = ({
  isFocused,
  bitPosition,
  controlsRef,
}: CameraControllerProps): null => {
  const { camera } = useThree();

  const savedCameraPos = useRef<THREE.Vector3>(new THREE.Vector3());
  const savedTargetPos = useRef<THREE.Vector3>(new THREE.Vector3());
  const isStateSaved = useRef<boolean>(false);

  const targetCameraPos = useRef<THREE.Vector3>(new THREE.Vector3());
  const targetTargetPos = useRef<THREE.Vector3>(new THREE.Vector3());

  const isAnimatingRef = useRef<boolean>(false);

  const [bitX, bitY, bitZ] = bitPosition;

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    isAnimatingRef.current = true;

    controls.enabled = false;

    if (isFocused) {
      if (!isStateSaved.current) {
        savedCameraPos.current.copy(camera.position);
        savedTargetPos.current.copy(controls.target);
        isStateSaved.current = true;
      }

      targetCameraPos.current.set(bitX + 10, bitY + 5, bitZ + 10);
      targetTargetPos.current.set(bitX, bitY, bitZ);
    } else {
      if (isStateSaved.current) {
        targetCameraPos.current.copy(savedCameraPos.current);
        targetTargetPos.current.copy(savedTargetPos.current);
      } else {
        targetCameraPos.current.set(35, 10, 85);
        targetTargetPos.current.set(25, 0, 75);
      }
    }
  }, [isFocused, camera, controlsRef, bitX, bitY, bitZ]);

  useFrame((_, delta) => {
    const controls = controlsRef.current;
    if (!controls || !isAnimatingRef.current) return;

    const dampFactor = 1 - Math.exp(-5 * delta);

    camera.position.lerp(targetCameraPos.current, dampFactor);
    controls.target.lerp(targetTargetPos.current, dampFactor);

    controls.update();

    if (camera.position.distanceTo(targetCameraPos.current) < 0.1) {
      camera.position.copy(targetCameraPos.current);
      controls.target.copy(targetTargetPos.current);
      controls.update();

      isAnimatingRef.current = false;

      controls.enabled = true;

      if (!isFocused) {
        isStateSaved.current = false;
      }
    }
  });

  return null;
};
