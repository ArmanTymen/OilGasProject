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

export interface IDrillingLimits {
  maxPumpPressure: number;
  minFlowIn: number;
  maxTorque: number;
}

export interface IDrillingHistoryPoint {
  timestamp: string;
  depth: number;
  rop: number;
  hookLoad: number;
  weightOnBit: number;
  rpm: number;
  torque: number;
  pumpPressure: number;
  flowIn: number;
  flowOut: number;
  gasContent: number;
}

export interface IDrillingWell {
  id: number;
  wellName: string;
  status: 'бурение' | 'спо' | 'промывка' | 'простой';
  currentDepth: number;
  targetDepth: number;
  bottomHoleCoord: { x: number; y: number; z: number };
  rop: number;
  hookLoad: number;
  weightOnBit: number;
  rpm: number;
  torque: number;
  pumpPressure: number;
  flowIn: number;
  flowOut: number;
  gasContent: number;
  currentLayer: 'песок' | 'глина' | 'нефть' | 'скала';
  limits: IDrillingLimits;
  history: IDrillingHistoryPoint[];
}

export interface IDrillingDelta {
  id: IDrillingWell['id'];
  currentDepth: number;
  bottomHoleCoord: { x: number; y: number; z: number };
  rop: number;
  pumpPressure: number;
  torque: number;
  newHistoryPoint: IDrillingHistoryPoint;
}

export type WellStatus = 'бурение' | 'простой' | 'спо' | 'промывка';

export interface Well {
  id: number;
  wellName: string;
  status: WellStatus;
  currentDepth: number;
  targetDepth: number;
  rop: number;
  rpm: number;
  pumpPressure: number;
  weightOnBit: number;
  limits: {
    maxPumpPressure: number;
  };
}
