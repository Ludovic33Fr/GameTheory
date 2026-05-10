import { describe, it, expect } from 'vitest';
import { runMatch, runTournament } from './tournament';
import { titForTat, alwaysDefect, alwaysCooperate } from './strategies';
import { prisonersDilemma } from '../prisoners';

describe('runMatch', () => {
  it('always-cooperate vs always-cooperate yields mutual coop every round', () => {
    const result = runMatch(alwaysCooperate, alwaysCooperate, 10, prisonersDilemma.payoff);
    expect(result.scoreA).toBe(-10);
    expect(result.scoreB).toBe(-10);
    expect(result.history.every((r) => r.profile[0] === 'C' && r.profile[1] === 'C')).toBe(true);
  });

  it('always-defect beats always-cooperate', () => {
    const result = runMatch(alwaysDefect, alwaysCooperate, 10, prisonersDilemma.payoff);
    expect(result.scoreA).toBe(0);
    expect(result.scoreB).toBe(-30);
  });

  it('titForTat ties always-cooperate', () => {
    const result = runMatch(titForTat, alwaysCooperate, 10, prisonersDilemma.payoff);
    expect(result.scoreA).toBe(-10);
    expect(result.scoreB).toBe(-10);
  });
});

describe('runTournament', () => {
  it('round-robin produces results for all unordered pairs', () => {
    const result = runTournament([titForTat, alwaysDefect, alwaysCooperate], 5, prisonersDilemma.payoff);
    expect(result.standings.length).toBe(3);
    expect(result.standings.find((s) => s.strategy.id === 'always-d')!.totalScore).toBeGreaterThanOrEqual(
      result.standings.find((s) => s.strategy.id === 'always-c')!.totalScore
    );
  });

  it('tit-for-tat tops the field of nice strategies', () => {
    const result = runTournament([titForTat, alwaysCooperate], 50, prisonersDilemma.payoff);
    expect(result.standings[0].totalScore).toBe(result.standings[1].totalScore);
  });
});
