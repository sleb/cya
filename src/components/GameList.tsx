import { DeleteForever } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useMessages } from "../hooks/useMessages";
import { Game } from "../model/Game";
import { deleteGame, onGamesChange } from "../services/GameService";
import { playerState } from "../state/PlayerState";
import CopyJoinGameLinkIcon from "./CopyJoinGameLinkIcon";

const GameList = () => {
  const { uid } = useRecoilValue(playerState)!;
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const messages = useMessages();

  const handleDelete = (id: string) => {
    deleteGame(id).catch(messages.error);
  };

  const handleNewGame = () => {
    navigate("new");
  };

  useEffect(() => {
    setLoading(true);
    return onGamesChange(uid, (games) => {
      setGames(games);
      setLoading(false);
    });
  }, [uid]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell># Players</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {games.map((g, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Link component={RouterLink} to={g.id}>
                    {g.name}
                  </Link>
                </TableCell>
                <TableCell>{g.playerIds.length}</TableCell>
                <TableCell>{g.state}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(g.id)}>
                    <DeleteForever fontSize="small" />
                  </IconButton>
                  <CopyJoinGameLinkIcon gameId={g.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={handleNewGame}>New Game</Button>
    </Box>
  );
};

export default GameList;
