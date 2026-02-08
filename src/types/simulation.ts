export const Direction = {
  Up: 'up',
  Down: 'down',
  Left: 'left',
  Right: 'right',
} as const;
export type Direction = (typeof Direction)[keyof typeof Direction];

export const SimulationStatus = {
  Idle: 'idle',
  Running: 'running',
  Paused: 'paused',
} as const;
export type SimulationStatus = (typeof SimulationStatus)[keyof typeof SimulationStatus];

export const Corner = {
  TopLeft: 'top-left',
  TopRight: 'top-right',
  BottomLeft: 'bottom-left',
  BottomRight: 'bottom-right',
} as const;
export type Corner = (typeof Corner)[keyof typeof Corner];

export type GridPosition = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface DnaProbabilities {
  [Direction.Up]: number;
  [Direction.Down]: number;
  [Direction.Left]: number;
  [Direction.Right]: number;
}

export type DnaStrand = Direction[];

export interface Position {
  x: number;
  y: number;
}

export interface BipData {
  id: string;
  dna: DnaStrand;
  position: Position;
  generation: number;
  parentId: string | null;
  alive: boolean;
}

export interface SimulationConfig {
  startingDna: DnaProbabilities;
  startingCorner: Corner;
  mutationPercentage: number;
  numberOfBips: number;
  dayLength: number;
  destinationGrid: GridPosition;
}

export interface SimulationState {
  status: SimulationStatus;
  config: SimulationConfig;
  bips: BipData[];
  currentDay: number;
  currentStep: number;
  speed: number;
  selectedBipId: string | null;
  tagAlongBipId: string | null;
  allBipsDiedMessage: string | null;
}

export type SimulationAction =
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'RESET' }
  | { type: 'SET_SPEED'; speed: number }
  | { type: 'UPDATE_CONFIG'; config: Partial<SimulationConfig> }
  | { type: 'TICK'; bips: BipData[]; step: number }
  | { type: 'END_DAY'; bips: BipData[]; day: number }
  | { type: 'SELECT_BIP'; bipId: string | null }
  | { type: 'TAG_ALONG'; bipId: string | null }
  | { type: 'ALL_BIPS_DIED' };
