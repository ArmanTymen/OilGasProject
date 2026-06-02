import { useState, useRef, type JSX } from 'react';
import * as THREE from 'three';
import s from './Model3D.module.css';
import { WellTelemetryHud } from '@/widgets/3DModel/WellTelemetryHud';
import { WellVisualizer } from '@/widgets/3DModel/WellVisualizer';
import { WellSelectionModal } from '@/features/well-selection/WellSelectionModal';
import { useGetDrillingStreamQuery } from '@/entities/well';
import { useMediaQuery } from 'react-responsive';
import { MobileWellSchema } from '@/widgets/3DModel/MobileWellSchema';

const Model3D = (): JSX.Element => {
  const { data: wells = [], isLoading } = useGetDrillingStreamQuery();
  const [selectedWellId, setSelectedWellId] = useState<number>(2001);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const drillStringRef = useRef<THREE.Group>(null);
  const activeWell = wells.find((w) => w.id === selectedWellId);

  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  if (isMobile) {
    return <MobileWellSchema wellId={selectedWellId} />;
  }

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
          isTablet={isTablet}
          isMobile={isMobile}
        />
      )}

      <section className={s.canvasContainer}>
        <WellVisualizer
          wellId={selectedWellId}
          drillStringRef={drillStringRef}
          isTablet={isTablet}
          isMobile={isMobile}
        />
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
