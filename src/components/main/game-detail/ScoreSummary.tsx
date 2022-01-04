import React from "react";
import { Game, summarizeScoresByPlayer } from "../../../model/game";
import { formatScore } from "../../../model/player-score";

export type Props = { game: Game };

const ScoreSummary = ({ game: { players, rounds } }: Props) => {
  const scores = summarizeScoresByPlayer(rounds);
  return (
    <div className="flex justify-between text-sm">
      <div className="flex flex-col">
        {players.map(({ name }, index) => (
          <p key={index}>
            <span className="font-bold">{`${name}: `}</span>
          </p>
        ))}
      </div>

      <div>
        {players.map(({ name }, index) => (
          <p key={index}>
            <span>{formatScore(scores[name] || 0)}</span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default ScoreSummary;
