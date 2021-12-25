import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Game } from "../../model/game";
import { currentUser } from "../../services/auth-service";
import { getGame } from "../../services/game-service";
import { createJoinRequest } from "../../services/join-request-service";

interface Props {}

const JoinGamePage = (props: Props) => {
  const [loaded, setLoaded] = useState(false);
  const [game, setGame] = useState<null | Game>(null);

  const { id } = useParams();

  useEffect(() => {
    getGame(id!).then((game) => {
      setGame(game);
      setLoaded(true);
    });
  }, [id]);

  if (!loaded) {
    return <div>Loading...</div>;
  }

  if (!game) {
    return <div>Game not found</div>;
  }

  return (
    <button
      onClick={() =>
        currentUser().then((user) => {
          if (user) {
            createJoinRequest(game.id, user.id);
          }
        })
      }
    >
      Join Game?
    </button>
  );
};

export default JoinGamePage;
