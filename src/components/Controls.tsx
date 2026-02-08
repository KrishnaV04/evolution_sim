import { SimulationStatus } from '../types/simulation';
import { useSimulationContext } from '../context/SimulationContext';
import { useSimulation } from '../hooks/useSimulation';
import { SPEED_OPTIONS } from '../types/constants';
import './Controls.css';

function Controls() {
  const { state, dispatch } = useSimulationContext();
  const { handleStart, handlePause, handleReset } = useSimulation();

  return (
    <div className="controls">
      <div className="controls-buttons">
        {state.status !== SimulationStatus.Running ? (
          <button className="btn-start" onClick={handleStart}>
            {state.status === SimulationStatus.Idle ? 'Start' : 'Resume'}
          </button>
        ) : (
          <button className="btn-pause" onClick={handlePause}>
            Pause
          </button>
        )}
        <button
          className="btn-reset"
          onClick={handleReset}
          disabled={state.status === SimulationStatus.Idle && state.bips.length === 0}
        >
          Reset
        </button>
      </div>

      <div className="speed-control">
        <label>Speed: {state.speed}x</label>
        <input
          type="range"
          min={0}
          max={SPEED_OPTIONS.length - 1}
          value={SPEED_OPTIONS.indexOf(state.speed)}
          onChange={(e) => {
            dispatch({ type: 'SET_SPEED', speed: SPEED_OPTIONS[Number(e.target.value)] });
          }}
        />
      </div>
    </div>
  );
}

export default Controls;
