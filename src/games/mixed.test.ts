import { describe, it, expect } from 'vitest';
import { expectedPayoff, sampleAction, normalize } from './mixed';

describe('expectedPayoff', () => {
  it('with deterministic mixed strategies reduces to pure payoff', () => {
    const payoff = (a: string, b: string) => {
      if (a === b) return 0;
      const beats: Record<string, string> = { R: 'S', P: 'R', S: 'P' };
      return beats[a] === b ? 1 : -1;
    };
    const ev = expectedPayoff({ R: 1, P: 0, S: 0 }, { R: 0, P: 1, S: 0 }, payoff);
    expect(ev).toBe(-1);
  });

  it('with uniform random play returns 0 in zero-sum RPS', () => {
    const payoff = (a: string, b: string) => {
      if (a === b) return 0;
      const beats: Record<string, string> = { R: 'S', P: 'R', S: 'P' };
      return beats[a] === b ? 1 : -1;
    };
    const uniform = { R: 1 / 3, P: 1 / 3, S: 1 / 3 };
    const ev = expectedPayoff(uniform, uniform, payoff);
    expect(ev).toBeCloseTo(0, 10);
  });
});

describe('normalize', () => {
  it('rescales weights to sum to 1', () => {
    const result = normalize({ R: 2, P: 1, S: 1 });
    expect(result.R).toBeCloseTo(0.5);
    expect(result.P).toBeCloseTo(0.25);
    expect(result.S).toBeCloseTo(0.25);
  });

  it('returns uniform when all weights are zero', () => {
    const result = normalize({ R: 0, P: 0, S: 0 });
    expect(result.R).toBeCloseTo(1 / 3);
  });
});

describe('sampleAction', () => {
  it('picks action with weight 1 deterministically', () => {
    expect(sampleAction({ R: 1, P: 0, S: 0 }, () => 0.99)).toBe('R');
  });

  it('respects cumulative thresholds', () => {
    expect(sampleAction({ R: 0.5, P: 0.3, S: 0.2 }, () => 0.1)).toBe('R');
    expect(sampleAction({ R: 0.5, P: 0.3, S: 0.2 }, () => 0.6)).toBe('P');
    expect(sampleAction({ R: 0.5, P: 0.3, S: 0.2 }, () => 0.9)).toBe('S');
  });
});
