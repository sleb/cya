import { Box } from "@mui/material";
import { cardImage } from "../lib/card-image";
import { Card } from "../model/Card";

type Props = { card: Card; maxHeight: number };

const CardImage = ({ card, maxHeight }: Props) => {
  return <Box maxHeight={maxHeight} component="img" src={cardImage(card)} />;
};

export default CardImage;
