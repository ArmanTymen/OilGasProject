import type { Cluster } from '@/entities/well/model/types';
import { useFieldMapData } from '@/widgets/Field2DMap/model/useFieldMapData';
import { useMemo } from 'react';

export const useFieldMapNodes = (
  selectedCluster: Cluster | null | undefined,
  setSelectedWellId: (id: number | null) => void,
) => {
  const { nodes, edges } = useFieldMapData(selectedCluster);

  const nodesWithClick = useMemo(
    () =>
      nodes.map((node) => {
        if (node.type === 'fa') {
          return {
            ...node,
            data: {
              ...node.data,
              onClick: () => setSelectedWellId(node.data.wellId as number),
            },
          };
        }
        return node;
      }),
    [nodes, setSelectedWellId],
  );

  return { nodesWithClick, edges };
};
