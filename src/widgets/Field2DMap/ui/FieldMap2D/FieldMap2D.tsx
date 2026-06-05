import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { CircularProgress, Box } from '@mui/material'; // Добавил нормальный лоадер, если используешь MUI
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

  return (
    <div className={s.root}>
      <div className={s.controls}>
        <select
          className={s.select}
          value={selectedFieldId ?? ''}
          disabled={isLoading}
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
          disabled={!selectedFieldId || isLoading}
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
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress size={40} />
          </Box>
        ) : !selectedClusterId ? (
          <p className={s.placeholder}>Выберите куст, чтобы увидеть скважины</p>
        ) : selectedCluster ? (
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
        ) : null}
      </div>

      <FADetailModal
        well={selectedWell}
        open={!!selectedWell}
        onClose={() => setSelectedWellId(null)}
      />
    </div>
  );
};
