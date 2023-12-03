import { Button } from "@mui/material";
import { useContext } from "react";
import { MessageContext } from "../contexts/MessageContext";
import { signInUser } from "../services/AuthService";

const Login = () => {
  const { error } = useContext(MessageContext);

  const handleLogIn = () => {
    signInUser().catch(error);
  };

  return (
    <Button color="inherit" onClick={handleLogIn}>
      Log In
    </Button>
  );
};

export default Login;
