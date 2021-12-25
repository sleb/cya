import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Game } from "../../model/game";
import { Score } from "../../model/score";
import { addRoundToGame, getGame } from "../../services/game-service";
import Button from "../Button";
import Header from "../Header";

type Inputs = { scores: Score[][] };

interface Props {}

const EditGamePage = (props: Props) => {
  const [loaded, setLoaded] = useState(false);
  const [game, setGame] = useState<null | Game>(null);

  const { id } = useParams();

  useEffect(() => {
    getGame(id!).then((game) => {
      setGame(game);
      setLoaded(true);
    });
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
    const scores: Score[] = game.players.map((player) => ({
      score: 0,
      player,
    }));
    addRoundToGame(game.id, { num: game.rounds.length + 1, scores }).catch(
      console.error
    );
  };

  return (
    <div>
      <Header title="Edit Game" />
      <form onSubmit={handleSubmit(editGame)}>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Rounds ({game.rounds.length})
        </label>
        <div className="px-4 py-6">
          {game.rounds.forEach((scores, round) => (
            <div>
              <label key={round} className="block text-gray-700 text-sm mb-2">
                Round {round}
              </label>
              <input type="number" />
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
    </div>
  );
};

export default EditGamePage;
