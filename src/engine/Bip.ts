import { Direction, type DnaStrand, type BipData, type Position } from '../types/simulation';
import { SANDBOX_SIZE, STEP_SIZE } from '../types/constants';
import { mutateDna } from './dna';

export class Bip {
  id: string;
  dna: DnaStrand;
  position: Position;
  generation: number;
  parentId: string | null;
  alive: boolean;

  constructor(
    id: string,
    dna: DnaStrand,
    startPosition: Position,
    generation: number,
    parentId: string | null,
  ) {
    this.id = id;
    this.dna = dna;
    this.position = { ...startPosition };
    this.generation = generation;
    this.parentId = parentId;
    this.alive = true;
  }

  step(): void {
    const direction = this.pickDirection();
    const { x, y } = this.position;

    switch (direction) {
      case Direction.Up:
        this.position.y = Math.max(0, y - STEP_SIZE);
        break;
      case Direction.Down:
        this.position.y = Math.min(SANDBOX_SIZE, y + STEP_SIZE);
        break;
      case Direction.Left:
        this.position.x = Math.max(0, x - STEP_SIZE);
        break;
      case Direction.Right:
        this.position.x = Math.min(SANDBOX_SIZE, x + STEP_SIZE);
        break;
    }
  }

  private pickDirection(): Direction {
    const roll = Math.floor(Math.random() * this.dna.length);
    return this.dna[roll];
  }

  clone(newId: string, mutationRate: number): Bip {
    const newDna = mutateDna(this.dna, mutationRate);
    return new Bip(newId, newDna, this.position, this.generation + 1, this.id);
  }

  toData(): BipData {
    return {
      id: this.id,
      dna: [...this.dna],
      position: { ...this.position },
      generation: this.generation,
      parentId: this.parentId,
      alive: this.alive,
    };
  }
}
