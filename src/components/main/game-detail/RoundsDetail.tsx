import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Game, roundsToFormData } from "../../../model/game";
import { PlayerScore } from "../../../model/player-score";
import { addRoundToGame, updateRounds } from "../../../services/game-service";
import Button from "../../Button";
import NumberInput from "../../NumberInput";
import WhiteDiv from "../../WhiteDiv";

export type Props = {
  game: Game;
};

type Inputs = {
  scores: Record<string, number[]>;
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
    formState: { errors, isDirty },
  } = useForm<Inputs>({
    mode: "onBlur",
    defaultValues: roundsToFormData(game.rounds),
  });

  const updateScores = ({ scores }: Inputs) => {
    if (!isDirty) {
      return;
    }

    const rounds = game.rounds.map((round) => {
      const playerScores = round.playerScores.map((playerScore) => {
        const score = +scores[playerScore.player.name][round.num - 1];
        return { ...playerScore, score };
      });
      return { ...round, playerScores };
    });

    updateRounds(game.id, rounds).catch(console.error);
  };

  useEffect(() => {
    reset(roundsToFormData(game.rounds));
  }, [game, reset]);

  const navigate = useNavigate();

  return (
    <WhiteDiv>
      <form
        onSubmit={handleSubmit(updateScores)}
        onBlur={handleSubmit(updateScores)}
      >
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
                      rules={{
                        required: { value: true, message: "Score is required" },
                        validate: (value) =>
                          value >= 0 || "Score must be positive",
                      }}
                      name={`scores.${playerScore.player.name}.${
                        round.num - 1
                      }`}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <NumberInput
                          placeholder="Score"
                          onBlur={onBlur}
                          onChange={onChange}
                          value={value}
                          error={
                            errors.scores?.[playerScore.player.name]?.[
                              round.num - 1
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
        </div>
        <div className="mt-2 flex flex-row space-x-2">
          <Button type="button" title="Add Round" onClick={addRound} />
          <Button
            type="submit"
            title="Go Back"
            onClick={() => navigate("/dashboard")}
            invert
          />
        </div>
      </form>
    </WhiteDiv>
  );
};

export default RoundsDetail;
