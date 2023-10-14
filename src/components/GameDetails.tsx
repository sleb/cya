import { ContentCopy } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useHref, useParams } from "react-router-dom";
import { Game } from "../model/Game";
import { JoinRequest } from "../model/JoinRequest";
import { onGameChange } from "../services/GameService";
import {
  approveJoinRequest,
  deleteJoinRequest,
  onGameJoinRequestChange,
} from "../services/JoinRequestService";
import GameActionArea from "./GameActionArea";

type Params = { id: string };

const GameDetails = () => {
  const [requests, setRequests] = useState<JoinRequest[]>([]);
  const [game, setGame] = useState<Game | null>(null);
  const [loadingGame, setLoadingGame] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(true);

  const { id } = useParams<Params>();

  const handleAllow = (id: string) => {
    approveJoinRequest(id).catch(console.error);
  };

  const handleIgnore = (id: string) => {
    deleteJoinRequest(id).catch(console.error);
  };
  const joinLink = `${window.location.origin}${useHref("join")}`;

  useEffect(() => {
    setLoadingGame(true);
    if (id) {
      setLoadingGame(false);
      return onGameChange(id, (g: Game) => {
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
    return <Typography>Game not found...</Typography>;
  }

  return (
    <Box>
      <Stack direction="column">
        <Typography variant="h1">{game.name}</Typography>
        {game.state === "new" && (
          <Box display="flex" flexDirection="row" alignItems="center">
            <Tooltip title={joinLink}>
              <Typography
                variant="caption"
                maxWidth="75%"
                display="block"
                noWrap
              >
                {joinLink}
              </Typography>
            </Tooltip>
            <IconButton onClick={() => navigator.clipboard.writeText(joinLink)}>
              <ContentCopy fontSize="small" />
            </IconButton>
          </Box>
        )}
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
