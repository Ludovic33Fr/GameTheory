import type { MixedStrategy, Action } from './types';

export function normalize(weights: MixedStrategy): MixedStrategy {
  const keys = Object.keys(weights);
  const sum = keys.reduce((s, k) => s + Math.max(0, weights[k]), 0);
  if (sum === 0) {
    return Object.fromEntries(keys.map((k) => [k, 1 / keys.length]));
  }
  return Object.fromEntries(keys.map((k) => [k, Math.max(0, weights[k]) / sum]));
}

export function expectedPayoff(
  rowMix: MixedStrategy,
  colMix: MixedStrategy,
  payoff: (a: Action, b: Action) => number
): number {
  let ev = 0;
  for (const a of Object.keys(rowMix)) {
    for (const b of Object.keys(colMix)) {
      ev += rowMix[a] * colMix[b] * payoff(a, b);
    }
  }
  return ev;
}

export function sampleAction(mix: MixedStrategy, rng: () => number = Math.random): Action {
  const r = rng();
  let cum = 0;
  const keys = Object.keys(mix);
  for (const k of keys) {
    cum += mix[k];
    if (r < cum) return k;
  }
  return keys[keys.length - 1];
}
