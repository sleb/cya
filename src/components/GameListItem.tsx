import React from "react";
import { useNavigate } from "react-router-dom";

import { Game } from "../model/game";
import ScoreSummary from "./ScoreSummary";

type Props = {
  game: Game;
};

const GameListItem = ({ game }: Props) => {
  const navigate = useNavigate();

  return (
    <button
      className="flex justify-between border rounded-md border-green-800 p-2 mb-2"
      onClick={() => navigate(`/game/${game.id}/edit`)}
    >
      <div className="flex flex-col">
        <p className="flex justify-start font-semibold text-sm">{game.name}</p>
        <p className="text-xs flex justify-start">
          {new Date(game.startTime).toLocaleDateString()}
        </p>
      </div>
      <ScoreSummary game={game} />
    </button>
  );
};

export default GameListItem;
