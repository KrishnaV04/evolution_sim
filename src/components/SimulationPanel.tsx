import { useSimulationContext } from '../context/SimulationContext';
import SimulationCanvas from './SimulationCanvas';
import Controls from './Controls';
import './SimulationPanel.css';

function SimulationPanel() {
  const { state } = useSimulationContext();

  return (
    <div className="simulation-panel">
      <div className="sim-status-bar">
        <span className="sim-stat">Day: {state.currentDay}</span>
        <span className="sim-stat">
          Step: {state.currentStep} / {state.config.dayLength}
        </span>
        <span className="sim-stat">Bips: {state.bips.length}</span>
      </div>

      <div className="sim-canvas-wrapper">
        <SimulationCanvas />
        {state.allBipsDiedMessage && (
          <div className="sim-death-overlay">
            <p>{state.allBipsDiedMessage}</p>
          </div>
        )}
      </div>

      <Controls />
    </div>
  );
}

export default SimulationPanel;
