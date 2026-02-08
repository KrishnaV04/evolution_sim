import { useNavigate } from 'react-router-dom';
import ParameterEditor from './ParameterEditor';
import './ExplanationPanel.css';

function ExplanationPanel() {
  const navigate = useNavigate();

  return (
    <div className="explanation-panel">
      <div className="explanation-header">
        <h2 className="explanation-title" onClick={() => navigate('/')}>
          Evolution Sim
        </h2>
      </div>

      <div className="explanation-content">
        <section className="explanation-section">
          <h3>How It Works</h3>
          <p>
            Each <strong>Bip</strong> carries a DNA strand of 100 segments. Each segment
            encodes a movement direction (Up, Down, Left, Right). During each step of a
            day, a Bip randomly picks one of its 100 segments and moves in that direction.
          </p>
          <p>
            At the end of each day, only Bips that reach the <strong>destination zone</strong> (green
            square) survive. Survivors clone themselves to repopulate, with a chance of
            mutation on each DNA segment during cloning.
          </p>
          <p>
            Over generations, natural selection drives the population's DNA to favor
            directions that lead toward the destination.
          </p>
        </section>

        <section className="explanation-section">
          <h3>Parameters</h3>
          <ParameterEditor />
        </section>
      </div>
    </div>
  );
}

export default ExplanationPanel;
