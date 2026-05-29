import { useMemo, type JSX } from 'react';
import { type ThreeElements } from '@react-three/fiber';
import { TankModel } from './TankModel';
import { MainPlatform } from './MainPlatform';
import { Surface } from './Surface';
import { Tubes } from './Tubes';
import { Containers } from './Containers';
import { Container } from './Container';
import { Rig } from './Rig';
import { Pumps } from './Pumps';
import { StraightPipe } from './StraightPipe';
import * as THREE from 'three';

type MainSceneProps = ThreeElements['group'];

export const MainScene = (props: MainSceneProps): JSX.Element => {
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
    <group {...props} dispose={null}>
      <Surface position={[8, 0.5, 0]} />
      <MainPlatform position={[0, 2.5, 0]} />
      <TankModel position={[15, 4, 19]} />
      <Tubes position={[15, 4, -16]} />
      <Containers position={[-12, 4, 16]} />
      <Container position={[18, 4, 15]} />
      <Rig position={[-12, 4, -9]} rotation={[0, 1.55, 0]} />
      <Pumps position={[-14, 3.98, 10]} rotation={[0, -1.55, 0]} />

      <StraightPipe path={thickPipeCurve} radius={0.145} tubularSegments={2} />

      <StraightPipe path={thinPipeCombinedPath} radius={0.04} tubularSegments={64} />
    </group>
  );
};
