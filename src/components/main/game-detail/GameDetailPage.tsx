import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Game } from "../../../model/game";
import { PlayerScore } from "../../../model/player-score";
import {
  addRoundToGame,
  getGame,
  onGameSnapshot,
} from "../../../services/game-service";
import Button from "../../Button";
import Header from "../Header";
import PlayersDetail from "./PlayersDetail";

type Inputs = { scores: PlayerScore[][] };

interface Props {}

const GameDetailPage = (props: Props) => {
  const [loaded, setLoaded] = useState(false);
  const [game, setGame] = useState<null | Game>(null);

  const { id } = useParams();

  useEffect(() => {
    let unsubscribeJoinRequestSnapshot = () => {};
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

    return () => {
      unsubscribeJoinRequestSnapshot();
      unsubscribeGameShapshot();
    };
  }, [id]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onBlur" });

  console.log(errors);

  const editGame = ({ scores }: Inputs) => {
    console.log("edit game");
  };

  if (!loaded) {
    return <div>Loading...</div>;
  }

  if (!game) {
    return <div>Game not found</div>;
  }

  const addRound = () => {
    const playerScores: PlayerScore[] = game.players.map((player) => ({
      score: 0,
      player,
    }));
    addRoundToGame(game.id, {
      num: game.rounds.length + 1,
      playerScores,
    }).catch(console.error);
  };

  return (
    <div>
      <Header title="Game Details" />
      <form onSubmit={handleSubmit(editGame)}>
        <PlayersDetail game={game} />
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Rounds ({game.rounds.length})
        </label>
        <div className="px-4">
          {game.rounds.map((round, gameIndex) => (
            <div key={gameIndex}>
              <label
                key={round.num}
                className="block text-gray-700 text-sm mb-2"
              >
                Round {round.num}
              </label>
              {round.playerScores.map((playerScore, playerScoreIndex) => (
                <div key={playerScoreIndex}>
                  {`${playerScore.player.name}: `}
                  <input type="number" defaultValue={playerScore.score} />
                </div>
              ))}
            </div>
          ))}
          <Button type="button" title="Add round" onClick={addRound} />
        </div>
      </form>
    </div>
  );
};

export default GameDetailPage;
