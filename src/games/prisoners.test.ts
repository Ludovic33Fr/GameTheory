import { describe, it, expect } from 'vitest';
import { prisonersDilemma } from './prisoners';

describe('prisonersDilemma', () => {
  it('has two players with two actions each', () => {
    expect(prisonersDilemma.players).toBe(2);
    expect(prisonersDilemma.actions).toEqual([['C', 'D'], ['C', 'D']]);
  });

  it('rewards mutual cooperation moderately', () => {
    expect(prisonersDilemma.payoff(['C', 'C'])).toEqual([-1, -1]);
  });

  it('punishes the cooperator when the other defects', () => {
    expect(prisonersDilemma.payoff(['C', 'D'])).toEqual([-3, 0]);
    expect(prisonersDilemma.payoff(['D', 'C'])).toEqual([0, -3]);
  });

  it('punishes mutual defection but less than being the sole cooperator', () => {
    expect(prisonersDilemma.payoff(['D', 'D'])).toEqual([-2, -2]);
  });

  it('defection strictly dominates: defector beats cooperator in every column', () => {
    expect(prisonersDilemma.payoff(['D', 'C'])[0]).toBeGreaterThan(prisonersDilemma.payoff(['C', 'C'])[0]);
    expect(prisonersDilemma.payoff(['D', 'D'])[0]).toBeGreaterThan(prisonersDilemma.payoff(['C', 'D'])[0]);
  });
});
