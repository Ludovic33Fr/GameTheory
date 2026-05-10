import { describe, it, expect } from 'vitest';
import type { NormalFormGame, PayoffFunction } from './types';

describe('NormalFormGame', () => {
  it('payoff function returns one number per player', () => {
    const payoff: PayoffFunction = ([a, b]) =>
      a === 'C' && b === 'C' ? [3, 3] : [0, 0];
    const game: NormalFormGame = {
      id: 'demo',
      name: 'Demo',
      players: 2,
      actions: [['C', 'D'], ['C', 'D']],
      payoff,
    };
    expect(game.payoff(['C', 'C'])).toEqual([3, 3]);
    expect(game.payoff(['D', 'C'])).toEqual([0, 0]);
    expect(game.payoff(['C', 'C']).length).toBe(game.players);
  });
});
