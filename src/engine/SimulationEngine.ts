import { type SimulationConfig, type BipData, type Position, Corner } from '../types/simulation';
import { SANDBOX_SIZE, CELL_SIZE } from '../types/constants';
import { Bip } from './Bip';
import { generateDna } from './dna';

export class SimulationEngine {
  private bips: Bip[] = [];
  private config: SimulationConfig;
  private nextBipId: number = 0;
  private currentGeneration: number = 0;

  constructor(config: SimulationConfig) {
    this.config = config;
  }

  initialize(): void {
    this.bips = [];
    this.nextBipId = 0;
    this.currentGeneration = 0;

    const startPos = this.getStartPosition();

    for (let i = 0; i < this.config.numberOfBips; i++) {
      const id = this.generateId();
      const dna = generateDna(this.config.startingDna);
      // Add small random offset so bips don't all stack on same pixel
      const offset = {
        x: startPos.x + (Math.random() - 0.5) * 20,
        y: startPos.y + (Math.random() - 0.5) * 20,
      };
      offset.x = Math.max(0, Math.min(SANDBOX_SIZE, offset.x));
      offset.y = Math.max(0, Math.min(SANDBOX_SIZE, offset.y));
      this.bips.push(new Bip(id, dna, offset, 0, null));
    }
  }

  tick(): void {
    for (const bip of this.bips) {
      bip.step();
    }
  }

  evaluateDay(): number {
    const dest = this.getDestinationRect();

    let survivorCount = 0;
    for (const bip of this.bips) {
      const { x, y } = bip.position;
      if (x >= dest.x && x <= dest.x + dest.w && y >= dest.y && y <= dest.y + dest.h) {
        bip.alive = true;
        survivorCount++;
      } else {
        bip.alive = false;
      }
    }

    return survivorCount;
  }

  reproduce(): Bip[] {
    const survivors = this.bips.filter(b => b.alive);
    if (survivors.length === 0) return [];

    this.currentGeneration++;
    const startPos = this.getStartPosition();
    const newBips: Bip[] = [];

    let idx = 0;
    while (newBips.length < this.config.numberOfBips) {
      const parent = survivors[idx % survivors.length];
      const id = this.generateId();
      const child = parent.clone(id, this.config.mutationPercentage);
      // Reset child position to start
      const offset = {
        x: startPos.x + (Math.random() - 0.5) * 20,
        y: startPos.y + (Math.random() - 0.5) * 20,
      };
      child.position.x = Math.max(0, Math.min(SANDBOX_SIZE, offset.x));
      child.position.y = Math.max(0, Math.min(SANDBOX_SIZE, offset.y));
      child.alive = true;
      newBips.push(child);
      idx++;
    }

    this.bips = newBips;
    return newBips;
  }

  getBipData(): BipData[] {
    return this.bips.map(b => b.toData());
  }

  getBip(id: string): Bip | undefined {
    return this.bips.find(b => b.id === id);
  }

  getDestinationRect(): { x: number; y: number; w: number; h: number } {
    const gridPos = this.config.destinationGrid;
    const col = gridPos % 3;
    const row = Math.floor(gridPos / 3);
    return {
      x: col * CELL_SIZE,
      y: row * CELL_SIZE,
      w: CELL_SIZE,
      h: CELL_SIZE,
    };
  }

  getStartPosition(): Position {
    const margin = 15;
    switch (this.config.startingCorner) {
      case Corner.TopLeft:
        return { x: margin, y: margin };
      case Corner.TopRight:
        return { x: SANDBOX_SIZE - margin, y: margin };
      case Corner.BottomLeft:
        return { x: margin, y: SANDBOX_SIZE - margin };
      case Corner.BottomRight:
        return { x: SANDBOX_SIZE - margin, y: SANDBOX_SIZE - margin };
    }
  }

  getCurrentGeneration(): number {
    return this.currentGeneration;
  }

  private generateId(): string {
    return `gen${this.currentGeneration}-${this.nextBipId++}`;
  }
}
