import { useMemo, type JSX } from 'react';
import { type ThreeElements } from '@react-three/fiber';
import * as THREE from 'three';

import { Surface } from '@/entities/surface/Surface/ui/Surface';
import { TankModel } from '@/entities/surface/TankModel/ui/TankModel';
import { Tubes } from '@/entities/underground/Tubes/ui/Tubes';
import { Containers } from '@/entities/surface/Containers/ui/Containers';
import { Container } from '@/entities/surface/Container/ui/Container';
import { Rig } from '@/entities/surface/Rig/ui/Rig';
import { Pumps } from '@/entities/surface/Pumps/ui/Pumps';
import { StraightPipe } from '@/entities/underground/StraightPipe/ui/StraightPipe';
import { TruckLadder } from '@/entities/surface/TruckLadder/ui/TruckLadder';
import { SceneDirector } from '@/features/scene-director/SceneDirector/ui/SceneDirector';
import { CanteenBuilding } from '@/entities/surface/CanteenBuilding/ui/CanteenBuilding';
import { MainPlatform } from '@/entities/surface/MainPlatform';

type MainSceneProps = ThreeElements['group'];

export const MainScene = ({ ...props }: MainSceneProps): JSX.Element => {
  const thickPipeCurve = useMemo(() => {
    return new THREE.LineCurve3(
      new THREE.Vector3(-14.31, 4.51, 8.3),
      new THREE.Vector3(-14.31, 4.51, 2),
    );
  }, []);

  const thinPipeCombinedPath = useMemo(() => {
    const curvePath = new THREE.CurvePath<THREE.Vector3>();

    const startPoint = new THREE.Vector3(-14.27, 6.025, 9.435);
    const cornerPoint = new THREE.Vector3(-24.27, 6.035, 9.435);
    const endPoint = new THREE.Vector3(-24.27, -1.0, 9.435);

    const horizontalLine = new THREE.LineCurve3(startPoint, cornerPoint);
    const verticalLine = new THREE.LineCurve3(cornerPoint, endPoint);

    curvePath.add(horizontalLine);
    curvePath.add(verticalLine);

    return curvePath;
  }, []);

  return (
    <group {...props}>
      <Surface position={[8, 0.5, 0]} />
      <MainPlatform position={[0, 2.5, 0]} />
      <TankModel position={[15, 4, 19]} />
      <Tubes position={[15, 4, -16]} />
      <Containers position={[-12, 4, 16]} />
      <Container position={[18, 4, 12]} />
      <SceneDirector />
      <TruckLadder position={[5, -0.02, 32]} rotation={[0, 1.57, 0]} />
      <Rig position={[-12, 4, -9]} rotation={[0, 1.55, 0]} />
      <Pumps position={[-14, 3.98, 10]} rotation={[0, -1.55, 0]} />
      <StraightPipe path={thickPipeCurve} radius={0.145} tubularSegments={2} />
      <StraightPipe path={thinPipeCombinedPath} radius={0.04} tubularSegments={64} />
      <CanteenBuilding position={[-10, 0.7, 160]} /> // его надо попробовать скрывать вообще как
      то,потмоу что он далеко от буровой
    </group>
  );
};
