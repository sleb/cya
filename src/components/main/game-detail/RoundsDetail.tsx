import React, { useEffect } from "react";
import Icon from "@mdi/react";
import { mdiDelete } from "@mdi/js";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Game, roundsToFormData } from "../../../model/game";
import { PlayerScore } from "../../../model/player-score";
import { addRoundToGame, updateRounds } from "../../../services/game-service";
import Button from "../../Button";
import WhiteDiv from "../../WhiteDiv";
import Input from "../../Input";

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
      startTime: Date.now(),
      playerScores,
    }).catch(console.error);
  };

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isDirty },
  } = useForm<Inputs>({
    mode: "onBlur",
  });

  const updateScores = ({ scores }: Inputs) => {
    if (!isDirty) {
      return;
    }

    const rounds = game.rounds.map((round, roundIndex) => {
      const playerScores = round.playerScores.map((playerScore) => {
        const score = scores[playerScore.player.name][roundIndex];
        return { ...playerScore, score };
      });
      return { ...round, playerScores };
    });

    updateRounds(game.id, rounds).catch(console.error);
  };

  const deleteRound = (index: number) => {
    const dup = [...game.rounds];
    dup.splice(index, 1);
    updateRounds(game.id, dup).catch(console.error);
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
          {game.rounds.map((round, roundIndex) => (
            <div key={roundIndex}>
              <div className="flex flex-row mb-2 border-b border-green-800">
                <button
                  className="text-gray-400 hover:text-red-500"
                  onClick={() => deleteRound(roundIndex)}
                >
                  <Icon path={mdiDelete} size={0.75} />
                </button>
                <label key={roundIndex} className="block text-gray-700">
                  Round{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "short",
                    timeStyle: "short",
                  }).format(round.startTime)}
                </label>
              </div>
              <div className="px-4">
                {round.playerScores.map((playerScore, playerScoreIndex) => (
                  <div key={playerScoreIndex} className="flex justify-between">
                    {`${playerScore.player.name}: `}
                    <Input
                      type="number"
                      placeholder="Score"
                      error={
                        errors?.scores?.[playerScore.player.name][roundIndex]
                          ?.message
                      }
                      {...register(
                        `scores.${playerScore.player.name}.${roundIndex}`,
                        {
                          required: {
                            value: true,
                            message: "Score is required",
                          },
                          validate: (value) =>
                            value >= 0 || "Score must be positive",
                          valueAsNumber: true,
                        }
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </form>
      <div className="mt-2 flex flex-row space-x-2">
        <Button type="button" title="Add Round" onClick={addRound} />
        <Button
          type="submit"
          title="Go Back"
          onClick={() => navigate("/dashboard")}
          invert
        />
      </div>
    </WhiteDiv>
  );
};

export default RoundsDetail;
