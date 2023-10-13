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
import { useRecoilValue } from "recoil";
import { Game } from "../model/Game";
import { JoinRequest } from "../model/JoinRequest";
import { onGameChange } from "../services/GameService";
import {
  approveJoinRequest,
  deleteJoinRequest,
  getJoinRequestsForApprover,
} from "../services/JoinRequestService";
import { playerState } from "../state/PlayerState";

type Params = { id: string };

const GameDetails = () => {
  const { uid } = useRecoilValue(playerState)!;
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
    setLoadingRequests(true);
    // TODO subscribe to updates
    getJoinRequestsForApprover(uid).then((rs) => {
      setRequests(rs);
      setLoadingRequests(false);
    });
  }, [uid]);

  if (loadingGame || loadingRequests) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Stack direction="column">
        <Typography variant="h1">{game?.name}</Typography>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Tooltip title={joinLink}>
            <Typography variant="caption" maxWidth={200} display="block" noWrap>
              {joinLink}
            </Typography>
          </Tooltip>
          <IconButton onClick={() => navigator.clipboard.writeText(joinLink)}>
            <ContentCopy fontSize="small" />
          </IconButton>
        </Box>
        <Box>
          <Typography variant="h2">Players</Typography>
          <ul>
            {game?.players.map((p, i) => (
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
      </Stack>
    </Box>
  );
};

export default GameDetails;
