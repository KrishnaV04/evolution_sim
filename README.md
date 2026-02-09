# Evolution Simulator (Beta)

A web-based evolution simulator that demonstrates natural selection through DNA mutation and survival pressure. Watch populations of small creatures called **Bips** evolve over generations as they learn to navigate toward a destination.

Live at: [bip.rkvempati.com](https://bip.rkvempati.com)

## How It Works

### DNA Structure

Each Bip carries a DNA strand of exactly **100 segments**. Each segment encodes one of four movement directions: Up, Down, Left, or Right. The distribution of directions within the strand determines the Bip's movement probabilities.

For example, a Bip with 40 "Right" segments, 30 "Down", 20 "Left", and 10 "Up" has a 40% chance of moving right at each step, 30% down, 20% left, and 10% up.

The initial population's DNA is configured by setting four percentages that must sum to 100%. By default each direction gets 25% (equal probability).

### Movement & Days

Time is divided into **days**, each consisting of a configurable number of **steps** (default: 100, range: 100–1000).

At each step, every Bip picks a random index (0–99) from its DNA strand and moves 5 pixels in the direction stored at that index. If a movement would exit the sandbox, the position is clamped to the boundary edge — Bips near walls "waste" steps, creating selection pressure against wall-hugging DNA.

### Survival & Selection

The sandbox is divided into a **3x3 grid**. One cell is designated as the **destination zone**. Bips start from a configurable corner.

At the end of each day, only Bips whose position falls within the destination zone survive. All others are eliminated. With random DNA (25% each direction), the probability of landing in the correct 1/9 zone is low, creating strong selection pressure.

### Cloning & Reproduction

Surviving Bips reproduce through **cloning** in round-robin order until the population reaches the configured size (default: 50, max: 100).

For example, if 3 Bips survive, they take turns cloning: A, B, C, A, B, C, A... until there are 50 new Bips. Each clone inherits its parent's DNA (with potential mutations) and is placed back at the starting corner.

If zero Bips survive, the population is extinct — the simulation pauses and resets.

### Mutation

During cloning, each of the 100 DNA segments is independently checked for mutation. The mutation rate is configurable from 0% to 10% (default: 0.1%).

For each segment, a random number 0–100 is generated. If it falls below the mutation rate, the segment's direction changes to one of the other three directions with equal probability (1/3 each).

With 100 segments and a 1% rate, ~1 segment per Bip mutates per generation. At 0.1% (default), roughly 1 in 10 Bips will have a single mutation. Higher rates increase diversity but can disrupt well-adapted strands.

### Evolutionary Dynamics

Over many generations, the population's DNA shifts toward directions that favor reaching the destination. This emerges from three simple rules:

1. Random movement weighted by DNA
2. Survival based on position
3. Mutation during reproduction

Convergence speed depends on mutation rate, population size, day length, and the distance between start and destination.

## Simulation Page Layout

The simulation page has three panels:

- **Left (30%) — How It Works**: Detailed explanation of all simulation mechanics, the math behind DNA, mutation, cloning, and selection
- **Center (50%) — Sandbox**: The simulation canvas with a 3x3 grid overlay, destination zone highlight, day/step counters, Start/Pause/Reset controls, speed slider, and a Bip info panel below the canvas for inspecting individual Bips
- **Right (20%) — Parameters**: All configurable settings (DNA strand, starting corner, mutation rate, number of Bips, day length, destination zone)

## Configurable Parameters

| Parameter | Default | Range | Description |
|-----------|---------|-------|-------------|
| Starting DNA | 25% each | 0–100% per direction, must sum to 100% | Initial movement probability distribution |
| Starting Corner | Top Left | 4 corners | Where Bips spawn each day |
| Mutation Rate | 1% | 0–10% | Per-segment mutation probability during cloning |
| Number of Bips | 100 | 1–100 | Population size after reproduction |
| Day Length | 1000 | 100–1000 | Steps per day |
| Destination Zone | Center | Any of 9 grid cells | Survival zone |

Parameters are locked while the simulation is running. Press Reset to modify them.

## Interacting with Bips

- Click any Bip on the canvas to inspect its ID, generation, parent, and full DNA breakdown
- Use the **Tag Along** button to follow a specific Bip with a golden highlight for the rest of the day

## Tech Stack

- React 19 + TypeScript
- Vite (rolldown-vite)
- HTML5 Canvas for rendering
- gh-pages for deployment

## Development

```bash
npm install
npm run dev
```

## Deployment

```bash
npm run deploy
```

Deploys to GitHub Pages. Requires DNS CNAME record for `bip.rkvempati.com` pointing to your GitHub Pages domain.
