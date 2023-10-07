import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { signInUser } from "../services/AuthService";
import { userIdState } from "../state/UserIdState";
import Profile from "./Profile";

const Home = () => {
  const uid = useRecoilValue(userIdState);
  const navigate = useNavigate();

  const handleLogin = () => {
    signInUser().catch(console.error);
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
        Continue Game
      </Button>
    </Stack>
  );

  const renderButtons = uid ? renderMenu : renderLogin;

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        flexGrow={1}
        justifyContent="center"
        alignItems="center"
        margin={2}
      >
        {renderButtons}
      </Box>
      <Profile />
    </>
  );
};

export default Home;
