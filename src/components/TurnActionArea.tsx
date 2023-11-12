import { Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { Game } from "../model/Game";
import { playerState } from "../state/PlayerState";
import TurnActions from "./TurnActions";

type Props = { game: Game };

const TurnActionArea = ({ game }: Props) => {
  const player = useRecoilValue(playerState);
  if (!game.nextPlayer) {
    throw "no next player?!";
  }

  if (game.nextPlayer.uid === player?.uid) {
    return <TurnActions game={game} />;
  } else {
    return <Typography>It's {game.nextPlayer.displayName}'s turn!!</Typography>;
  }
};

export default TurnActionArea;
