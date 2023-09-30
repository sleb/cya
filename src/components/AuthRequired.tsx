import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userIdState } from "../state/UserIdState";

const AuthRequired = () => {
  const uid = useRecoilValue(userIdState);

  if (!uid) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AuthRequired;
