import { Box, Typography, Modal, Button } from '@mui/material';
import s from './FADetailModal.module.css';
import { useWellDetail } from './model/useWellDetail';
import { ParamRow } from './ParamRow';
import type { SelectedWellExtended } from '@/entities/well/model/types';

interface FADetailModalProps {
  well: SelectedWellExtended | null;
  open: boolean;
  onClose: () => void;
}

export const FADetailModal = ({ well, onClose, open }: FADetailModalProps) => {
  const detail = useWellDetail(well);
  if (!detail) return null;

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
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
