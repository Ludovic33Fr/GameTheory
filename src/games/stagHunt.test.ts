import { describe, it, expect } from 'vitest';
import {
  DEFAULT_STAG_HUNT,
  HARE,
  STAG,
  evolveStagShare,
  expectedGains,
  isStagHunt,
  makeStagHunt,
  trustThreshold,
} from './stagHunt';
import { findPureNashEquilibria } from './nash';

describe('makeStagHunt', () => {
  it('has exactly two pure equilibria: both stag, both hare', () => {
    const eq = findPureNashEquilibria(makeStagHunt());
    expect(eq).toContainEqual([STAG, STAG]);
    expect(eq).toContainEqual([HARE, HARE]);
    expect(eq.length).toBe(2);
  });

  it('pays the lone stag hunter nothing and the hare hunter their hare', () => {
    const game = makeStagHunt({ stag: 4, hare: 3, alone: 0 });
    expect(game.payoff([STAG, HARE])).toEqual([0, 3]);
    expect(game.payoff([HARE, STAG])).toEqual([3, 0]);
  });
});

describe('isStagHunt', () => {
  it('accepts the textbook values', () => {
    expect(isStagHunt(DEFAULT_STAG_HUNT)).toBe(true);
  });
  it('rejects a game where the hare beats the stag', () => {
    expect(isStagHunt({ stag: 2, hare: 3, alone: 0 })).toBe(false);
  });
});

describe('expectedGains', () => {
  it('is linear in trust for the stag and flat for the hare', () => {
    expect(expectedGains(DEFAULT_STAG_HUNT, 0)).toEqual({ stag: 0, hare: 3 });
    expect(expectedGains(DEFAULT_STAG_HUNT, 1)).toEqual({ stag: 4, hare: 3 });
    expect(expectedGains(DEFAULT_STAG_HUNT, 0.5)).toEqual({ stag: 2, hare: 3 });
  });
  it('clamps trust to [0, 1]', () => {
    expect(expectedGains(DEFAULT_STAG_HUNT, 2).stag).toBe(4);
    expect(expectedGains(DEFAULT_STAG_HUNT, -1).stag).toBe(0);
  });
});

describe('trustThreshold', () => {
  it('is 3/4 for the textbook values', () => {
    expect(trustThreshold(DEFAULT_STAG_HUNT)).toBeCloseTo(0.75);
  });
  it('drops when the stag gets more valuable', () => {
    expect(trustThreshold({ stag: 6, hare: 3, alone: 0 })).toBeCloseTo(0.5);
  });
  it('rises when going home empty-handed hurts more', () => {
    expect(trustThreshold({ stag: 4, hare: 3, alone: -2 })).toBeCloseTo(5 / 6);
  });
  it('is null when the stag can never beat the hare', () => {
    expect(trustThreshold({ stag: 2, hare: 3, alone: 0 })).toBeNull();
  });
  it('is 0 when the hare is worth no more than coming home empty-handed', () => {
    expect(trustThreshold({ stag: 4, hare: 0, alone: 0 })).toBe(0);
  });
});

describe('evolveStagShare', () => {
  it('returns generation 0 plus one entry per generation', () => {
    expect(evolveStagShare(DEFAULT_STAG_HUNT, 0.5, 30)).toHaveLength(31);
  });
  it('converges to all-stag above the threshold', () => {
    const path = evolveStagShare(DEFAULT_STAG_HUNT, 0.85, 60);
    expect(path[path.length - 1]).toBeGreaterThan(0.99);
  });
  it('converges to all-hare below the threshold', () => {
    const path = evolveStagShare(DEFAULT_STAG_HUNT, 0.65, 60);
    expect(path[path.length - 1]).toBeLessThan(0.01);
  });
  it('stays in [0, 1]', () => {
    const path = evolveStagShare({ stag: 10, hare: 1, alone: -5 }, 0.9, 40);
    for (const x of path) {
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(1);
    }
  });
});
