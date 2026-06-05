import { Handle, Position } from '@xyflow/react';
import styles from './FANode.module.css';

interface FANodeData {
  label: string;
  pressure: number;
  temperature: number;
  debit: number;
  imageUrl?: string;
  onClick?: () => void;
}

export const FANode = ({ data }: { data: FANodeData }) => {
  const isStopped = data.pressure === 0 && data.temperature === 0 && data.debit === 0;
  const isWorking = !isStopped && (data.pressure > 0 || data.temperature > 0 || data.debit > 0);

  const dataBackground = isStopped ? '#ff4d4f' : isWorking ? '#4CAF50' : '#f0f0f0';
  const textColor = isStopped ? '#fff' : '#333';
  const borderColor = isStopped ? '#d32f2f' : '#388e3c';

  return (
    <div
      className={styles.container}
      style={{ border: `1px solid ${borderColor}` }}
      onClick={data.onClick}
    >
      <div className={styles.imageSection}>
        <img src={data.imageUrl || '/assets/fa-real.png'} alt="ФА" className={styles.image} />
      </div>
      <div className={styles.dataSection} style={{ background: dataBackground, color: textColor }}>
        <div className={styles.label}>{data.label}</div>
        <div>P: {data.pressure.toFixed(2)}</div>
        <div>T: {data.temperature.toFixed(2)}°C</div>
        <div>Q: {data.debit.toFixed(2)} м³/сут</div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        className={styles.handle}
        style={{ background: borderColor }}
      />
    </div>
  );
};
