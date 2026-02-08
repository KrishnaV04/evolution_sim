import { useSimulationContext } from '../context/SimulationContext';
import { Direction } from '../types/simulation';
import { DIRECTION_COLORS, DIRECTION_LABELS } from '../types/constants';
import { dnaToProbs } from '../engine/dna';
import DnaBar from './DnaBar';
import './BipInfoPanel.css';

function BipInfoPanel() {
  const { state, dispatch } = useSimulationContext();
  const { selectedBipId, tagAlongBipId, bips } = state;

  const selectedBip = selectedBipId ? bips.find(b => b.id === selectedBipId) : null;

  if (!selectedBip) {
    return (
      <div className="bip-info-panel">
        <div className="bip-info-empty">
          <p>Click on a Bip in the sandbox to inspect it</p>
        </div>
      </div>
    );
  }

  const probs = dnaToProbs(selectedBip.dna);
  const isTagged = tagAlongBipId === selectedBip.id;

  return (
    <div className="bip-info-panel">
      <div className="bip-info-header">
        <h3>Bip Info</h3>
      </div>

      <div className="bip-info-content">
        <div className="bip-details-col">
          <div className="bip-detail">
            <span className="bip-detail-label">ID</span>
            <span className="bip-detail-value">{selectedBip.id}</span>
          </div>
          <div className="bip-detail">
            <span className="bip-detail-label">Gen</span>
            <span className="bip-detail-value">{selectedBip.generation}</span>
          </div>
          {selectedBip.parentId && (
            <div className="bip-detail">
              <span className="bip-detail-label">Parent</span>
              <span className="bip-detail-value">{selectedBip.parentId}</span>
            </div>
          )}
        </div>

        <div className="bip-dna-col">
          <div className="bip-dna-section">
            <DnaBar value={probs} onChange={() => {}} readonly />
          </div>
          <div className="bip-dna-breakdown">
            {([Direction.Up, Direction.Down, Direction.Left, Direction.Right] as Direction[]).map(dir => (
              <div key={dir} className="dna-stat">
                <span
                  className="dna-stat-dot"
                  style={{ backgroundColor: DIRECTION_COLORS[dir] }}
                />
                <span className="dna-stat-label">{DIRECTION_LABELS[dir]}</span>
                <span className="dna-stat-value">{probs[dir]}%</span>
              </div>
            ))}
          </div>
        </div>

        <button
          className={`tag-along-btn ${isTagged ? 'active' : ''}`}
          onClick={() =>
            dispatch({ type: 'TAG_ALONG', bipId: isTagged ? null : selectedBip.id })
          }
        >
          {isTagged ? 'Stop Following' : 'Tag Along'}
        </button>
      </div>
    </div>
  );
}

export default BipInfoPanel;
