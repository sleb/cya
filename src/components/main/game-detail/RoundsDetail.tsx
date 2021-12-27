import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Game } from "../../../model/game";
import { PlayerScore } from "../../../model/player-score";
import { addRoundToGame, updateRounds } from "../../../services/game-service";
import Button from "../../Button";
import NumberInput from "../../NumberInput";

export type Props = {
  game: Game;
};

type Inputs = {
  scores: { [playerId: string]: number[] };
};

const RoundsDetail = ({ game }: Props) => {
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

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<Inputs>({ mode: "onBlur" });

  const updateScores = ({ scores }: Inputs) => {
    const rounds = game.rounds.map((round) => {
      const playerScores = round.playerScores.map((playerScore) => {
        const score = +scores[playerScore.player.name][round.num];
        return { ...playerScore, score };
      });
      return { ...round, playerScores };
    });

    updateRounds(game.id, rounds).catch(console.error);
  };

  return (
    <div className="bg-white shadow text-sm rounded-md p-2">
      <form onSubmit={handleSubmit(updateScores)}>
        <label className="block text-gray-700 font-bold mb-2">
          Rounds ({game.rounds.length})
        </label>
        <div className="px-4">
          {game.rounds.map((round, gameIndex) => (
            <div key={gameIndex}>
              <label
                key={round.num}
                className="block text-gray-700 mb-2 border-b border-green-800"
              >
                Round {round.num}
              </label>
              <div className="px-4">
                {round.playerScores.map((playerScore, playerScoreIndex) => (
                  <div key={playerScoreIndex} className="flex justify-between">
                    {`${playerScore.player.name}: `}
                    <Controller
                      control={control}
                      defaultValue={playerScore.score}
                      rules={{
                        required: { value: true, message: "Score is required" },
                        validate: (value) =>
                          value >= 0 || "Score must be positive",
                      }}
                      name={`scores.${playerScore.player.name}.${round.num}`}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <NumberInput
                          placeholder="Score"
                          onBlur={onBlur}
                          onChange={onChange}
                          value={value}
                          error={
                            errors.scores?.[playerScore.player.name]?.[
                              round.num
                            ]?.message
                          }
                        />
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <Button type="button" title="Add Round" onClick={addRound} />
        </div>
        <div className="mt-2 flex flex-row space-x-2">
          <Button
            type="submit"
            title="Update Scores"
            disabled={!isDirty || !isValid}
          />
          <Button type="submit" title="Cancel" onClick={() => reset()} invert />
        </div>
      </form>
    </div>
  );
};

export default RoundsDetail;
