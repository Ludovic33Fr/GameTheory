import type { NormalFormGame, ActionProfile } from './types';

/**
 * Returns all pure-strategy Nash equilibria of a 2-player normal-form game.
 * A profile (a, b) is an equilibrium iff no player can strictly improve their
 * payoff by deviating to a different action while the other holds theirs.
 */
export function findPureNashEquilibria(game: NormalFormGame): ActionProfile[] {
  if (game.players !== 2) {
    throw new Error('findPureNashEquilibria currently supports 2-player games only');
  }
  const [rowActions, colActions] = game.actions;
  const equilibria: ActionProfile[] = [];

  for (const r of rowActions) {
    for (const c of colActions) {
      const [pr, pc] = game.payoff([r, c]);
      const rowCanDeviate = rowActions.some((rPrime) => {
        if (rPrime === r) return false;
        return game.payoff([rPrime, c])[0] > pr;
      });
      if (rowCanDeviate) continue;
      const colCanDeviate = colActions.some((cPrime) => {
        if (cPrime === c) return false;
        return game.payoff([r, cPrime])[1] > pc;
      });
      if (colCanDeviate) continue;
      equilibria.push([r, c]);
    }
  }
  return equilibria;
}
