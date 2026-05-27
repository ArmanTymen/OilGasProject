import { Box, Typography, Modal, Button } from '@mui/material';
import s from './FADetailModal.module.css';
import { useWellDetail } from './model/useWellDetail';
import { ParamRow } from './ParamRow';

interface WellDetail {
  well?: string;
  fieldName?: string;
  clusterName?: string;
  I?: number;
  U?: number;
  pressure?: number;
  temperature?: number;
  debit?: number;
  flowRate?: number;
  nominalI?: number;
  nominalU?: number;
  nominalDebit?: number;
  nominalTemperature?: number;
  nominalPressure?: number;
  nominalFlowRate?: number;
}

interface FADetailModalProps {
  well: WellDetail | null;
  onClose: () => void;
}

export const FADetailModal = ({ well, onClose }: FADetailModalProps) => {
  const detail = useWellDetail(well);
  if (!detail) return null;

  return (
    <Modal open={true} onClose={onClose} aria-labelledby="modal-title">
      <Box className={s.modal}>
        <div className={s.imageSection}>
          <img src="/assets/fa3.png" alt="Фонтанная арматура" className={s.image} />
        </div>
        <div className={s.dataSection}>
          <Typography id="modal-title" variant="h5" sx={{ fontWeight: 'bold' }}>
            {detail.wellName}
          </Typography>
          <Typography variant="body1">{detail.location}</Typography>
          {detail.params.map((p) => (
            <ParamRow key={p.label} {...p} />
          ))}
          <Button variant="contained" onClick={onClose} className={s.closeButton}>
            Закрыть
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
