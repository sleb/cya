import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { currentUser } from "../../../services/auth-service";
import { createGame } from "../../../services/game-service";
import Button from "../../Button";
import Header from "../Header";
import TextInput from "../../TextInput";
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
    control,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onBlur" });
  return (
    <div>
      <Header title="New Game" />
      <form onSubmit={handleSubmit(newGame)}>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name your game
        </label>
        <Controller
          name="name"
          control={control}
          rules={{
            required: { value: true, message: "Name is required" },
            minLength: {
              value: 4,
              message: "Please use at least 4 characters",
            },
          }}
          render={({ field: { onChange, onBlur } }) => (
            <TextInput
              placeholder="Name"
              error={errors.name?.message}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Number of cards
        </label>
        <Controller
          name="cards"
          control={control}
          defaultValue={4}
          rules={{
            validate: (value) => {
              return (+value >= 4 && +value <= 6) || "Please use 4, 5, or 6";
            },
          }}
          render={({ field: { onChange, onBlur } }) => (
            <SelectInput
              error={errors.cards?.message}
              onChange={onChange}
              onBlur={onBlur}
            >
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
            </SelectInput>
          )}
        />
        <Button title="New Game" type="submit" />
      </form>
    </div>
  );
};

export default NewGamePage;
