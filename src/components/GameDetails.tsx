import {
  Box,
  Button,
  ButtonGroup,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMessages } from "../hooks/useMessages";
import { Game } from "../model/Game";
import { JoinRequest } from "../model/JoinRequest";
import { onGameChange } from "../services/GameService";
import {
  approveJoinRequest,
  deleteJoinRequest,
  onGameJoinRequestChange,
} from "../services/JoinRequestService";
import CopyJoinGameLinkIcon from "./CopyJoinGameLinkIcon";
import GameActionArea from "./GameActionArea";

type Params = { id: string };

const GameDetails = () => {
  const [requests, setRequests] = useState<JoinRequest[]>([]);
  const [game, setGame] = useState<Game | null>(null);
  const [loadingGame, setLoadingGame] = useState(false);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const messages = useMessages();

  const { id } = useParams<Params>();

  const handleAllow = (id: string) => {
    approveJoinRequest(id).catch(messages.error);
  };

  const handleIgnore = (id: string) => {
    deleteJoinRequest(id).catch(messages.error);
  };

  useEffect(() => {
    setLoadingGame(true);
    if (id) {
      setLoadingGame(false);
      return onGameChange(id, (g) => {
        setGame(g);
        setLoadingGame(false);
      });
    }
  }, [id]);

  useEffect(() => {
    if (game) {
      setLoadingRequests(true);
      onGameJoinRequestChange(game.id, (requests) => {
        setRequests(requests);
        setLoadingRequests(false);
      });
    }
  }, [game]);

  if (loadingGame || loadingRequests) {
    return <Typography>Loading...</Typography>;
  }

  if (!game) {
    return <Typography>Game `{id}` not found...</Typography>;
  }

  return (
    <Box>
      <Stack direction="column">
        <Stack direction="row" gap={2}>
          <Typography variant="h1">{game.name}</Typography>
          {game.state === "new" && (
            <Box>
              <CopyJoinGameLinkIcon gameId={game.id} />
            </Box>
          )}
        </Stack>
        <Box>
          <Typography variant="h2">Players</Typography>
          <ul>
            {game.players.map((p, i) => (
              <li key={i}>{p.displayName}</li>
            ))}
            {requests.map((r, i) => (
              <li key={i}>
                <Box display="flex" flexDirection="row">
                  <Tooltip title={r.requestor.message}>
                    <Typography>{`${r.requestor.displayName} wants to join.`}</Typography>
                  </Tooltip>
                  <ButtonGroup size="small" variant="contained">
                    <Button onClick={() => handleAllow(r.id)}>Allow</Button>
                    <Button onClick={() => handleIgnore(r.id)}>Ignore</Button>
                  </ButtonGroup>
                </Box>
              </li>
            ))}
          </ul>
        </Box>
        <GameActionArea game={game} />
      </Stack>
    </Box>
  );
};

export default GameDetails;
