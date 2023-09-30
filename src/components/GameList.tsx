import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Game } from "../model/Game";
import { onGamesChange } from "../services/GameService";
import { userIdState } from "../state/UserIdState";

const GameList = () => {
  // uid can't be null because route is protected by <AuthRequired />
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const uid = useRecoilValue(userIdState)!;
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

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
        <li key={i}>{g.name}</li>
      ))}
    </ul>
  );
};

export default GameList;
