import { useState } from 'react';
import { ROBOTO_FONT_BASE64 } from '@/features/well-export/assets/fonts/roboto-base64';
import type { ExtendedWell } from '../../model/useWellData';
import ExcelWorker from '@/features/well-export/lib/excel.worker.ts?worker';
import PdfWorker from '@/features/well-export/lib/pdf.worker.ts?worker';

export const useExportActions = (filteredWells: ExtendedWell[]) => {
  const [status, setStatus] = useState<'excel' | 'pdf' | null>(null);

  const downloadFile = (buffer: ArrayBuffer, extension: 'xlsx' | 'pdf') => {
    const mimeType =
      extension === 'xlsx'
        ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        : 'application/pdf';

    const blob = new Blob([buffer], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);

    link.href = url;
    link.download = `wells_export_${timestamp}.${extension}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExport = (type: 'excel' | 'pdf') => {
    setStatus(type);

    const worker = type === 'excel' ? new ExcelWorker() : new PdfWorker();

    worker.postMessage({
      filteredWells,
      fontBase64: type === 'pdf' ? ROBOTO_FONT_BASE64 : undefined,
    });

    worker.onmessage = (e) => {
      downloadFile(e.data, type === 'excel' ? 'xlsx' : 'pdf');
      setStatus(null);
      worker.terminate();
    };

    worker.onerror = (err) => {
      console.error(`${type.toUpperCase()} Worker Error:`, err);
      setStatus(null);
      worker.terminate();
    };
  };

  return {
    isExportingExcel: status === 'excel',
    isExportingPdf: status === 'pdf',
    isAnyTaskRunning: status !== null,
    exportExcel: () => handleExport('excel'),
    exportPdf: () => handleExport('pdf'),
  };
};
