import { type SimulationConfig, Corner, Direction } from './simulation';

export const DEFAULT_CONFIG: SimulationConfig = {
  startingDna: {
    [Direction.Up]: 20,
    [Direction.Down]: 30,
    [Direction.Left]: 20,
    [Direction.Right]: 30,
  },
  startingCorner: Corner.TopLeft,
  mutationPercentage: 4,
  numberOfBips: 50,
  dayLength: 450,
  destinationGrid: 4,
};

export const SANDBOX_SIZE = 500;
export const BIP_RADIUS = 4;
export const STEP_SIZE = 5;
export const GRID_CELLS = 3;
export const CELL_SIZE = SANDBOX_SIZE / GRID_CELLS;
export const DNA_LENGTH = 100;

export const DIRECTION_COLORS: Record<Direction, string> = {
  [Direction.Up]: '#4CAF50',
  [Direction.Down]: '#F44336',
  [Direction.Left]: '#2196F3',
  [Direction.Right]: '#FF9800',
};

export const DIRECTION_LABELS: Record<Direction, string> = {
  [Direction.Up]: 'Up',
  [Direction.Down]: 'Down',
  [Direction.Left]: 'Left',
  [Direction.Right]: 'Right',
};

export const SPEED_OPTIONS = [1, 2, 5, 10, 20];
