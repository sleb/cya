import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "@mui/material";
import { cardImage } from "../lib/card-image";
import { Card } from "../model/Card";

type Props = { card: Card; cardId: number; dragSource?: string };

const CardDisplay = ({ card, cardId, dragSource }: Props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${card}-${cardId}`,
    data: { card, dragSource },
  });

  const cardComponent = (
    <Box component="img" src={cardImage(card)} maxHeight={100} />
  );

  if (dragSource) {
    return (
      <Box
        ref={setNodeRef}
        style={
          transform
            ? {
                transform: CSS.Translate.toString(transform),
              }
            : undefined
        }
        {...listeners}
        {...attributes}
      >
        {cardComponent}
      </Box>
    );
  }

  return cardComponent;
};

export default CardDisplay;
