import { Alert, Box, Snackbar } from "@mui/material";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { MessageContext } from "../contexts/MessageContext";

const BaseLayout = () => {
  const { message, setMessage } = useContext(MessageContext);

  const handleClose = () => {
    setMessage(null);
  };

  return (
    <Box display="flex" flexDirection="column" flexGrow={1}>
      <Outlet />
      <Snackbar
        open={Boolean(message)}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={message?.severity}>
          {message?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BaseLayout;
