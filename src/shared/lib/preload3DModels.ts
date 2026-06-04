import { useGLTF } from '@react-three/drei';

// Использование readonly гарантирует неизменяемость массива путей на уровне компиляции
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

/**
 * Инициирует предзагрузку 3D-компонентов в кэш suspend-react.
 * Вызовы распределяются во времени с шагом в 250 мс для предотвращения блокировки сетевого потока.
 */
export function preload3DModels(): void {
  MODELS_PATHS.forEach((path: string, index: number) => {
    setTimeout(() => {
      // Первый аргумент: путь к файлу
      // Второй аргумент (опционально): true или строка-путь к DRACO декодеру,
      // если модели были сжаты в Blender через Draco Compression.
      useGLTF.preload(path);
    }, index * 250);
  });
}
