import { Box, Stack, Typography } from "@mui/material";
import { cardImage } from "../lib/card-image";
import { Card, Cards } from "../model/Card";

type Props = { hand: Card[] };

const HandState = ({ hand }: Props) => {
  console.log(cardImage(Cards.BankAccount));
  return (
    <Stack gap={1}>
      <Typography variant="h5">Hand</Typography>
      <Stack gap={1} direction="row">
        {hand.map((c, i) => (
          <Box component="img" src={cardImage(c)} maxHeight={100} key={i} />
        ))}
      </Stack>
    </Stack>
  );
};

export default HandState;
