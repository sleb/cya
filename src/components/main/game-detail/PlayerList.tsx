import React from "react";
import { Game } from "../../../model/game";
import WhiteDiv from "../../WhiteDiv";
import ScoreSummary from "./ScoreSummary";

interface Props {
  game: Game;
}

const PlayerList = ({ game }: Props) => {
  return (
    <WhiteDiv>
      <label className="block text-gray-700 text-sm font-bold">
        Players ({game.players.length})
      </label>
      <div className="px-4">
        <ScoreSummary game={game} />
      </div>
    </WhiteDiv>
  );
};

export default PlayerList;
