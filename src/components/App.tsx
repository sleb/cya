import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { useMessages } from "../hooks/useMessages";
import { onUserChange } from "../services/AuthService";
import { playerState } from "../state/PlayerState";

const App = () => {
  const setPlayer = useSetRecoilState(playerState);
  const [loading, setLoading] = useState(true);
  const messages = useMessages();

  useEffect(() => {
    setLoading(true);
    return onUserChange((player) => {
      setPlayer(player);
      setLoading(false);
    }, messages.error);
  }, [messages.error, setPlayer]);

  if (loading) {
    return (
      <Box
        display="flex"
        flexGrow={1}
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return <Outlet />;
};

export default App;
