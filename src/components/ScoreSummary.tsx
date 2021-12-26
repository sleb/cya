import React from "react";
import { Game, summarizeScoresByPlayer } from "../model/game";
import { formatScore } from "../model/player-score";

interface Props {
  game: Game;
}

const ScoreSummary = ({ game: { rounds, players } }: Props) => {
  const scores = summarizeScoresByPlayer(rounds);

  return (
    <div className="text-xs flex flex-col">
      {players.map(({ name }, index) => (
        <div key={index} className="flex justify-items-end justify-end">
          <span className="font-bold">{name}</span>
          <span>:{" " + formatScore(scores.get(name) || 0)}</span>
        </div>
      ))}
    </div>
  );
};

export default ScoreSummary;
