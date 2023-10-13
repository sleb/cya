import { Button } from "@mui/material";
import { signInUser } from "../services/AuthService";

const Login = () => {
  const handleLogIn = () => {
    signInUser().catch(console.error);
  };

  return (
    <Button color="inherit" onClick={handleLogIn}>
      Log In
    </Button>
  );
};

export default Login;
