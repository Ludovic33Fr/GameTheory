export type Action = string;

export type PureStrategy = Action;

export type MixedStrategy = Record<Action, number>;

export type ActionProfile = Action[];

export type PayoffFunction = (profile: ActionProfile) => number[];

export interface NormalFormGame {
  id: string;
  name: string;
  players: number;
  /** Available actions per player, indexed by player number (0..players-1) */
  actions: Action[][];
  payoff: PayoffFunction;
}

export interface IteratedStrategy {
  id: string;
  name: string;
  description: string;
  /**
   * Decide an action given the full history (one ActionProfile per round) and
   * the player's index in the profile.
   */
  decide: (history: ActionProfile[], me: number) => Action;
}

export interface SimulationRound {
  profile: ActionProfile;
  payoffs: number[];
}
