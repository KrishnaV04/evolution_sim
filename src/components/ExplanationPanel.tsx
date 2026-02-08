import { useNavigate } from 'react-router-dom';
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
          <h3>Overview</h3>
          <p>
            This simulation models evolution through natural selection. A population
            of creatures called <strong>Bips</strong> must navigate from a starting corner
            to a destination zone within a fixed number of steps. Only those that reach
            the destination survive and reproduce, passing their genes to the next generation.
          </p>
        </section>

        <section className="explanation-section">
          <h3>DNA Structure</h3>
          <p>
            Each Bip carries a <strong>DNA strand</strong> consisting of exactly 100 segments.
            Each segment encodes one of four movement directions: Up, Down, Left, or Right.
          </p>
          <p>
            The distribution of directions within the 100 segments determines the Bip's
            movement probabilities. For example, if a Bip has 40 segments encoding "Right",
            30 encoding "Down", 20 encoding "Left", and 10 encoding "Up", then at each step
            it has a 40% chance of moving right, 30% down, 20% left, and 10% up.
          </p>
          <p>
            The initial DNA is configured by setting four percentages that must sum to 100%.
            These percentages determine how the 100 segments are distributed among directions
            for the starting population. By default, each direction gets 25 segments (equal
            probability of movement in any direction).
          </p>
        </section>

        <section className="explanation-section">
          <h3>Movement & Days</h3>
          <p>
            Time is divided into <strong>days</strong>, and each day consists of a configurable
            number of <strong>steps</strong> (default: 100, range: 100-1000).
          </p>
          <p>
            At each step, every Bip independently selects a movement direction. The selection
            works by picking a random segment index from 0-99 in the Bip's DNA strand and
            reading the direction stored at that index. The Bip then moves 5 pixels in that
            direction.
          </p>
          <p>
            If a movement would take a Bip outside the sandbox boundaries, its position is
            clamped to the edge. This means Bips near walls effectively "waste" steps pushing
            against the boundary, creating a natural selection pressure against wall-hugging DNA.
          </p>
        </section>

        <section className="explanation-section">
          <h3>The Sandbox Grid</h3>
          <p>
            The sandbox is divided into a <strong>3x3 grid</strong> of equal zones. One of these
            nine zones is designated as the <strong>destination zone</strong> (shown in green).
            Bips start from a configurable corner of the sandbox.
          </p>
          <p>
            The spatial relationship between the starting corner and the destination zone
            defines the selection pressure. For example, starting at the top-left with a
            destination at the bottom-right creates pressure for DNA strands that favor
            "Right" and "Down" movements.
          </p>
        </section>

        <section className="explanation-section">
          <h3>Survival & Selection</h3>
          <p>
            At the end of each day, every Bip's position is evaluated. If a Bip's coordinates
            fall within the destination zone rectangle, it <strong>survives</strong>. All other
            Bips are eliminated.
          </p>
          <p>
            The destination zone occupies exactly 1/9 of the total sandbox area (one cell of
            the 3x3 grid). This means that with purely random movement (equal 25% in each
            direction), a Bip has a relatively low probability of ending up in the correct zone,
            creating strong selection pressure.
          </p>
        </section>

        <section className="explanation-section">
          <h3>Cloning & Reproduction</h3>
          <p>
            After survival evaluation, the surviving Bips reproduce through <strong>cloning</strong>.
            The survivors clone themselves in round-robin order until the population reaches
            the configured population size (default: 50).
          </p>
          <p>
            For example, if 3 Bips survive out of 50, they take turns cloning: Bip A clones,
            Bip B clones, Bip C clones, Bip A clones again, and so on until there are 50 new
            Bips. Each clone inherits its parent's DNA (with potential mutations) and is placed
            back at the starting corner for the next day.
          </p>
          <p>
            If <strong>zero Bips survive</strong> a day, the entire population has gone extinct.
            The simulation pauses and displays a death message. You can then reset and adjust
            parameters to try again.
          </p>
        </section>

        <section className="explanation-section">
          <h3>Mutation</h3>
          <p>
            During cloning, each of the 100 DNA segments in the child's strand is independently
            subjected to a <strong>mutation check</strong>. The mutation rate is configurable
            from 0% to 10% (default: 0.1%).
          </p>
          <p>
            For each segment, a random number between 0 and 100 is generated. If it falls
            below the mutation rate, that segment mutates. When mutation occurs, the current
            direction is replaced with one of the other three directions, each with equal
            probability (33.3% each).
          </p>
          <p>
            <strong>Example:</strong> A segment currently encoding "Up" is checked for mutation
            with a 1% mutation rate. A random value of 0.7 is generated, which is less than 1,
            so mutation occurs. The segment randomly changes to "Down", "Left", or "Right"
            (each with 1/3 probability). If the random value had been 1.5, no mutation would
            occur and the segment stays as "Up".
          </p>
          <p>
            With 100 segments and a 1% mutation rate, on average 1 segment per Bip will mutate
            each generation. At 0.1% (default), roughly 1 in 10 Bips will have a single
            mutation per generation. Higher rates introduce more genetic diversity but can
            also disrupt well-adapted DNA strands.
          </p>
        </section>

        <section className="explanation-section">
          <h3>Evolutionary Dynamics</h3>
          <p>
            Over many generations, the population's aggregate DNA distribution shifts toward
            directions that favor reaching the destination. This is emergent behavior from
            three simple rules: random movement based on DNA, survival based on position,
            and mutation during reproduction.
          </p>
          <p>
            Early generations typically see high mortality as most Bips with random DNA
            fail to reach the destination. The few that do survive pass their slightly-biased
            DNA to the next generation. Over time, the population converges toward optimal
            movement patterns for the given start-destination pair.
          </p>
          <p>
            The speed of convergence depends on several factors: mutation rate (too low means
            slow adaptation, too high disrupts good DNA), population size (larger populations
            maintain more genetic diversity), day length (more steps give Bips more chances
            to reach the destination), and the distance between start and destination.
          </p>
        </section>

        <section className="explanation-section">
          <h3>Interacting with Bips</h3>
          <p>
            Click on any Bip in the sandbox to view its individual DNA breakdown in the
            panel below the sandbox. You can see its unique ID, generation number, parent ID,
            and full directional probability split.
          </p>
          <p>
            The <strong>Tag Along</strong> button follows a specific Bip with a golden
            highlight so you can track its movement through the rest of the current day.
          </p>
        </section>
      </div>
    </div>
  );
}

export default ExplanationPanel;
