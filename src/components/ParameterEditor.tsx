import { SimulationStatus, Corner, type DnaProbabilities, type GridPosition } from '../types/simulation';
import { useSimulationContext } from '../context/SimulationContext';
import DnaBar from './DnaBar';
import DestinationGrid from './DestinationGrid';
import './ParameterEditor.css';

function ParameterEditor() {
  const { state, dispatch } = useSimulationContext();
  const { config, status } = state;
  const disabled = status !== SimulationStatus.Idle;

  const updateConfig = (partial: Partial<typeof config>) => {
    dispatch({ type: 'UPDATE_CONFIG', config: partial });
  };

  return (
    <div className="param-editor">
      <div className="param-group">
        <label className="param-label">Starting DNA Strand</label>
        <DnaBar
          value={config.startingDna}
          onChange={(probs: DnaProbabilities) => updateConfig({ startingDna: probs })}
          disabled={disabled}
        />
      </div>

      <div className="param-group">
        <label className="param-label">Starting Corner</label>
        <div className="corner-buttons">
          {[Corner.TopLeft, Corner.TopRight, Corner.BottomLeft, Corner.BottomRight].map(corner => (
            <button
              key={corner}
              className={`corner-btn ${config.startingCorner === corner ? 'active' : ''}`}
              onClick={() => updateConfig({ startingCorner: corner })}
              disabled={disabled}
            >
              {corner.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="param-group">
        <label className="param-label">
          Mutation Rate: {config.mutationPercentage}%
        </label>
        <input
          type="range"
          min={0}
          max={10}
          step={0.1}
          value={config.mutationPercentage}
          onChange={(e) => updateConfig({ mutationPercentage: parseFloat(e.target.value) })}
          disabled={disabled}
          className="param-range"
        />
      </div>

      <div className="param-group">
        <label className="param-label">
          Number of Bips: {config.numberOfBips}
        </label>
        <input
          type="range"
          min={1}
          max={100}
          step={1}
          value={config.numberOfBips}
          onChange={(e) => updateConfig({ numberOfBips: parseInt(e.target.value) })}
          disabled={disabled}
          className="param-range"
        />
      </div>

      <div className="param-group">
        <label className="param-label">
          Day Length: {config.dayLength} steps
        </label>
        <input
          type="range"
          min={100}
          max={1000}
          step={10}
          value={config.dayLength}
          onChange={(e) => updateConfig({ dayLength: parseInt(e.target.value) })}
          disabled={disabled}
          className="param-range"
        />
      </div>

      <div className="param-group">
        <label className="param-label">Destination Zone</label>
        <DestinationGrid
          value={config.destinationGrid}
          onChange={(pos: GridPosition) => updateConfig({ destinationGrid: pos })}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

export default ParameterEditor;
