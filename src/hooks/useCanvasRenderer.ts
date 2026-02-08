import { useEffect, type RefObject } from 'react';
import { type BipData, type SimulationConfig } from '../types/simulation';
import { SANDBOX_SIZE, CELL_SIZE, BIP_RADIUS, DIRECTION_COLORS } from '../types/constants';
import { dnaToProbs } from '../engine/dna';

export function useCanvasRenderer(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  bips: BipData[],
  config: SimulationConfig,
  selectedBipId: string | null,
  tagAlongBipId: string | null,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(0, 0, SANDBOX_SIZE, SANDBOX_SIZE);

    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    for (let i = 1; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, SANDBOX_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(SANDBOX_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Draw destination zone
    const destCol = config.destinationGrid % 3;
    const destRow = Math.floor(config.destinationGrid / 3);
    ctx.fillStyle = 'rgba(76, 175, 80, 0.15)';
    ctx.fillRect(destCol * CELL_SIZE, destRow * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    ctx.strokeStyle = 'rgba(76, 175, 80, 0.5)';
    ctx.lineWidth = 2;
    ctx.strokeRect(destCol * CELL_SIZE, destRow * CELL_SIZE, CELL_SIZE, CELL_SIZE);

    // Draw bips
    for (const bip of bips) {
      const probs = dnaToProbs(bip.dna);
      // Use dominant direction color
      let maxDir = probs.up >= probs.down && probs.up >= probs.left && probs.up >= probs.right ? 'up' :
                   probs.down >= probs.left && probs.down >= probs.right ? 'down' :
                   probs.left >= probs.right ? 'left' : 'right';
      const color = DIRECTION_COLORS[maxDir as keyof typeof DIRECTION_COLORS];

      ctx.beginPath();
      ctx.arc(bip.position.x, bip.position.y, BIP_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      // Selected bip highlight
      if (bip.id === selectedBipId) {
        ctx.beginPath();
        ctx.arc(bip.position.x, bip.position.y, BIP_RADIUS + 4, 0, Math.PI * 2);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Tag-along highlight
      if (bip.id === tagAlongBipId) {
        ctx.beginPath();
        ctx.arc(bip.position.x, bip.position.y, BIP_RADIUS + 6, 0, Math.PI * 2);
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 2;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }
  }, [canvasRef, bips, config, selectedBipId, tagAlongBipId]);
}
