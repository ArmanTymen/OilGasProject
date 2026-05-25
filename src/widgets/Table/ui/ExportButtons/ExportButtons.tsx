import { Button, CircularProgress } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useExportActions } from './useExportActions';
import type { ExtendedWell } from '../../model/useWellData';

interface ExportButtonsProps {
  filteredWells: ExtendedWell[];
  setFilterField: (e: string) => void;
  setFilterCluster: (e: string) => void;
  setFilterWell: (e: string) => void;
}

function ExportButtons({
  filteredWells,
  setFilterField,
  setFilterCluster,
  setFilterWell,
}: ExportButtonsProps) {
  const { exportExcel, exportPdf, isExportingExcel, isExportingPdf, isAnyTaskRunning } =
    useExportActions(filteredWells);

  const handleReset = () => {
    setFilterField('');
    setFilterCluster('');
    setFilterWell('');
  };

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<RestartAltIcon />}
        onClick={handleReset}
        disabled={isAnyTaskRunning}
      >
        Сбросить
      </Button>

      <Button
        variant="contained"
        color="primary"
        sx={{ ml: 1 }}
        startIcon={
          isExportingExcel ? <CircularProgress size={20} color="inherit" /> : <DownloadIcon />
        }
        onClick={exportExcel}
        disabled={isAnyTaskRunning}
      >
        {isExportingExcel ? 'Генерация...' : 'Excel'}
      </Button>

      <Button
        variant="contained"
        color="error"
        sx={{ ml: 1 }}
        startIcon={
          isExportingPdf ? <CircularProgress size={20} color="inherit" /> : <PictureAsPdfIcon />
        }
        onClick={exportPdf}
        disabled={isAnyTaskRunning}
      >
        {isExportingPdf ? 'Генерация...' : 'PDF'}
      </Button>
    </>
  );
}

export default ExportButtons;
