import { Stack, Typography } from "@mui/material";
import { Card } from "../model/Card";
import CardDisplay from "./CardDisplay";

type Props = { hand: Card[] };

const HandState = ({ hand }: Props) => {
  return (
    <Stack gap={1}>
      <Typography variant="h5">Hand</Typography>
      <Stack gap={1} direction="row">
        {hand.map((c, i) => (
          <CardDisplay card={c} key={i} cardId={i} dragSource="hand" />
        ))}
      </Stack>
    </Stack>
  );
};

export default HandState;
