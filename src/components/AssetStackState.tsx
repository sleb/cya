import { Box, Stack, Typography } from "@mui/material";
import { AssetStack } from "../model/Asset";

type Props = { assets: AssetStack };

const AssetStackState = ({ assets }: Props) => {
  return (
    <Box display="flex">
      <Stack>
        <Typography variant="h6">{assets.player.displayName}</Typography>
      </Stack>
    </Box>
  );
};

export default AssetStackState;
