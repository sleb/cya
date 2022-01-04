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
): Record<string, number> => {
  return rounds
    .flatMap((round) => round.playerScores)
    .reduce((acc, playerScore) => {
      acc[playerScore.player.name] =
        (acc[playerScore.player.name] || 0) + playerScore.score;
      return acc;
    }, {} as Record<string, number>);
};

export interface RoundsFormData {
  scores: Record<string, number[]>;
}

export const roundsToFormData = (rounds: Round[]): RoundsFormData => {
  const roundsData = rounds.reduce((scores, round) => {
    round.playerScores.forEach((playerScore) => {
      scores[playerScore.player.name] = scores[playerScore.player.name] || [];
      scores[playerScore.player.name][round.num - 1] = playerScore.score;
    });
    return scores;
  }, {} as Record<string, number[]>);

  return { scores: roundsData };
};
