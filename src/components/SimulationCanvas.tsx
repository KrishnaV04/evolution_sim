import { useRef, useCallback } from 'react';
import { useSimulationContext } from '../context/SimulationContext';
import { useCanvasRenderer } from '../hooks/useCanvasRenderer';
import { SANDBOX_SIZE, BIP_RADIUS } from '../types/constants';
import './SimulationCanvas.css';

function SimulationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { state, dispatch } = useSimulationContext();

  useCanvasRenderer(
    canvasRef,
    state.bips,
    state.config,
    state.selectedBipId,
    state.tagAlongBipId,
  );

  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = SANDBOX_SIZE / rect.width;
    const scaleY = SANDBOX_SIZE / rect.height;
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    let closestBip: string | null = null;
    let closestDist = Infinity;

    for (const bip of state.bips) {
      const dx = bip.position.x - clickX;
      const dy = bip.position.y - clickY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < BIP_RADIUS * 3 && dist < closestDist) {
        closestDist = dist;
        closestBip = bip.id;
      }
    }

    dispatch({ type: 'SELECT_BIP', bipId: closestBip });
  }, [state.bips, dispatch]);

  return (
    <canvas
      ref={canvasRef}
      className="simulation-canvas"
      width={SANDBOX_SIZE}
      height={SANDBOX_SIZE}
      onClick={handleClick}
    />
  );
}

export default SimulationCanvas;
