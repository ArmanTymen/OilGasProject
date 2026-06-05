import { useGLTF } from '@react-three/drei';

const MODELS_PATHS: readonly string[] = [
  '/model/bit.glb',
  '/model/canteen_building.glb',
  '/model/container.glb',
  '/model/containers.glb',
  '/model/gr.glb',
  '/model/main_platform.glb',
  '/model/pump.glb',
  '/model/rigg.glb',
  '/model/surface.glb',
  '/model/tank_finally.glb',
  '/model/trucks.glb',
  '/model/rump1.glb',
  '/model/worker.glb',
  '/model/tubes.glb',
];

export function preload3DModels(): void {
  MODELS_PATHS.forEach((path: string, index: number) => {
    setTimeout(() => {
      useGLTF.preload(path);
    }, index * 250);
  });
}
