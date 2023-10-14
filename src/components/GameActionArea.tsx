import { Button, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { Game } from "../model/Game";
import { startGame } from "../services/GameService";
import { playerState } from "../state/PlayerState";

type Props = { game: Game };

const GameActionArea = ({ game }: Props) => {
  const { uid } = useRecoilValue(playerState)!;
  const handleStartGame = () => {
    startGame(game.id).catch(console.error);
  };

  if (game.state === "new") {
    return (
      <Button size="small" variant="contained" onClick={handleStartGame}>
        Start Game
      </Button>
    );
  }

  if (game.state === "in-progress") {
    if (!game.nextPlayer) {
      throw "no next player?!";
    }

    if (game.nextPlayer.uid === uid) {
      return <Typography>It's your turn!!</Typography>;
    } else {
      return (
        <Typography>It's {game.nextPlayer.displayName}'s turn!!</Typography>
      );
    }
  }
};

export default GameActionArea;
