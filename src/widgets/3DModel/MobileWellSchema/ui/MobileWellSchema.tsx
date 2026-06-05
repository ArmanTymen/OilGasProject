import { useState, useEffect } from 'react';
import { useGetDrillingStreamQuery } from '@/entities/well';
import { MobileWellHud } from '@/features/mobile-well-hud';
import { WellCanvas } from '@/features/well-canvas';
import s from './MobileWellSchema.module.css';
interface MobileWellSchemaProps {
  wellId: number;
}

export const MobileWellSchema = ({ wellId }: MobileWellSchemaProps) => {
  const { data: wells, isLoading } = useGetDrillingStreamQuery();
  const [selectedWellId, setSelectedWellId] = useState(wellId);

  const activeWell = wells?.find((w) => w.id === selectedWellId);

  useEffect(() => {
    setSelectedWellId(wellId);
  }, [wellId]);

  if (isLoading) return <div>Загрузка...</div>;
  if (!activeWell) return <div>Скважина не найдена</div>;

  return (
    <div className={s.mobileContainer}>
      <MobileWellHud
        activeWell={activeWell}
        wells={wells || []}
        selectedWellId={selectedWellId}
        onWellChange={setSelectedWellId}
      />
      <WellCanvas
        depth={activeWell.currentDepth}
        targetDepth={activeWell.targetDepth}
        status={activeWell.status}
      />
    </div>
  );
};
