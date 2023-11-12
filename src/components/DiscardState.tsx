import { Box, Stack, Typography } from "@mui/material";
import { cardImage } from "../lib/card-image";
import { Card } from "../model/Card";

type Props = { discard: Card[] };

const DiscardState = ({ discard }: Props) => {
  return (
    <Stack gap={1}>
      <Typography variant="h5">Discard</Typography>
      <Stack direction="row" gap={1}>
        <Box
          maxHeight={100}
          component="img"
          src={cardImage(discard[discard.length - 1])}
        />
        <Typography>{`${discard.length} cards left`}</Typography>
      </Stack>
    </Stack>
  );
};

export default DiscardState;
