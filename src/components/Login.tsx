import { Button } from "@mui/material";
import { useRecoilValue } from "recoil";
import { signInUser, signOutUser } from "../services/AuthService";
import { userIdState } from "../state/UserIdState";

const Login = () => {
  const uid = useRecoilValue(userIdState);

  const handleClick = async () => {
    try {
      if (uid) {
        await signOutUser();
      } else {
        await signInUser();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Button color="inherit" onClick={handleClick}>
      {uid ? "Log Out" : "Log In"}
    </Button>
  );
};

export default Login;
