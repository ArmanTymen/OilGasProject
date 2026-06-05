import { useState, useRef } from 'react';
import * as THREE from 'three';
import { CircularProgress, Box } from '@mui/material';
import s from './Model3D.module.css';
import { WellTelemetryHud } from '@/widgets/3DModel/WellTelemetryHud';
import { WellVisualizer } from '@/widgets/3DModel/WellVisualizer';
import { WellSelectionModal } from '@/features/well-selection/WellSelectionModal';
import { useGetDrillingStreamQuery } from '@/entities/well';
import { useMediaQuery } from 'react-responsive';
import { MobileWellSchema } from '@/widgets/3DModel/MobileWellSchema';
import { useNavigate, useParams } from 'react-router-dom';

const Model3D = () => {
  const { wellId: wellIdParam } = useParams<{ wellId: string }>();
  const navigate = useNavigate();

  const { data: wells = [], isLoading } = useGetDrillingStreamQuery();
  const selectedWellId = wellIdParam ? Number(wellIdParam) : 2001;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const drillStringRef = useRef<THREE.Group>(null);

  const handleSelectWell = (id: number) => {
    navigate(`/model/${id}`, { replace: true });
    setIsModalOpen(false);
  };

  const activeWell = wells.find((w) => w.id === selectedWellId);

  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  if (isMobile) {
    return <MobileWellSchema wellId={selectedWellId} />;
  }

  return (
    <div className={s.page}>
      {!isLoading && activeWell && (
        <WellTelemetryHud
          activeWell={activeWell}
          onOpenModal={() => setIsModalOpen(true)}
          wellsCount={wells.length}
          isTablet={isTablet}
        />
      )}

      <section className={s.canvasContainer}>
        {isLoading ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
            width="100%"
            bgcolor="#111"
            color="#fff"
            gap={2}
          >
            <CircularProgress size={40} sx={{ color: '#ff6600' }} />
            <span style={{ color: '#9ca3af', fontSize: '14px' }}>
              Загрузка данных телеметрии...
            </span>
          </Box>
        ) : (
          <WellVisualizer
            wellId={selectedWellId}
            drillStringRef={drillStringRef}
            isTablet={isTablet}
            isMobile={isMobile}
          />
        )}
      </section>

      {isModalOpen && (
        <WellSelectionModal
          wells={wells}
          selectedWellId={selectedWellId}
          onClose={() => setIsModalOpen(false)}
          onSelectWell={handleSelectWell}
        />
      )}
    </div>
  );
};

export default Model3D;
