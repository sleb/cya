import { Box, Stack, Typography } from "@mui/material";
import { AssetStack } from "../model/Asset";
import AssetStackState from "./AssetStackState";

type Props = { assets: AssetStack[] };

const AssetsState = ({ assets }: Props) => {
  return (
    <Box display="flex">
      <Stack gap={1}>
        <Typography variant="h5">Asset Stacks</Typography>
        {assets.map((a, i) => (
          <AssetStackState assets={a} key={i} />
        ))}
      </Stack>
    </Box>
  );
};

export default AssetsState;
