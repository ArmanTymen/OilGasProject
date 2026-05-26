import { useState } from 'react';
import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useFieldMapData } from '../../model/useFieldMapData';
import { AGZNode } from '../AGZNode/AGZNode';
import s from './FieldMap2D.module.css';
import '@xyflow/react/dist/style.css';
import { FANode } from '../FANode/FANode';
import { useGetWellStreamQuery } from '@/entities/well/api/wellApi';
import { FADetailModal } from '../FADetailModal/FADetailModal';

export const FieldMap2D = () => {
  const { data, isLoading } = useGetWellStreamQuery('');
  const [selectedFieldId, setSelectedFieldId] = useState<number | null>(null);
  const [selectedClusterId, setSelectedClusterId] = useState<number | null>(null);

  const selectedField = data?.find((f) => f.id === selectedFieldId);
  const selectedCluster = selectedField?.clusters.find((c) => c.id === selectedClusterId);
  const { nodes, edges } = useFieldMapData(selectedCluster);

  if (isLoading) return <div className={s.loader}>Загрузка данных...</div>;

  return (
    <div className={s.root}>
      <div className={s.controls}>
        <select
          className={s.select}
          onChange={(e) => {
            setSelectedFieldId(Number(e.target.value));
            setSelectedClusterId(null);
          }}
        >
          <option value="">Выберите месторождение</option>
          {data?.map((field) => (
            <option value={field.id} key={field.id}>
              {field.field}
            </option>
          ))}
        </select>

        <select
          className={s.select}
          disabled={!selectedFieldId}
          onChange={(e) => setSelectedClusterId(Number(e.target.value))}
        >
          <option value="">Выберите куст</option>
          {selectedField?.clusters.map((cluster) => (
            <option value={cluster.id} key={cluster.id}>
              {cluster.cluster}
            </option>
          ))}
        </select>
      </div>

      <div className={s.grid}>
        {!selectedClusterId && (
          <p className={s.placeholder}>Выберите куст, чтобы увидеть скважины</p>
        )}
        {selectedCluster && (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={{ agz: AGZNode, fa: FANode }}
            fitView
            minZoom={1}
            maxZoom={2}
            translateExtent={[
              [-500, -200],
              [900, 800],
            ]}
          >
            <Background />
            <Controls />
          </ReactFlow>
        )}
      </div>
      <FADetailModal />
    </div>
  );
};
