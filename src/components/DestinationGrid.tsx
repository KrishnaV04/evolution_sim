import { type GridPosition } from '../types/simulation';
import './DestinationGrid.css';

interface DestinationGridProps {
  value: GridPosition;
  onChange: (pos: GridPosition) => void;
  disabled?: boolean;
}

const GRID_LABELS = [
  'TL', 'TC', 'TR',
  'ML', 'MC', 'MR',
  'BL', 'BC', 'BR',
];

function DestinationGrid({ value, onChange, disabled = false }: DestinationGridProps) {
  return (
    <div className={`dest-grid ${disabled ? 'disabled' : ''}`}>
      {GRID_LABELS.map((label, i) => (
        <button
          key={i}
          className={`dest-cell ${value === i ? 'active' : ''}`}
          onClick={() => !disabled && onChange(i as GridPosition)}
          disabled={disabled}
          title={label}
        >
          {value === i ? '★' : ''}
        </button>
      ))}
    </div>
  );
}

export default DestinationGrid;
