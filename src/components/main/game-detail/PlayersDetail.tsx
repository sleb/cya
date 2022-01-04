import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Game } from "../../../model/game";
import { JoinRequest } from "../../../model/join-request";
import { onJoinRequestSnapshot } from "../../../services/join-request-service";
import WhiteDiv from "../../WhiteDiv";
import JoinRequestListItem from "./JoinRequestListItem";
import ScoreSummary from "./ScoreSummary";

export type Props = {
  game: Game;
};

const PlayersDetail = ({ game }: Props) => {
  const [joinRequests, setJoinRequests] = useState<null | JoinRequest[]>(null);
  useEffect(() => {
    return onJoinRequestSnapshot(
      game,
      (joinRequests) => setJoinRequests(joinRequests),
      console.error
    );
  }, [game]);

  return (
    <>
      <WhiteDiv>
        <label className="block text-gray-700 text-sm font-bold">
          Players ({game.players.length})
        </label>
        <div className="px-4">
          <ScoreSummary game={game} />
        </div>
      </WhiteDiv>

      <WhiteDiv>
        <label className="block text-gray-700 text-sm font-bold">
          Join Requests ({joinRequests?.length || 0})
        </label>
        <div className="px-4">
          <ul>
            {joinRequests?.map((joinRequest, index) => (
              <li key={index}>
                <JoinRequestListItem joinRequest={joinRequest} />
              </li>
            ))}
          </ul>
        </div>
        <span>
          Share the
          <Link
            to={`/game/${game.id}/join`}
            className="font-bold text-green-700 hover:underline"
          >
            {" game link "}
          </Link>
          with your frields!!
        </span>
      </WhiteDiv>
    </>
  );
};

export default PlayersDetail;
