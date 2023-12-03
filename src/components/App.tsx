import { Box, CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { MessageContext } from "../contexts/MessageContext";
import { onUserChange } from "../services/AuthService";
import { playerState } from "../state/PlayerState";

const App = () => {
  const setPlayer = useSetRecoilState(playerState);
  const [loading, setLoading] = useState(true);
  const { error } = useContext(MessageContext);

  useEffect(() => {
    setLoading(true);
    return onUserChange(
      (player) => {
        setPlayer(player);
        setLoading(false);
      },
      (e) => error(e.message)
    );
  }, [error, setPlayer]);

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
