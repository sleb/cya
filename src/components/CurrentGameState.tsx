import { Stack } from "@mui/material";
import { useRecoilValue } from "recoil";
import { Game } from "../model/Game";
import { playerState } from "../state/PlayerState";
import DeckState from "./DeckState";
import DiscardState from "./DiscardState";
import HandState from "./HandState";

type Props = { game: Game };

const CurrentGameState = ({ game }: Props) => {
  const player = useRecoilValue(playerState)!;
  const playerHand = game.hands.find((h) => h.playerId === player.uid);

  if (!playerHand) {
    throw new Error("No hand for player");
  }

  return (
    <Stack gap={1}>
      <DeckState deck={game.deck} />
      <DiscardState discard={game.discard} />
      <HandState hand={playerHand.cards} />
    </Stack>
  );
};

export default CurrentGameState;
