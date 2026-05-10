import { describe, it, expect } from 'vitest';
import { commonsOutcome, optimalHerdSize } from './commons';

describe('commons model', () => {
  it('with a small load, productivity is positive', () => {
    const r = commonsOutcome({ herders: 2, perHerder: 5, capacity: 100 });
    expect(r.totalCattle).toBe(10);
    expect(r.collectiveProductivity).toBeGreaterThan(0);
  });

  it('with capacity exceeded, productivity collapses', () => {
    const r = commonsOutcome({ herders: 10, perHerder: 30, capacity: 100 });
    expect(r.totalCattle).toBe(300);
    expect(r.collectiveProductivity).toBeLessThan(commonsOutcome({ herders: 10, perHerder: 10, capacity: 100 }).collectiveProductivity);
  });

  it('individual return is total productivity divided by herders', () => {
    const r = commonsOutcome({ herders: 4, perHerder: 5, capacity: 100 });
    expect(r.perHerderReturn).toBeCloseTo(r.collectiveProductivity / 4);
  });
});

describe('optimalHerdSize', () => {
  it('returns the per-herder size that maximises collective productivity', () => {
    const opt = optimalHerdSize({ herders: 4, capacity: 100 });
    expect(opt).toBe(100 / (2 * 4));
  });
});
