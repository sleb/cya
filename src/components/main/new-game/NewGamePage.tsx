import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { currentUser } from "../../../services/auth-service";
import { createGame } from "../../../services/game-service";
import Button from "../../Button";
import Header from "../Header";
import Input from "../../Input";
import SelectInput from "../../SelectInput";

interface Props {}

type Inputs = {
  name: string;
  cards: number;
};

const NewGamePage = (props: Props) => {
  const navigate = useNavigate();

  const newGame = ({ name, cards }: Inputs) => {
    currentUser().then((user) => {
      if (user) {
        createGame(user, name, cards)
          .then(() => navigate("/dashboard", { replace: true }))
          .catch((err) => console.log(err));
      }
    });
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onBlur" });
  return (
    <div>
      <Header title="New Game" />
      <form onSubmit={handleSubmit(newGame)}>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name your game
        </label>
        <Input
          placeholder="Name"
          error={errors.name?.message}
          {...register("name", {
            required: { value: true, message: "Name is required" },
            minLength: {
              value: 4,
              message: "Please use at least 4 characters",
            },
          })}
        />
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Number of cards
        </label>
        <SelectInput
          error={errors.cards?.message}
          {...register("cards", {
            validate: (value) => {
              return (value >= 4 && value <= 6) || "Please use 4, 5, or 6";
            },
            valueAsNumber: true,
          })}
        >
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
        </SelectInput>
        <Button type="submit">New Game</Button>
      </form>
    </div>
  );
};

export default NewGamePage;
