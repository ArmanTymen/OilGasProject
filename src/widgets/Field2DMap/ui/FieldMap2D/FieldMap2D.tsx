import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { AGZNode } from '../AGZNode/AGZNode';
import { FANode } from '../FANode/FANode';
import { FADetailModal } from '../FADetailModal/FADetailModal';
import s from './FieldMap2D.module.css';
import { useFieldMapState } from './model/useFieldMapState';
import { useFieldMapNodes } from './model/useFieldMapNodes';

export const FieldMap2D = () => {
  const {
    data,
    isLoading,
    selectedField,
    selectedCluster,
    selectedWell,
    selectedFieldId,
    selectedClusterId,
    setSelectedFieldId,
    setSelectedClusterId,
    setSelectedWellId,
  } = useFieldMapState();

  const { nodesWithClick, edges } = useFieldMapNodes(selectedCluster, setSelectedWellId);

  if (isLoading) return <div className={s.loader}>Загрузка данных...</div>;

  return (
    <div className={s.root}>
      <div className={s.controls}>
        <select
          className={s.select}
          value={selectedFieldId ?? ''}
          onChange={(e) => {
            setSelectedFieldId(e.target.value ? Number(e.target.value) : null);
            setSelectedClusterId(null);
            setSelectedWellId(null);
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
          value={selectedClusterId ?? ''}
          onChange={(e) => {
            setSelectedClusterId(e.target.value ? Number(e.target.value) : null);
            setSelectedWellId(null);
          }}
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
            nodes={nodesWithClick}
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
      <FADetailModal well={selectedWell} onClose={() => setSelectedWellId(null)} />
    </div>
  );
};
