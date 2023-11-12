import { Box, Button, Stack } from "@mui/material";
import { useRecoilValue } from "recoil";
import { useMessages } from "../hooks/useMessages";
import { Card } from "../model/Card";
import { Game, getHandForPlayer } from "../model/Game";
import { discard } from "../services/GameService";
import { playerState } from "../state/PlayerState";

type Props = { game: Game };

const TurnActions = ({ game }: Props) => {
  const messages = useMessages();
  const { uid } = useRecoilValue(playerState)!;
  const playerHand = getHandForPlayer(game.hands, uid);
  const handleDiscard = (c: Card) => {
    discard(game.id, uid, c).catch(messages.error);
  };
  return (
    <Box display="flex">
      <Stack gap={1}>
        {playerHand?.cards.map((c, i) => (
          <Button
            key={i}
            onClick={() => handleDiscard(c)}
            variant="contained"
          >{`Discard ${c}`}</Button>
        ))}
      </Stack>
    </Box>
  );
};

export default TurnActions;
