import { Button } from "@mui/material";
import { useMessages } from "../hooks/useMessages";
import { signInUser } from "../services/AuthService";

const Login = () => {
  const messages = useMessages();

  const handleLogIn = () => {
    signInUser().catch(messages.error);
  };

  return (
    <Button color="inherit" onClick={handleLogIn}>
      Log In
    </Button>
  );
};

export default Login;
