import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Game } from "../../../model/game";
import { getGame, onGameSnapshot } from "../../../services/game-service";
import Header from "../Header";
import PlayersDetail from "./PlayersDetail";
import RoundsDetail from "./RoundsDetail";

interface Props {}

const GameDetailPage = (props: Props) => {
  const [loaded, setLoaded] = useState(false);
  const [game, setGame] = useState<null | Game>(null);

  const { id } = useParams();

  useEffect(() => {
    let unsubscribeGameShapshot = () => {};

    if (id) {
      getGame(id)
        .then((game) => {
          setGame(game);

          unsubscribeGameShapshot = onGameSnapshot(
            game,
            (game) => setGame(game),
            console.error
          );
        })
        .then(() => {
          setLoaded(true);
        })
        .catch(console.error);
    }

    return unsubscribeGameShapshot;
  }, [id]);

  if (!loaded) {
    return <div>Loading...</div>;
  }

  if (!game) {
    return <div>Game not found</div>;
  }

  return (
    <div>
      <Header title="Game Details" />
      <PlayersDetail game={game} />
      <RoundsDetail game={game} />
    </div>
  );
};

export default GameDetailPage;
