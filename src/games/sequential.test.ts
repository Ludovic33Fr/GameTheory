import { describe, it, expect } from 'vitest';
import { entrantMonopoly, solveBackwardInduction } from './sequential';

describe('entrantMonopoly tree', () => {
  it('has the right shape: entrant first, then monopolist if entry occurred', () => {
    expect(entrantMonopoly.player).toBe('entrant');
    expect(entrantMonopoly.actions.map((a) => a.label)).toEqual(['Ne pas entrer', 'Entrer']);
  });
});

describe('solveBackwardInduction', () => {
  it('the SPNE is (Entrer, Accommoder)', () => {
    const solution = solveBackwardInduction(entrantMonopoly);
    expect(solution.path.map((s) => s.action)).toEqual(['Entrer', 'Accommoder']);
    expect(solution.payoffs).toEqual([2, 2]);
  });
});
