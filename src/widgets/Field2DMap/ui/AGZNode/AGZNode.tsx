import React from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { AGZIllustration } from './AGZIllustration';
import s from './AGZNode.module.css';

export interface AGZNodeData extends Record<string, unknown> {
  temperature?: string;
  flowRate?: string;
}

type AGZNodeProps = NodeProps<Node<AGZNodeData>>;

const PORT_Y_COORDINATES: number[] = [30, 50, 70, 90, 110, 130];

export const AGZNode: React.FC<AGZNodeProps> = ({ data }) => {
  return (
    <div className={s.container}>
      <AGZIllustration portYCoordinates={PORT_Y_COORDINATES} />

      {PORT_Y_COORDINATES.map((y: number, index: number) => (
        <Handle
          key={`handle-source-${index}`}
          type="source"
          position={Position.Right}
          id={`source-${index}`}
          className={s.handle}
          style={{ top: `${y}px` }}
        />
      ))}

      {data.temperature || data.flowRate ? (
        <div className={s.tooltip}>
          {data.temperature && <div>T: {data.temperature}</div>}
          {data.flowRate && <div>Q: {data.flowRate}</div>}
        </div>
      ) : null}
    </div>
  );
};
