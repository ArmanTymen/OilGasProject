import { useMemo } from 'react';

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

export const useWellDetail = (well: WellDetail | null) => {
  const detail = useMemo(() => {
    if (!well) return null;

    const nominalI = well.nominalI ?? (well.I ? well.I * 1.15 : undefined);
    const nominalU = well.nominalU ?? 440;
    const nominalDebit = well.nominalDebit ?? (well.debit ? well.debit * 1.1 : undefined);
    const nominalTemperature =
      well.nominalTemperature ?? (well.temperature ? well.temperature * 1.2 : undefined);
    const nominalPressure =
      well.nominalPressure ?? (well.pressure ? well.pressure * 1.2 : undefined);
    const nominalFlowRate =
      well.nominalFlowRate ?? (well.flowRate ? well.flowRate * 1.05 : undefined);

    const params = [
      { label: 'Ток (I)', value: well.I, nominal: nominalI, unit: ' А' },
      { label: 'Напряжение (U)', value: well.U, nominal: nominalU, unit: ' В' },
      { label: 'Давление', value: well.pressure, nominal: nominalPressure, unit: ' атм' },
      { label: 'Температура', value: well.temperature, nominal: nominalTemperature, unit: ' °C' },
      { label: 'Дебит', value: well.debit, nominal: nominalDebit, unit: ' м³/сут' },
      { label: 'Расход', value: well.flowRate, nominal: nominalFlowRate, unit: ' м³/сут' },
    ];

    return {
      wellName: well.well ?? '—',
      location: `${well.fieldName ?? '—'} / ${well.clusterName ?? '—'}`,
      params,
    };
  }, [well]);

  return detail;
};
