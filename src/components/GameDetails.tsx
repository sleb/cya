import { ContentCopy } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useHref, useParams } from "react-router-dom";
import { Game } from "../model/Game";
import { onGameChange } from "../services/GameService";

type Params = { id: string };

const GameDetails = () => {
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams<Params>();

  const joinLink = `${window.location.origin}${useHref("join")}`;

  useEffect(() => {
    setLoading(true);
    if (id) {
      setLoading(false);
      return onGameChange(id, (g: Game) => {
        setGame(g);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Stack direction="column">
        <Typography variant="h1">{game?.name}</Typography>
        <Box>
          <Typography variant="caption">{joinLink}</Typography>
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
          </ul>
        </Box>
      </Stack>
    </Box>
  );
};

export default GameDetails;
