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
    .flatMap((round) => round.scores)
    .reduce((acc, score) => {
      acc.set(
        score.player.name,
        (acc.get(score.player.name) || 0) + score.score
      );
      return acc;
    }, new Map<string, number>());
};
