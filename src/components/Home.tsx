import { Box, Button, Stack } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { MessageContext } from "../contexts/MessageContext";
import { signInUser } from "../services/AuthService";
import { playerState } from "../state/PlayerState";

const Home = () => {
  const player = useRecoilValue(playerState);
  const navigate = useNavigate();
  const { error } = useContext(MessageContext);

  const handleLogin = () => {
    signInUser().catch(error);
  };

  const renderLogin = (
    <Button variant="contained" fullWidth onClick={handleLogin}>
      Log In
    </Button>
  );

  const renderMenu = (
    <Stack direction="column" gap={2} width="100%">
      <Button variant="contained" onClick={() => navigate("games/new")}>
        New Game
      </Button>
      <Button variant="contained" onClick={() => navigate("games")}>
        My Games
      </Button>
    </Stack>
  );

  const renderButtons = player ? renderMenu : renderLogin;

  return (
    <Box display="flex" flexDirection="column" flexGrow={1}>
      {renderButtons}
    </Box>
  );
};

export default Home;
