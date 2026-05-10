import type { IteratedStrategy, PayoffFunction, ActionProfile, SimulationRound } from '../types';

export interface MatchResult {
  scoreA: number;
  scoreB: number;
  history: SimulationRound[];
}

export function runMatch(
  strategyA: IteratedStrategy,
  strategyB: IteratedStrategy,
  rounds: number,
  payoff: PayoffFunction
): MatchResult {
  const history: SimulationRound[] = [];
  let scoreA = 0;
  let scoreB = 0;
  for (let r = 0; r < rounds; r++) {
    const profiles = history.map((h) => h.profile);
    const a = strategyA.decide(profiles, 0);
    const b = strategyB.decide(profiles, 1);
    const profile: ActionProfile = [a, b];
    const payoffs = payoff(profile);
    scoreA += payoffs[0];
    scoreB += payoffs[1];
    history.push({ profile, payoffs });
  }
  return { scoreA, scoreB, history };
}

export interface Standing {
  strategy: IteratedStrategy;
  totalScore: number;
  matches: { opponent: IteratedStrategy; score: number; opponentScore: number }[];
}

export interface TournamentResult {
  standings: Standing[];
}

export function runTournament(
  strategies: IteratedStrategy[],
  roundsPerMatch: number,
  payoff: PayoffFunction
): TournamentResult {
  const standings: Standing[] = strategies.map((s) => ({ strategy: s, totalScore: 0, matches: [] }));

  for (let i = 0; i < strategies.length; i++) {
    for (let j = i; j < strategies.length; j++) {
      const result = runMatch(strategies[i], strategies[j], roundsPerMatch, payoff);
      standings[i].totalScore += result.scoreA;
      standings[i].matches.push({ opponent: strategies[j], score: result.scoreA, opponentScore: result.scoreB });
      if (i !== j) {
        standings[j].totalScore += result.scoreB;
        standings[j].matches.push({ opponent: strategies[i], score: result.scoreB, opponentScore: result.scoreA });
      }
    }
  }

  standings.sort((a, b) => b.totalScore - a.totalScore);
  return { standings };
}
