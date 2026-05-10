import { describe, it, expect } from 'vitest';
import { findPureNashEquilibria } from './nash';
import { prisonersDilemma } from './prisoners';
import { battleOfTheSexes, chicken } from './examples';

describe('findPureNashEquilibria', () => {
  it('finds the unique equilibrium of Prisoner\'s Dilemma', () => {
    const eq = findPureNashEquilibria(prisonersDilemma);
    expect(eq).toEqual([['D', 'D']]);
  });

  it('finds two pure equilibria in Battle of the Sexes', () => {
    const eq = findPureNashEquilibria(battleOfTheSexes);
    expect(eq).toContainEqual(['Opera', 'Opera']);
    expect(eq).toContainEqual(['Foot', 'Foot']);
    expect(eq.length).toBe(2);
  });

  it('finds two pure equilibria in Chicken', () => {
    const eq = findPureNashEquilibria(chicken);
    expect(eq).toContainEqual(['Swerve', 'Straight']);
    expect(eq).toContainEqual(['Straight', 'Swerve']);
    expect(eq.length).toBe(2);
  });
});
