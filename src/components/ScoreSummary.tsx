import React from "react";
import { Game } from "../model/game";
import { Score } from "../model/score";

interface Props {
  game: Game;
}

const summarizeScores = (rounds: Score[][]): Map<string, number> => {
  return rounds.flat().reduce((acc, cur) => {
    acc.set(cur.player, (acc.get(cur.player) || 0) + cur.score);
    return acc;
  }, new Map<string, number>());
};

const ScoreSummary = ({ game: { rounds, players } }: Props) => {
  const scores = summarizeScores(rounds);
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
