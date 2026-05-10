import { describe, it, expect } from 'vitest';
import { titForTat, alwaysCooperate, alwaysDefect, grudger, randomStrat, pavlov } from './strategies';

describe('strategies', () => {
  it('alwaysCooperate always returns C', () => {
    expect(alwaysCooperate.decide([], 0)).toBe('C');
    expect(alwaysCooperate.decide([['C', 'D']], 0)).toBe('C');
  });

  it('alwaysDefect always returns D', () => {
    expect(alwaysDefect.decide([], 0)).toBe('D');
    expect(alwaysDefect.decide([['C', 'C']], 0)).toBe('D');
  });

  it('titForTat cooperates first then mirrors opponent', () => {
    expect(titForTat.decide([], 0)).toBe('C');
    expect(titForTat.decide([['C', 'D']], 0)).toBe('D');
    expect(titForTat.decide([['C', 'D'], ['D', 'C']], 0)).toBe('C');
  });

  it('grudger cooperates until the opponent ever defects', () => {
    expect(grudger.decide([], 0)).toBe('C');
    expect(grudger.decide([['C', 'C'], ['C', 'C']], 0)).toBe('C');
    expect(grudger.decide([['C', 'D']], 0)).toBe('D');
    expect(grudger.decide([['C', 'D'], ['D', 'C']], 0)).toBe('D');
  });

  it('pavlov: win-stay/lose-shift around mutual cooperation', () => {
    expect(pavlov.decide([], 0)).toBe('C');
    expect(pavlov.decide([['C', 'C']], 0)).toBe('C');
    expect(pavlov.decide([['C', 'D']], 0)).toBe('D');
    expect(pavlov.decide([['D', 'D']], 0)).toBe('C');
    expect(pavlov.decide([['D', 'C']], 0)).toBe('D');
  });

  it('random uses the supplied rng if provided via id check (smoke)', () => {
    const out = randomStrat.decide([], 0);
    expect(['C', 'D']).toContain(out);
  });
});
