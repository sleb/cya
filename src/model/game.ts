import { Round } from "./round";
import { User } from "./user";

export interface GameData {
  name: string;
  cards: number;
  players: User[];
  rounds: Round[];
  startTime: number;
}

export interface Game extends GameData {
  id: string;
}

export const summarizeScoresByPlayer = (
  rounds: Round[]
): Map<string, number> => {
  return rounds
    .flatMap((round) => round.playerScores)
    .reduce((acc, playerScore) => {
      acc.set(
        playerScore.player.name,
        (acc.get(playerScore.player.name) || 0) + playerScore.score
      );
      return acc;
    }, new Map<string, number>());
};
