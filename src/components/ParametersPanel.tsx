import ParameterEditor from './ParameterEditor';
import './ParametersPanel.css';

function ParametersPanel() {
  return (
    <div className="parameters-panel">
      <div className="parameters-header">
        <h3>Parameters</h3>
      </div>
      <div className="parameters-content">
        <ParameterEditor />
      </div>
    </div>
  );
}

export default ParametersPanel;
