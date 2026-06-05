import { useMemo } from 'react';
import type { Node, Edge } from '@xyflow/react';
import type { Cluster, Well } from '@/entities/well/model/types';

export const useFieldMapData = (selectedCluster: Cluster | null | undefined) => {
  const nodes: Node[] = useMemo(() => {
    if (!selectedCluster) return [];

    const agzNode: Node = {
      id: 'agz-1',
      type: 'agz',
      position: { x: -100, y: 150 },
      data: {},
    };

    const faNodes: Node[] = selectedCluster.wells.map((well: Well, index: number) => ({
      id: `fa-${well.id}`,
      type: 'fa',
      position: { x: 300, y: index * 100 },
      data: {
        label: well.well,
        pressure: well.pressure,
        temperature: well.temperature,
        debit: well.debit,
        imageUrl: '/assets/fa3.png',
        wellId: well.id,
      },
    }));

    return [agzNode, ...faNodes];
  }, [selectedCluster]);

  const edges: Edge[] = useMemo(() => {
    if (!selectedCluster) return [];

    return selectedCluster.wells.map(
      (well: Well, index: number): Edge => ({
        id: `edge-agz-fa-${well.id}`,
        source: 'agz-1',
        target: `fa-${well.id}`,
        sourceHandle: `source-${index}`,
        style: { stroke: '#3b82f6', strokeWidth: 2 },
      }),
    );
  }, [selectedCluster]);

  return { nodes, edges };
};
