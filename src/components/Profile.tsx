import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { JoinRequest } from "../model/JoinRequest";
import {
  approveJoinRequest,
  deleteJoinRequest,
  getJoinRequestsForApprover,
} from "../services/JoinRequestService";
import { playerState } from "../state/PlayerState";

const Profile = () => {
  const { uid } = useRecoilValue(playerState)!;
  const [requests, setRequests] = useState<JoinRequest[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAllow = (id: string) => {
    approveJoinRequest(id).catch(console.error);
  };

  const handleIgnore = (id: string) => {
    deleteJoinRequest(id).catch(console.error);
  };

  useEffect(() => {
    setLoading(true);
    // TODO subscribe to updates
    getJoinRequestsForApprover(uid).then((rs) => {
      setRequests(rs);
      setLoading(false);
    });
  }, [uid]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <ul>
      {requests.map((r, i) => (
        <li key={i}>
          <Box>
            <Typography>{`${r.requestor.displayName} wants to join ${r.game.name}. Message: "${r.requestor.message}"`}</Typography>
            <ButtonGroup size="small" variant="contained">
              <Button onClick={() => handleAllow(r.id)}>Allow</Button>
              <Button onClick={() => handleIgnore(r.id)}>Ignore</Button>
            </ButtonGroup>
          </Box>
        </li>
      ))}
    </ul>
  );
};

export default Profile;
