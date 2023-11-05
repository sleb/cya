import { Alert, Box, Snackbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { messageState } from "../state/MessageState";

const BaseLayout = () => {
  const [message, setMessage] = useRecoilState(messageState);

  const handleClose = () => {
    setMessage(null);
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Outlet />
      <Snackbar
        open={Boolean(message)}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={message?.severity}
          sx={{ width: "80%" }}
        >
          {message?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BaseLayout;
