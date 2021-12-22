import React from "react";
import { Game, summarizeScoresByPlayer } from "../model/game";

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
          <span>
            :{" "}
            {Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
              notation: "compact",
            }).format(scores.get(name) || 0)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ScoreSummary;
