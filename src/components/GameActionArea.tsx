import { Button } from "@mui/material";
import { Game } from "../model/Game";
import { startGame } from "../services/GameService";

type Props = { game: Game };

const GameActionArea = ({ game }: Props) => {
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
};

export default GameActionArea;
