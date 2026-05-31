import { useState, useRef, type JSX } from 'react';
import * as THREE from 'three';
import s from './Model3D.module.css';
import { WellTelemetryHud } from '@/widgets/3DModel/WellTelemetryHud';
import { WellVisualizer } from '@/widgets/3DModel/WellVisualizer';
import { WellSelectionModal } from '@/features/well-selection/WellSelectionModal';
import { DrillingBridge } from '@/entities/surface/DrillingBridge';
import { useGetDrillingStreamQuery } from '@/entities/well';

const Model3D = (): JSX.Element => {
  const { data: wells = [], isLoading } = useGetDrillingStreamQuery();
  const [selectedWellId, setSelectedWellId] = useState<number>(2001);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const drillStringRef = useRef<THREE.Group>(null);

  const activeWell = wells.find((w) => w.id === selectedWellId);

  if (isLoading) {
    return <div className={s.loader}>Загрузка данных телеметрии...</div>;
  }

  return (
    <div className={s.page}>
      {activeWell && (
        <WellTelemetryHud
          activeWell={activeWell}
          onOpenModal={() => setIsModalOpen(true)}
          wellsCount={wells.length}
        />
      )}

      <section className={s.canvasContainer}>
        <WellVisualizer drillStringRef={drillStringRef}>
          <DrillingBridge activeWell={activeWell} drillStringRef={drillStringRef} />
        </WellVisualizer>
      </section>

      {isModalOpen && (
        <WellSelectionModal
          wells={wells}
          selectedWellId={selectedWellId}
          onClose={() => setIsModalOpen(false)}
          onSelectWell={setSelectedWellId}
        />
      )}
    </div>
  );
};

export default Model3D;
