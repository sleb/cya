import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Game } from "../../model/game";
import { JoinRequest } from "../../model/join-request";
import { formatScore, PlayerScore } from "../../model/player-score";
import { addRoundToGame, getGame } from "../../services/game-service";
import { getJoinRequests } from "../../services/join-request-service";
import Button from "../Button";
import Header from "../Header";

type Inputs = { scores: PlayerScore[][] };

interface Props {}

const GameDetailPage = (props: Props) => {
  const [loaded, setLoaded] = useState(false);
  const [game, setGame] = useState<null | Game>(null);
  const [joinRequests, setJoinRequests] = useState<null | JoinRequest[]>(null);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      Promise.all([
        getGame(id).then((game) => {
          setGame(game);
        }),
        getJoinRequests(id).then((joinRequests) => {
          setJoinRequests(joinRequests);
        }),
      ]).then(() => {
        setLoaded(true);
      });
    }
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

  console.log(JSON.stringify(joinRequests));

  return (
    <div>
      <Header title="Game Details" />
      <form onSubmit={handleSubmit(editGame)}>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Rounds ({game.rounds.length})
        </label>
        <div className="px-4 py-6">
          {game.rounds.map((round) => (
            <div>
              <label
                key={round.num}
                className="block text-gray-700 text-sm mb-2"
              >
                Round {round.num}
              </label>
              {round.playerScores.map((playerScore) => (
                <div>
                  {`${playerScore.player.name}: `}
                  <input type="number" value={playerScore.score} />
                </div>
              ))}
            </div>
          ))}
          <Button type="button" title="Add round" onClick={addRound} />
        </div>
        <Controller
          name="scores"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => <div />}
        />

        <Button title="Update" type="submit" />
      </form>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Join Requests ({joinRequests?.length || 0})
        </label>
      </div>
    </div>
  );
};

export default GameDetailPage;
