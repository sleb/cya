import { DeleteForever } from "@mui/icons-material";
import { IconButton, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Game } from "../model/Game";
import { deleteGame, onGamesChange } from "../services/GameService";
import { userIdState } from "../state/UserIdState";

const GameList = () => {
  // uid can't be null because route is protected by <AuthRequired />
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const uid = useRecoilValue(userIdState)!;
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = (id: string) => {
    deleteGame(id).catch(console.error);
  };

  useEffect(() => {
    setLoading(true);
    return (
      onGamesChange(uid, (games) => {
        setGames(games);
        setLoading(false);
      }),
      console.error
    );
  }, [uid]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <ul>
      {games.map((g, i) => (
        <li key={i}>
          <Link component={RouterLink} to={g.id}>
            {g.name}
          </Link>
          <IconButton onClick={() => handleDelete(g.id)}>
            <DeleteForever fontSize="small" />
          </IconButton>
        </li>
      ))}
    </ul>
  );
};

export default GameList;
