import { Delete as DeleteIcon } from "@mui/icons-material";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MessageContext } from "../contexts/MessageContext";
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
import InitialsAvatar from "./InitialsAvatar";

type Params = { id: string };

const GameDetails = () => {
  const [requests, setRequests] = useState<JoinRequest[]>([]);
  const [game, setGame] = useState<Game | null>(null);
  const [loadingGame, setLoadingGame] = useState(false);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const { error } = useContext(MessageContext);

  const { id } = useParams<Params>();

  const handleAllow = (id: string) => {
    approveJoinRequest(id).catch(error);
  };

  const handleIgnore = (id: string) => {
    deleteJoinRequest(id).catch(error);
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
        <List>
          {requests.map((r, i) => (
            <ListItem
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleIgnore(r.id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
              key={i}
            >
              <ListItemText
                secondary={`Message: "${r.requestor.message}"`}
                onClick={() => handleAllow(r.id)}
              >{`${r.requestor.displayName} wants to join.`}</ListItemText>
            </ListItem>
          ))}
        </List>
        <Box>
          <Typography variant="h2">Players</Typography>
          <List>
            {game.players.map((p, i) => (
              <ListItem key={i}>
                <ListItemAvatar>
                  <InitialsAvatar name={p.displayName} />
                </ListItemAvatar>
                <ListItemText>{p.displayName}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>
        <GameActionArea game={game} />
      </Stack>
    </Box>
  );
};

export default GameDetails;
