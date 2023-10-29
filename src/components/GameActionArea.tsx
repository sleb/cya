import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { getFunctions, httpsCallable } from "firebase/functions";
import { Link as RouterLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { app } from "../firebase";
import { Game } from "../model/Game";
import { startGame } from "../services/GameService";
import { playerState } from "../state/PlayerState";

type Props = { game: Game };

const GameActionArea = ({ game }: Props) => {
  const { uid } = useRecoilValue(playerState)!;

  const handleStartGame = () => {
    startGame(game.id).catch(console.error);
  };

  const handleHelloPress = () => {
    const functions = getFunctions(app);
    const hello = httpsCallable(functions, "helloWorld");
    hello()
      .then((result) => console.log(`result: ${JSON.stringify(result)}`))
      .catch(console.error);
  };

  if (game.state === "new") {
    return (
      <Button size="small" variant="contained" onClick={handleStartGame}>
        Start Game
      </Button>
    );
  }

  if (game.state === "complete") {
    return (
      <Stack>
        <Typography>This game has ended</Typography>
        <Link component={RouterLink} to="/">
          Go Home
        </Link>
      </Stack>
    );
  }

  if (!game.nextPlayer) {
    throw "no next player?!";
  }

  return (
    <Box>
      {game.nextPlayer.uid === uid ? (
        <Typography>It's your turn!!</Typography>
      ) : (
        <Typography>It's {game.nextPlayer.displayName}'s turn!!</Typography>
      )}
      <Button onClick={handleHelloPress}>Say Hello</Button>
    </Box>
  );
};

export default GameActionArea;
