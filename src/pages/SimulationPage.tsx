import { SimulationProvider } from '../context/SimulationContext';
import ExplanationPanel from '../components/ExplanationPanel';
import SimulationPanel from '../components/SimulationPanel';
import BipInfoPanel from '../components/BipInfoPanel';
import './SimulationPage.css';

function SimulationPage() {
  return (
    <SimulationProvider>
      <div className="simulation-page">
        <ExplanationPanel />
        <SimulationPanel />
        <BipInfoPanel />
      </div>
    </SimulationProvider>
  );
}

export default SimulationPage;
