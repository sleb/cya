import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { playerState } from "../state/PlayerState";

const AuthRequired = () => {
  const player = useRecoilValue(playerState);

  if (!player) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AuthRequired;
