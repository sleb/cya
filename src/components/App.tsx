import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { onUserChange } from "../services/AuthService";
import { userIdState } from "../state/UserIdState";

const App = () => {
  const setUid = useSetRecoilState(userIdState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    return onUserChange((uid) => {
      setUid(uid);
      setLoading(false);
    }, console.error);
  }, [setUid]);

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
