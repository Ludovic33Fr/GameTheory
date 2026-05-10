import type { NormalFormGame } from './types';

export const battleOfTheSexes: NormalFormGame = {
  id: 'battle-sexes',
  name: 'Bataille des sexes',
  players: 2,
  actions: [['Opera', 'Foot'], ['Opera', 'Foot']],
  payoff: ([a, b]) => {
    if (a === 'Opera' && b === 'Opera') return [3, 2];
    if (a === 'Foot' && b === 'Foot') return [2, 3];
    return [0, 0];
  },
};

export const chicken: NormalFormGame = {
  id: 'chicken',
  name: 'Chicken',
  players: 2,
  actions: [['Swerve', 'Straight'], ['Swerve', 'Straight']],
  payoff: ([a, b]) => {
    if (a === 'Swerve' && b === 'Swerve') return [0, 0];
    if (a === 'Swerve' && b === 'Straight') return [-1, 1];
    if (a === 'Straight' && b === 'Swerve') return [1, -1];
    return [-10, -10];
  },
};
