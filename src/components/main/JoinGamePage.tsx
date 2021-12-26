import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router";
import { Game } from "../../model/game";
import { currentUser } from "../../services/auth-service";
import { getGame } from "../../services/game-service";
import { createJoinRequest } from "../../services/join-request-service";
import Button from "../Button";
import Header from "../Header";
import TextInput from "../TextInput";

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

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onBlur" });

  if (!loaded) {
    return <div>Loading...</div>;
  }

  if (!game) {
    return <div>Game not found</div>;
  }

  type Inputs = {
    message: string;
  };

  const joinGame = (inputs: Inputs) => {
    currentUser().then((user) => {
      if (user) {
        createJoinRequest(game.id, user, inputs.message).catch(console.error);
      }
    });
  };

  return (
    <div>
      <Header title={`Request to Join "${game.name}"`} />
      <form onSubmit={handleSubmit(joinGame)}>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Message
        </label>
        <Controller
          name="message"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Message (optional)"
              error={errors.message?.message}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />

        <Button type="submit" title="Join Game" />
      </form>
    </div>
  );
};

export default JoinGamePage;
