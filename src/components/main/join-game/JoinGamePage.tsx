import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { Game } from "../../../model/game";
import { currentUser } from "../../../services/auth-service";
import { getGame } from "../../../services/game-service";
import { createJoinRequest } from "../../../services/join-request-service";
import Button from "../../Button";
import Header from "../Header";
import Input from "../../Input";

interface Props {}

const JoinGamePage = (props: Props) => {
  const [loaded, setLoaded] = useState(false);
  const [game, setGame] = useState<null | Game>(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getGame(id!).then((game) => {
      setGame(game);
      setLoaded(true);
    });
  }, [id]);

  const {
    handleSubmit,
    register,
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
        createJoinRequest(game.id, user, inputs.message)
          .then(() => navigate("/dashboard"))
          .catch(console.error);
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
        <Input
          placeholder="Message (optional)"
          error={errors.message?.message}
          {...register("message")}
        />
        <Button type="submit">Join Game</Button>
      </form>
    </div>
  );
};

export default JoinGamePage;
