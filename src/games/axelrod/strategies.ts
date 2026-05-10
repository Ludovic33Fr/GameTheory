import type { IteratedStrategy, ActionProfile } from '../types';

export const alwaysCooperate: IteratedStrategy = {
  id: 'always-c',
  name: 'Toujours coopérer',
  description: 'Coopère sans condition, à chaque tour.',
  decide: () => 'C',
};

export const alwaysDefect: IteratedStrategy = {
  id: 'always-d',
  name: 'Toujours trahir',
  description: 'Trahit sans condition, à chaque tour.',
  decide: () => 'D',
};

export const titForTat: IteratedStrategy = {
  id: 'tit-for-tat',
  name: 'Tit-for-tat',
  description: 'Coopère au premier tour, puis copie le dernier coup de l\'adversaire.',
  decide: (history: ActionProfile[], me: number) => {
    if (history.length === 0) return 'C';
    const opp = me === 0 ? 1 : 0;
    return history[history.length - 1][opp];
  },
};

export const grudger: IteratedStrategy = {
  id: 'grudger',
  name: 'Rancunier',
  description: "Coopère jusqu'à ce que l'adversaire trahisse une fois ; ensuite, trahit pour toujours.",
  decide: (history: ActionProfile[], me: number) => {
    const opp = me === 0 ? 1 : 0;
    return history.some((round) => round[opp] === 'D') ? 'D' : 'C';
  },
};

export const pavlov: IteratedStrategy = {
  id: 'pavlov',
  name: 'Pavlov (Win-Stay / Lose-Shift)',
  description: "Coopère au premier tour. Ensuite : conserve son action si le tour précédent était bon (CC ou DC), change sinon.",
  decide: (history: ActionProfile[], me: number) => {
    if (history.length === 0) return 'C';
    const opp = me === 0 ? 1 : 0;
    const last = history[history.length - 1];
    const myLast = last[me];
    const oppLast = last[opp];
    const goodOutcome = (myLast === 'C' && oppLast === 'C') || (myLast === 'D' && oppLast === 'C');
    if (goodOutcome) return myLast;
    return myLast === 'C' ? 'D' : 'C';
  },
};

export const randomStrat: IteratedStrategy = {
  id: 'random',
  name: 'Aléatoire',
  description: 'Coopère ou trahit avec probabilité 1/2.',
  decide: () => (Math.random() < 0.5 ? 'C' : 'D'),
};

export const ALL_STRATEGIES: IteratedStrategy[] = [
  alwaysCooperate,
  alwaysDefect,
  titForTat,
  grudger,
  pavlov,
  randomStrat,
];
