import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Game } from "../../model/game";
import { Score } from "../../model/score";
import { getGame } from "../../services/game-service";
import Button from "../Button";

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

  return (
    <form onSubmit={handleSubmit(editGame)} className="mt-8">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Update scores
      </label>
      <Controller
        name="scores"
        defaultValue={game.rounds}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <div>
            {value.map((round, index) => (
              <div key={index}>{JSON.stringify(round)}</div>
            ))}
            {game.players.map((player, index) => (
              <label
                key={index}
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                {player.name}
              </label>
            ))}
          </div>
        )}
      />

      <Button title="Update" type="submit" />
    </form>
  );
};

export default EditGamePage;
