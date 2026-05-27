// model/useFieldMapNodes.ts
import { useFieldMapData } from '@/widgets/Field2DMap/model/useFieldMapData';
import { useMemo } from 'react';

export const useFieldMapNodes = (
  selectedCluster: Parameters<typeof useFieldMapData>[0],
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
              onClick: () => setSelectedWellId(Number((node.id as string).replace('fa-', ''))),
            },
          };
        }
        return node;
      }),
    [nodes, setSelectedWellId],
  );

  return { nodesWithClick, edges };
};
