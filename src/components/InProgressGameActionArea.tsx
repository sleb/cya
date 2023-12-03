import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Stack } from "@mui/material";
import { useContext } from "react";
import { useRecoilValue } from "recoil";
import { MessageContext } from "../contexts/MessageContext";
import { Game } from "../model/Game";
import { discard } from "../services/GameService";
import { playerState } from "../state/PlayerState";
import AssetsState from "./AssetsState";
import CurrentGameState from "./CurrentGameState";
import TurnActionArea from "./TurnActionArea";

type Props = { game: Game };

const InProgressGameActionArea = ({ game }: Props) => {
  const { uid } = useRecoilValue(playerState)!;
  const { error } = useContext(MessageContext);

  const handleDragEnd = (e: DragEndEvent) => {
    if (e.over && e.active.data.current) {
      const { card, dragSource } = e.active.data.current;
      switch (e.over.id) {
        case "discard": {
          if (dragSource === "hand") {
            discard(game.id, uid, card).catch(error);
          }
          break;
        }
        default: {
          console.log([e.over.id, dragSource]);
        }
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Stack gap={2}>
        <CurrentGameState game={game} />
        <AssetsState assets={game.assets} />
        <TurnActionArea game={game} />
      </Stack>
    </DndContext>
  );
};

export default InProgressGameActionArea;
