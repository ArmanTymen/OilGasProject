import { useMemo } from 'react';
import type { Node, Edge } from '@xyflow/react';

interface Well {
  id: number;
  well: string;
  pressure: number;
  temperature: number;
  debit: number;
}

interface Cluster {
  id: number;
  cluster: string;
  wells: Well[];
}

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
      },
    }));

    return [agzNode, ...faNodes];
  }, [selectedCluster]);

  const edges: Edge[] = useMemo(() => {
    if (!selectedCluster) return [];

    // Добавляем index в параметры callback-функции
    return selectedCluster.wells.map(
      (well: Well, index: number): Edge => ({
        id: `edge-agz-fa-${well.id}`,
        source: 'agz-1',
        target: `fa-${well.id}`,
        // Привязываем конкретный индекс скважины к конкретному порту АГЗУ
        sourceHandle: `source-${index}`,
        style: { stroke: '#3b82f6', strokeWidth: 2 },
      }),
    );
  }, [selectedCluster]);

  return { nodes, edges };
};
