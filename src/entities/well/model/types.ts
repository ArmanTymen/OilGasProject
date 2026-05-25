export interface WellData {
  fieldName: string;
  clusterName: string;
  id: number;
  field: string;
  clusters: {
    id: number;
    cluster: string;
    wells: {
      id: number;
      well: string;
      I: number;
      U: number;
      debit: number;
      temperature: number;
      pressure: number;
      flowRate: number;
      nominalI: number;
      nominalU: number;
      nominalDebit: number;
      nominalTemperature: number;
      nominalPressure: number;
      nominalFlowRate: number;
    }[];
  }[];
}

export interface ProductionAnalytics {
  totalActual: number;
  totalPlan: number;
}

export interface DepthData {
  wellId: string;
  currentDepth: number;
  layers: {
    start: number;
    end: number;
    type: 'clay' | 'sand' | 'oil' | 'rock';
  }[];
}
