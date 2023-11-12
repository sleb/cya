import { Game } from "../model/Game";
import InProgressGameActionArea from "./InProgressGameActionArea";
import NewGameActionArea from "./NewGameActionArea";

type Props = { game: Game };

const GameActionArea = ({ game }: Props) => {
  if (game.state === "new") {
    return <NewGameActionArea gameId={game.id} />;
  }

  if (game.state === "in-progress") {
    return <InProgressGameActionArea game={game} />;
  }
};

export default GameActionArea;
