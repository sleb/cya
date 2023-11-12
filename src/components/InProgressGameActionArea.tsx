import { Stack } from "@mui/material";
import { Game } from "../model/Game";
import CurrentGameState from "./CurrentGameState";
import TurnActionArea from "./TurnActionArea";

type Props = { game: Game };

const InProgressGameActionArea = ({ game }: Props) => {
  return (
    <Stack gap={2}>
      <CurrentGameState game={game} />
      <TurnActionArea game={game} />
    </Stack>
  );
};

export default InProgressGameActionArea;
