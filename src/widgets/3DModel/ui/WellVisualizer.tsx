import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stage } from '@react-three/drei';
import * as THREE from 'three';
import { WellModel } from './WellModel/WellModel'; // Импорт начинки
import s from './Well3DVisualizer.module.css'; // Импорт стилей

export const WellVisualizer = () => {
    const trajectoryPoints = useMemo(() => [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0.5, -3, 0.5),
        new THREE.Vector3(1.5, -7, 2),
        new THREE.Vector3(2.5, -10, 3.5),
    ], []);

    return (
        <div className={s.root}>
            <Canvas shadows>
                <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={[10, 8, 15]} fov={45} />
                    <OrbitControls makeDefault enableDamping />
                    
                    <Stage intensity={0.5} environment="city" adjustCamera={false}>
                        <WellModel points={trajectoryPoints} />
                    </Stage>
                </Suspense>
            </Canvas>
        </div>
    );
};