import { useState, useRef, type JSX } from 'react';
import { WellVisualizer } from '@/widgets/3DModel';
import * as THREE from 'three';
import s from './Model3D.module.css';
import { useGetDrillingStreamQuery } from '@/entities/well/api/wellApi';
import { DrillingBridge } from '@/widgets/3DModel/ui/DrillingBridge';

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
      {/* HTML HUD PANEL OVERLAY */}
      {activeWell && (
        <div className={s.hudOverlay}>
          <div className={s.hudCard}>
            <h3>{activeWell.wellName}</h3>
            <p>
              Статус:{' '}
              <span className={s.statusBadge} data-status={activeWell.status}>
                {activeWell.status.toUpperCase()}
              </span>
            </p>
          </div>
          <div className={s.hudCard}>
            <span className={s.label}>Глубина забоя</span>
            <span className={s.value}>{activeWell.currentDepth.toFixed(2)} м</span>
          </div>
          <div className={s.hudCard}>
            <span className={s.label}>Скорость (ROP)</span>
            <span className={s.value}>{activeWell.rop} м/ч</span>
          </div>
          <div className={s.hudCard}>
            <span className={s.label}>Обороты ротора</span>
            <span className={s.value}>{activeWell.rpm} об/мин</span>
          </div>
          <div className={s.hudCard}>
            <span className={s.label}>Давление насоса</span>
            <span
              className={s.value}
              style={{
                color:
                  activeWell.pumpPressure > activeWell.limits.maxPumpPressure
                    ? '#ff3333'
                    : '#00ff66',
              }}
            >
              {Math.round(activeWell.pumpPressure)} / {activeWell.limits.maxPumpPressure} атм
            </span>
          </div>
          <button className={s.selectWellBtn} onClick={() => setIsModalOpen(true)}>
            Выбрать скважину ({wells.length})
          </button>
        </div>
      )}

      <section className={s.canvasContainer}>
        <WellVisualizer drillStringRef={drillStringRef}>
          <DrillingBridge activeWell={activeWell} drillStringRef={drillStringRef} />
        </WellVisualizer>
      </section>

      {isModalOpen && (
        <div className={s.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={s.modalHeader}>
              <h2>Мониторинг бурения: Выбор объекта</h2>
              <button className={s.closeBtn} onClick={() => setIsModalOpen(false)}>
                &times;
              </button>
            </div>
            <div className={s.tableWrapper}>
              <table className={s.wellsTable}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Статус</th>
                    <th>Глубина / План</th>
                    <th>Обороты (RPM)</th>
                    <th>Нагрузка (WOB)</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {wells.map((well) => (
                    <tr key={well.id} className={well.id === selectedWellId ? s.activeRow : ''}>
                      <td>{well.id}</td>
                      <td>{well.wellName}</td>
                      <td>
                        <span className={s.tableStatus} data-status={well.status}>
                          {well.status}
                        </span>
                      </td>
                      <td>
                        {well.currentDepth.toFixed(1)} / {well.targetDepth} м
                      </td>
                      <td>{well.rpm}</td>
                      <td>{well.weightOnBit.toFixed(1)} т</td>
                      <td>
                        <button
                          className={s.actionBtn}
                          onClick={() => {
                            setSelectedWellId(well.id);
                            setIsModalOpen(false);
                          }}
                        >
                          Смотреть 3D
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Model3D;
