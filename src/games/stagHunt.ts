import type { NormalFormGame } from './types';

/**
 * Chasse au cerf. Trois gains suffisent à décrire le jeu : ce que rapporte le
 * cerf pris à deux, ce que rapporte le lièvre (seul ou pas), et ce qu'on
 * ramène quand on part au cerf et que l'autre part au lièvre.
 */
export interface StagHuntPayoffs {
  /** Les deux partent au cerf : le village mange. */
  stag: number;
  /** Partir au lièvre : sûr, quoi que fasse l'autre. */
  hare: number;
  /** Partir au cerf seul : bredouille. */
  alone: number;
}

export const STAG = 'Cerf';
export const HARE = 'Lièvre';

export const DEFAULT_STAG_HUNT: StagHuntPayoffs = { stag: 4, hare: 3, alone: 0 };

/** Le jeu est une chasse au cerf si le cerf vaut plus que le lièvre, et le lièvre plus que bredouille. */
export function isStagHunt(p: StagHuntPayoffs): boolean {
  return p.stag > p.hare && p.hare > p.alone;
}

export function makeStagHunt(p: StagHuntPayoffs = DEFAULT_STAG_HUNT): NormalFormGame {
  return {
    id: 'stag-hunt',
    name: 'Chasse au cerf',
    players: 2,
    actions: [
      [STAG, HARE],
      [STAG, HARE],
    ],
    payoff: ([a, b]) => {
      if (a === STAG && b === STAG) return [p.stag, p.stag];
      if (a === STAG && b === HARE) return [p.alone, p.hare];
      if (a === HARE && b === STAG) return [p.hare, p.alone];
      return [p.hare, p.hare];
    },
  };
}

/**
 * Gains espérés de chaque choix quand on croit que l'autre part au cerf avec
 * probabilité `trust` (entre 0 et 1).
 */
export function expectedGains(p: StagHuntPayoffs, trust: number): { stag: number; hare: number } {
  const t = Math.min(1, Math.max(0, trust));
  return {
    stag: t * p.stag + (1 - t) * p.alone,
    hare: p.hare,
  };
}

/**
 * Le seuil de confiance : la probabilité minimale que l'autre parte au cerf
 * pour que partir au cerf soit le bon pari. Au-dessus, le cerf ; en dessous,
 * le lièvre. Retourne une valeur dans [0, 1], ou `null` si le cerf n'est
 * jamais préférable (le jeu n'est plus une chasse au cerf).
 */
export function trustThreshold(p: StagHuntPayoffs): number | null {
  const span = p.stag - p.alone;
  if (span <= 0) return p.hare <= p.alone ? 0 : null;
  const t = (p.hare - p.alone) / span;
  if (t > 1) return null;
  return Math.max(0, t);
}

/**
 * Dynamique de population : une part `share0` des chasseurs part au cerf.
 * À chaque génération, le choix qui a le mieux nourri gagne du terrain,
 * proportionnellement à son avance (réplicateur en temps discret). Retourne
 * la part de chasseurs de cerf à chaque génération, génération 0 comprise.
 */
export function evolveStagShare(
  p: StagHuntPayoffs,
  share0: number,
  generations: number
): number[] {
  const range = Math.max(p.stag, p.hare, p.alone) - Math.min(p.stag, p.hare, p.alone);
  const rate = range > 0 ? 2 / range : 0;
  let x = Math.min(1, Math.max(0, share0));
  const out = [x];
  for (let g = 0; g < generations; g++) {
    const { stag, hare } = expectedGains(p, x);
    x = Math.min(1, Math.max(0, x + x * (1 - x) * rate * (stag - hare)));
    out.push(x);
  }
  return out;
}
