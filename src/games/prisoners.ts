import type { NormalFormGame } from './types';

export const prisonersDilemma: NormalFormGame = {
  id: 'prisoners',
  name: 'Dilemme du prisonnier',
  players: 2,
  actions: [['C', 'D'], ['C', 'D']],
  payoff: ([a, b]) => {
    if (a === 'C' && b === 'C') return [-1, -1];
    if (a === 'C' && b === 'D') return [-3, 0];
    if (a === 'D' && b === 'C') return [0, -3];
    return [-2, -2];
  },
};
