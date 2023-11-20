import { Box, Stack, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { Game, getHandForPlayer } from "../model/Game";
import { playerState } from "../state/PlayerState";
import DiscardActions from "./DiscardActions";

type Props = { game: Game };

const TurnActions = ({ game }: Props) => {
  const { uid } = useRecoilValue(playerState)!;
  const playerHand = getHandForPlayer(game.hands, uid);

  if (!playerHand) {
    throw new Error("Missing hand for player");
  }

  return (
    <Box display="flex">
      <Stack gap={1}>
        <Typography variant="h5">It's your turn!</Typography>
        <Typography variant="h6">Discard</Typography>
        <DiscardActions gameId={game.id} hand={playerHand} />
      </Stack>
    </Box>
  );
};

export default TurnActions;
