export interface CommonsParams {
  herders: number;
  perHerder: number;
  capacity: number;
}

export interface CommonsOutcome {
  totalCattle: number;
  collectiveProductivity: number;
  perHerderReturn: number;
}

/**
 * Toy model of a commons:
 *   each animal yields a marginal product that decreases linearly with the
 *   total herd size N: marginal(N) = max(0, 1 - N / capacity).
 *   Total collective productivity is N * (1 - N / capacity) for N <= capacity,
 *   beyond which the pasture collapses (productivity drops to 0).
 */
export function commonsOutcome({ herders, perHerder, capacity }: CommonsParams): CommonsOutcome {
  const N = herders * perHerder;
  let totalProd: number;
  if (N <= 0) totalProd = 0;
  else if (N <= capacity) totalProd = N * (1 - N / capacity);
  else totalProd = 0; // collapse
  return {
    totalCattle: N,
    collectiveProductivity: totalProd,
    perHerderReturn: herders > 0 ? totalProd / herders : 0,
  };
}

/**
 * Returns the per-herder cattle count that maximises COLLECTIVE productivity.
 * For our model the optimum total herd is capacity / 2, so per-herder is
 * capacity / (2 * herders).
 */
export function optimalHerdSize({ herders, capacity }: { herders: number; capacity: number }): number {
  return capacity / (2 * herders);
}
