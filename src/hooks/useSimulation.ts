import { useEffect, useRef, useCallback } from 'react';
import { SimulationStatus } from '../types/simulation';
import { useSimulationContext } from '../context/SimulationContext';
import { SimulationEngine } from '../engine/SimulationEngine';

export function useSimulation() {
  const { state, dispatch, engineRef } = useSimulationContext();
  const stateRef = useRef(state);
  stateRef.current = state;

  const initializeEngine = useCallback(() => {
    const engine = new SimulationEngine(stateRef.current.config);
    engine.initialize();
    engineRef.current = engine;
    dispatch({ type: 'TICK', bips: engine.getBipData(), step: 0 });
  }, [dispatch, engineRef]);

  const handleStart = useCallback(() => {
    if (state.status === SimulationStatus.Idle) {
      initializeEngine();
    }
    dispatch({ type: 'START' });
  }, [state.status, dispatch, initializeEngine]);

  const handlePause = useCallback(() => {
    dispatch({ type: 'PAUSE' });
  }, [dispatch]);

  const handleReset = useCallback(() => {
    dispatch({ type: 'RESET' });
    engineRef.current = null;
  }, [dispatch, engineRef]);

  // Animation loop
  useEffect(() => {
    if (state.status !== SimulationStatus.Running) return;

    let rafId: number;
    let stepAccumulator = stateRef.current.currentStep;

    const loop = () => {
      const engine = engineRef.current;
      if (!engine) return;

      const s = stateRef.current;
      const ticksPerFrame = s.speed;

      for (let i = 0; i < ticksPerFrame; i++) {
        if (stepAccumulator >= s.config.dayLength) {
          // End of day
          const survivorCount = engine.evaluateDay();

          if (survivorCount === 0) {
            dispatch({ type: 'ALL_BIPS_DIED' });
            return;
          }

          engine.reproduce();
          const newDay = s.currentDay + 1;
          stepAccumulator = 0;
          dispatch({ type: 'END_DAY', bips: engine.getBipData(), day: newDay });

          // Clear tag-along if bip no longer exists
          if (s.tagAlongBipId && !engine.getBip(s.tagAlongBipId)) {
            dispatch({ type: 'TAG_ALONG', bipId: null });
          }

          rafId = requestAnimationFrame(loop);
          return;
        }

        engine.tick();
        stepAccumulator++;
      }

      dispatch({ type: 'TICK', bips: engine.getBipData(), step: stepAccumulator });
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [state.status, state.speed, dispatch, engineRef]);

  return {
    handleStart,
    handlePause,
    handleReset,
  };
}
