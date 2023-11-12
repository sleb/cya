import { Box, Stack, Typography } from "@mui/material";
import CardBack from "../assets/card-back.webp";
import { Card } from "../model/Card";

type Props = { deck: Card[] };

const DeckState = ({ deck }: Props) => {
  return (
    <Stack gap={1}>
      <Typography variant="h5">Deck</Typography>

      <Stack direction="row" gap={1}>
        <Box component="img" maxHeight={100} src={CardBack} />
        <Typography alignSelf="center">{`${deck.length} cards left`}</Typography>
      </Stack>
    </Stack>
  );
};

export default DeckState;
