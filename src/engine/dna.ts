import { Direction, type DnaProbabilities, type DnaStrand } from '../types/simulation';
import { DNA_LENGTH } from '../types/constants';

const ALL_DIRECTIONS = [Direction.Up, Direction.Down, Direction.Left, Direction.Right];

export function generateDna(probs: DnaProbabilities): DnaStrand {
  const strand: DnaStrand = [];
  const entries = ALL_DIRECTIONS.map(dir => ({
    dir,
    count: Math.floor(probs[dir] * DNA_LENGTH / 100),
  }));

  // Distribute remainder to make total exactly DNA_LENGTH
  let total = entries.reduce((sum, e) => sum + e.count, 0);
  let i = 0;
  while (total < DNA_LENGTH) {
    entries[i % entries.length].count++;
    total++;
    i++;
  }

  for (const entry of entries) {
    for (let j = 0; j < entry.count; j++) {
      strand.push(entry.dir);
    }
  }

  // Fisher-Yates shuffle
  for (let k = strand.length - 1; k > 0; k--) {
    const j = Math.floor(Math.random() * (k + 1));
    [strand[k], strand[j]] = [strand[j], strand[k]];
  }

  return strand;
}

export function mutateDna(dna: DnaStrand, mutationRate: number): DnaStrand {
  const mutated = [...dna];

  for (let i = 0; i < mutated.length; i++) {
    if (Math.random() * 100 < mutationRate) {
      const current = mutated[i];
      const others = ALL_DIRECTIONS.filter(d => d !== current);
      mutated[i] = others[Math.floor(Math.random() * others.length)];
    }
  }

  return mutated;
}

export function dnaToProbs(dna: DnaStrand): DnaProbabilities {
  const counts: DnaProbabilities = {
    [Direction.Up]: 0,
    [Direction.Down]: 0,
    [Direction.Left]: 0,
    [Direction.Right]: 0,
  };

  for (const segment of dna) {
    counts[segment]++;
  }

  return {
    [Direction.Up]: counts[Direction.Up],
    [Direction.Down]: counts[Direction.Down],
    [Direction.Left]: counts[Direction.Left],
    [Direction.Right]: counts[Direction.Right],
  };
}
