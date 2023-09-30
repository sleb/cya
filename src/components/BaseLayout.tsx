import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Outlet />
    </Box>
  );
};

export default BaseLayout;
