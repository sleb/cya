import { PlayerScore } from "./player-score";

export interface Round {
  startTime: number;
  playerScores: PlayerScore[];
}
