export type PlayerLabel = string;

export interface Leaf {
  kind: 'leaf';
  label: string;
  /** Payoffs ordered by player label appearance in the tree. */
  payoffs: number[];
}

export interface DecisionNode {
  kind: 'decision';
  player: PlayerLabel;
  /** Each action leads to a sub-tree. */
  actions: { label: string; child: GameTreeNode }[];
}

export type GameTreeNode = DecisionNode | Leaf;

/**
 * Entrant vs monopolist:
 *   Entrant chooses Enter / Stay out.
 *   If Stay out: payoffs (0, 5).
 *   If Enter: monopolist chooses Fight / Accommodate.
 *     Fight: (-2, -1).
 *     Accommodate: (2, 2).
 */
export const entrantMonopoly: DecisionNode = {
  kind: 'decision',
  player: 'entrant',
  actions: [
    {
      label: 'Ne pas entrer',
      child: { kind: 'leaf', label: 'Marché conservé', payoffs: [0, 5] },
    },
    {
      label: 'Entrer',
      child: {
        kind: 'decision',
        player: 'monopole',
        actions: [
          { label: 'Combattre', child: { kind: 'leaf', label: 'Guerre des prix', payoffs: [-2, -1] } },
          { label: 'Accommoder', child: { kind: 'leaf', label: 'Partage du marché', payoffs: [2, 2] } },
        ],
      },
    },
  ],
};

const PLAYER_INDEX: Record<PlayerLabel, number> = { entrant: 0, monopole: 1 };

export interface BackwardSolution {
  path: { player: PlayerLabel; action: string }[];
  payoffs: number[];
}

export function solveBackwardInduction(root: DecisionNode): BackwardSolution {
  function solve(node: GameTreeNode): { payoffs: number[]; choice: string | null; path: { player: PlayerLabel; action: string }[] } {
    if (node.kind === 'leaf') {
      return { payoffs: node.payoffs, choice: null, path: [] };
    }
    const playerIdx = PLAYER_INDEX[node.player];
    let best: { label: string; payoffs: number[]; subPath: { player: PlayerLabel; action: string }[] } | null = null;
    for (const a of node.actions) {
      const sub = solve(a.child);
      if (best === null || sub.payoffs[playerIdx] > best.payoffs[playerIdx]) {
        best = { label: a.label, payoffs: sub.payoffs, subPath: sub.path };
      }
    }
    if (!best) throw new Error('Decision node has no actions');
    return {
      payoffs: best.payoffs,
      choice: best.label,
      path: [{ player: node.player, action: best.label }, ...best.subPath],
    };
  }

  const { path, payoffs } = solve(root);
  return { path, payoffs };
}
