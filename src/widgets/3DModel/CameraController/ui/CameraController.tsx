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
  const targetCameraPos = useRef<THREE.Vector3>(new THREE.Vector3());
  const targetTargetPos = useRef<THREE.Vector3>(new THREE.Vector3());
  const focusedBitPos = useRef<THREE.Vector3>(new THREE.Vector3());

  const isAnimating = useRef<boolean>(false);
  const isFocusedRef = useRef<boolean>(false);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    if (isFocused && !isFocusedRef.current) {
      savedCameraPos.current.copy(camera.position);
      savedTargetPos.current.copy(controls.target);
      focusedBitPos.current.set(bitPosition[0], bitPosition[1], bitPosition[2]);

      isFocusedRef.current = true;
      isAnimating.current = true;
      controls.enabled = false;

      const [bx, by, bz] = [
        focusedBitPos.current.x,
        focusedBitPos.current.y,
        focusedBitPos.current.z,
      ];
      targetCameraPos.current.set(bx + 8, by + 6, bz + 12);
      targetTargetPos.current.set(bx, by, bz);
    } else if (!isFocused && isFocusedRef.current) {
      targetCameraPos.current.copy(savedCameraPos.current);
      targetTargetPos.current.copy(savedTargetPos.current);
      isAnimating.current = true;
      controls.enabled = false;
      isFocusedRef.current = false;
    }
  }, [isFocused, bitPosition, camera, controlsRef]);

  useFrame((_, delta) => {
    const controls = controlsRef.current;
    if (!controls || !isAnimating.current) return;

    const damp = 1 - Math.exp(-5 * delta);
    camera.position.lerp(targetCameraPos.current, damp);
    controls.target.lerp(targetTargetPos.current, damp);
    controls.update();

    if (camera.position.distanceTo(targetCameraPos.current) < 0.05) {
      camera.position.copy(targetCameraPos.current);
      controls.target.copy(targetTargetPos.current);
      controls.update();
      isAnimating.current = false;
      controls.enabled = true;
    }
  });

  return null;
};
