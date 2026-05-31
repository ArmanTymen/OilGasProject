import type { JSX, MouseEvent } from 'react';
import type { Well } from '@/entities/well/model/types';
import s from './WellSelectionModal.module.css';

interface WellSelectionModalProps {
  wells: Well[];
  selectedWellId: number;
  onClose: () => void;
  onSelectWell: (id: number) => void;
}

export const WellSelectionModal = ({
  wells,
  selectedWellId,
  onClose,
  onSelectWell,
}: WellSelectionModalProps): JSX.Element => {
  const handleOverlayClick = () => onClose();
  const handleContentClick = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation();

  const handleSelect = (id: number) => {
    onSelectWell(id);
    onClose();
  };

  return (
    <div className={s.modalOverlay} onClick={handleOverlayClick}>
      <div className={s.modalContent} onClick={handleContentClick}>
        <div className={s.modalHeader}>
          <h2>Мониторинг бурения: Выбор объекта</h2>
          <button className={s.closeBtn} onClick={onClose}>
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
                    <button className={s.actionBtn} onClick={() => handleSelect(well.id)}>
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
  );
};
