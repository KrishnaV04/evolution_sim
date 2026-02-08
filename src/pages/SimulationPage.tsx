import { SimulationProvider } from '../context/SimulationContext';
import ExplanationPanel from '../components/ExplanationPanel';
import SimulationPanel from '../components/SimulationPanel';
import ParametersPanel from '../components/ParametersPanel';
import './SimulationPage.css';

function SimulationPage() {
  return (
    <SimulationProvider>
      <div className="simulation-page">
        <ExplanationPanel />
        <SimulationPanel />
        <ParametersPanel />
      </div>
    </SimulationProvider>
  );
}

export default SimulationPage;
