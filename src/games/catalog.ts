import type { NormalFormGame } from './types';

/**
 * Jeux en forme normale utilisés par les fiches du guichet « Quel jeu ? ».
 * Les valeurs sont celles des manuels : elles servent à montrer la structure
 * des incitations, pas à mesurer quoi que ce soit.
 */

/** Chasse au cerf : coopérer rapporte plus, mais seul le lièvre est sûr. */
export const stagHunt: NormalFormGame = {
  id: 'stag-hunt',
  name: 'Chasse au cerf',
  players: 2,
  actions: [
    ['Cerf', 'Lièvre'],
    ['Cerf', 'Lièvre'],
  ],
  payoff: ([a, b]) => {
    if (a === 'Cerf' && b === 'Cerf') return [4, 4];
    if (a === 'Cerf' && b === 'Lièvre') return [0, 3];
    if (a === 'Lièvre' && b === 'Cerf') return [3, 0];
    return [3, 3];
  },
};

/** Coordination pure : peu importe le choix, pourvu qu'il soit le même. */
export const pureCoordination: NormalFormGame = {
  id: 'pure-coordination',
  name: 'Coordination pure',
  players: 2,
  actions: [
    ['Gauche', 'Droite'],
    ['Gauche', 'Droite'],
  ],
  payoff: ([a, b]) => (a === b ? [1, 1] : [0, 0]),
};

/** Pierre-papier-ciseaux : somme nulle, aucun équilibre en stratégies pures. */
export const rockPaperScissors: NormalFormGame = {
  id: 'rock-paper-scissors',
  name: 'Pierre-papier-ciseaux',
  players: 2,
  actions: [
    ['Pierre', 'Papier', 'Ciseaux'],
    ['Pierre', 'Papier', 'Ciseaux'],
  ],
  payoff: ([a, b]) => {
    if (a === b) return [0, 0];
    const beats: Record<string, string> = { Pierre: 'Ciseaux', Papier: 'Pierre', Ciseaux: 'Papier' };
    return beats[a] === b ? [1, -1] : [-1, 1];
  },
};

/**
 * Dilemme du volontaire, version à deux : le bien (10) n'existe que si au
 * moins un se dévoue, et se dévouer coûte 4.
 */
export const volunteersDilemma: NormalFormGame = {
  id: 'volunteer',
  name: 'Dilemme du volontaire',
  players: 2,
  actions: [
    ['Se dévouer', 'Attendre'],
    ['Se dévouer', 'Attendre'],
  ],
  payoff: ([a, b]) => {
    const aV = a === 'Se dévouer';
    const bV = b === 'Se dévouer';
    if (!aV && !bV) return [0, 0];
    return [aV ? 6 : 10, bV ? 6 : 10];
  },
};

/**
 * Jeu du bien public, version à deux : chacun a 10, la cagnotte est
 * multipliée par 1,5 puis partagée à égalité.
 */
export const publicGood: NormalFormGame = {
  id: 'public-good',
  name: 'Jeu du bien public',
  players: 2,
  actions: [
    ['Contribuer', 'Garder'],
    ['Contribuer', 'Garder'],
  ],
  payoff: ([a, b]) => {
    const aC = a === 'Contribuer' ? 10 : 0;
    const bC = b === 'Contribuer' ? 10 : 0;
    const share = ((aC + bC) * 1.5) / 2;
    return [10 - aC + share, 10 - bC + share];
  },
};
