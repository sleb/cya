import { PlayerScore } from "./player-score";

export interface Round {
  num: number;
  playerScores: PlayerScore[];
}
