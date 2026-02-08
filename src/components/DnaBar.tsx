import { useRef, useCallback, useState, useEffect } from 'react';
import { Direction, type DnaProbabilities } from '../types/simulation';
import { DIRECTION_COLORS, DIRECTION_LABELS } from '../types/constants';
import './DnaBar.css';

interface DnaBarProps {
  value: DnaProbabilities;
  onChange: (probs: DnaProbabilities) => void;
  disabled?: boolean;
  readonly?: boolean;
}

const DIR_ORDER = [Direction.Left, Direction.Up, Direction.Right, Direction.Down];

function DnaBar({ value, onChange, disabled = false, readonly = false }: DnaBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<number | null>(null);
  const [segments, setSegments] = useState<number[]>(() =>
    DIR_ORDER.map(d => value[d])
  );

  useEffect(() => {
    setSegments(DIR_ORDER.map(d => value[d]));
  }, [value]);

  const handleMouseDown = useCallback((dividerIndex: number) => {
    if (disabled || readonly) return;
    setDragging(dividerIndex);
  }, [disabled, readonly]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (dragging === null || !barRef.current) return;

    const rect = barRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));

    const newSegments = [...segments];
    // Cumulative positions of dividers
    const cumBefore = newSegments.slice(0, dragging).reduce((a, b) => a + b, 0);
    const cumAfter = newSegments.slice(dragging + 2).reduce((a, b) => a + b, 0);

    // The divider separates segment[dragging] and segment[dragging+1]
    const minLeft = cumBefore;
    const maxRight = 100 - cumAfter;
    const clampedPct = Math.max(minLeft, Math.min(maxRight, pct));

    newSegments[dragging] = Math.round(clampedPct - cumBefore);
    newSegments[dragging + 1] = Math.round(maxRight - clampedPct);

    // Fix rounding
    const total = newSegments.reduce((a, b) => a + b, 0);
    if (total !== 100) {
      newSegments[dragging + 1] += 100 - total;
    }

    setSegments(newSegments);

    const probs: DnaProbabilities = {
      [Direction.Up]: newSegments[1],
      [Direction.Down]: newSegments[3],
      [Direction.Left]: newSegments[0],
      [Direction.Right]: newSegments[2],
    };
    onChange(probs);
  }, [dragging, segments, onChange]);

  const handleMouseUp = useCallback(() => {
    setDragging(null);
  }, []);

  useEffect(() => {
    if (dragging !== null) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragging, handleMouseMove, handleMouseUp]);

  let cumulative = 0;
  const dividerPositions = segments.slice(0, -1).map(s => {
    cumulative += s;
    return cumulative;
  });

  return (
    <div className={`dna-bar-container ${disabled || readonly ? 'disabled' : ''}`}>
      <div className="dna-bar" ref={barRef}>
        {DIR_ORDER.map((dir, i) => (
          <div
            key={dir}
            className="dna-segment"
            style={{
              width: `${segments[i]}%`,
              backgroundColor: DIRECTION_COLORS[dir],
            }}
          >
            {segments[i] > 8 && (
              <span className="dna-segment-label">
                {DIRECTION_LABELS[dir]} {segments[i]}%
              </span>
            )}
          </div>
        ))}
        {!readonly && dividerPositions.map((pos, i) => (
          <div
            key={i}
            className="dna-divider"
            style={{ left: `${pos}%` }}
            onMouseDown={(e) => {
              e.preventDefault();
              handleMouseDown(i);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default DnaBar;
