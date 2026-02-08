import { createContext, useContext, useReducer, useRef, type ReactNode } from 'react';
import {
  SimulationStatus,
  type SimulationState,
  type SimulationAction,
} from '../types/simulation';
import { DEFAULT_CONFIG } from '../types/constants';
import { SimulationEngine } from '../engine/SimulationEngine';

const initialState: SimulationState = {
  status: SimulationStatus.Idle,
  config: { ...DEFAULT_CONFIG },
  bips: [],
  currentDay: 0,
  currentStep: 0,
  speed: 1,
  selectedBipId: null,
  tagAlongBipId: null,
  allBipsDiedMessage: null,
};

function simulationReducer(state: SimulationState, action: SimulationAction): SimulationState {
  switch (action.type) {
    case 'START':
      return { ...state, status: SimulationStatus.Running, allBipsDiedMessage: null };
    case 'PAUSE':
      return { ...state, status: SimulationStatus.Paused };
    case 'RESET':
      return {
        ...initialState,
        config: { ...state.config },
        speed: state.speed,
      };
    case 'SET_SPEED':
      return { ...state, speed: action.speed };
    case 'UPDATE_CONFIG':
      return { ...state, config: { ...state.config, ...action.config } };
    case 'TICK':
      return { ...state, bips: action.bips, currentStep: action.step };
    case 'END_DAY':
      return {
        ...state,
        bips: action.bips,
        currentDay: action.day,
        currentStep: 0,
      };
    case 'SELECT_BIP':
      return { ...state, selectedBipId: action.bipId };
    case 'TAG_ALONG':
      return { ...state, tagAlongBipId: action.bipId };
    case 'ALL_BIPS_DIED':
      return {
        ...state,
        status: SimulationStatus.Paused,
        allBipsDiedMessage: 'All Bips perished! Adjust parameters and try again.',
      };
    default:
      return state;
  }
}

interface SimulationContextValue {
  state: SimulationState;
  dispatch: React.Dispatch<SimulationAction>;
  engineRef: React.MutableRefObject<SimulationEngine | null>;
}

const SimulationContext = createContext<SimulationContextValue | null>(null);

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(simulationReducer, initialState);
  const engineRef = useRef<SimulationEngine | null>(null);

  return (
    <SimulationContext.Provider value={{ state, dispatch, engineRef }}>
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulationContext(): SimulationContextValue {
  const ctx = useContext(SimulationContext);
  if (!ctx) {
    throw new Error('useSimulationContext must be used within SimulationProvider');
  }
  return ctx;
}
