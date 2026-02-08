import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-content">
        <h1 className="home-title">Evolution Simulator</h1>
        <p className="home-subtitle">Watch natural selection in action</p>

        <div className="home-description">
          <p>
            This simulation demonstrates how natural selection drives evolution through
            DNA mutation and survival pressure. Small creatures called <strong>Bips</strong> navigate
            a sandbox environment, each guided by their unique DNA strand that determines
            their movement patterns.
          </p>
          <div className="home-features">
            <div className="feature">
              <h3>DNA-Driven Movement</h3>
              <p>Each Bip carries 100 DNA segments that determine the probability of moving
                up, down, left, or right. Their behavior emerges from their genetic code.</p>
            </div>
            <div className="feature">
              <h3>Survival of the Fittest</h3>
              <p>At the end of each day, only Bips that reach the designated destination zone
                survive to reproduce. Those that don't make it are eliminated.</p>
            </div>
            <div className="feature">
              <h3>Mutation & Evolution</h3>
              <p>When surviving Bips clone themselves, each DNA segment has a small chance
                of mutating. Over generations, the population evolves to better reach
                the destination.</p>
            </div>
          </div>
        </div>

        <button className="start-button" onClick={() => navigate('/simulation')}>
          Start Simulation
        </button>
      </div>
    </div>
  );
}

export default HomePage;
