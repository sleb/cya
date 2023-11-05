import { Box, Button, Input, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useMessages } from "../hooks/useMessages";
import { Game } from "../model/Game";
import { onGameChange } from "../services/GameService";
import {
  createJoinRequest,
  onJoinRequestChange,
} from "../services/JoinRequestService";
import { playerState } from "../state/PlayerState";

type Params = {
  id: string;
};

type FormData = {
  message: string;
};

const JoinGame = () => {
  const player = useRecoilValue(playerState)!;
  const [game, setGame] = useState<Game | null>(null);
  const [gameLoading, setGameLoading] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [requested, setRequested] = useState(false);
  const messages = useMessages();

  const { id } = useParams<Params>();

  const { handleSubmit, register } = useForm<FormData>({ mode: "onSubmit" });

  useEffect(() => {
    setGameLoading(true);
    if (id) {
      return onGameChange(id, (g) => {
        setGame(g);
        setGameLoading(false);
      });
    }
  }, [id]);

  useEffect(() => {
    setRequestLoading(true);
    if (id) {
      return onJoinRequestChange(id, player.uid, (r) => {
        setRequestLoading(false);
        if (r) {
          setRequested(true);
        }
      });
    }
  }, [id, player]);

  const onSubmit = ({ message }: FormData) => {
    if (game) {
      createJoinRequest(game, player, message).catch(messages.error);
    }
  };

  if (gameLoading || requestLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!game) {
    return <Typography>Game not found...</Typography>;
  }

  if (game.playerIds.includes(player.uid)) {
    return <Navigate to={`/games/${game.id}`} />;
  }

  return (
    <Box display="flex">
      <Stack direction="column">
        <Typography variant="h1">{game?.name}</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Enter message"
            type="text"
            disabled={requested}
            {...register("message", { required: true })}
          />
          <Button type="submit" variant="contained" disabled={requested}>
            {requested ? "Requested" : "Join this game"}
          </Button>
        </form>
      </Stack>
    </Box>
  );
};

export default JoinGame;
