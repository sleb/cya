import React from "react";
import { JoinRequest } from "../../../model/join-request";
import { addUserToGame } from "../../../services/game-service";
import { deleteJoinRequest } from "../../../services/join-request-service";
import Button from "../../Button";

export type Props = {
  joinRequest: JoinRequest;
};

const acceptJoinRequest = (joinRequest: JoinRequest) => {
  addUserToGame(joinRequest.gameId, joinRequest.user)
    .then(() => {
      deleteJoinRequest(joinRequest.id);
    })
    .catch(console.error);
};

const JoinRequestListItem = ({ joinRequest }: Props) => {
  return (
    <div className="flex justify-between border-b border-green-800 p-2 mb-2">
      <div>
        {joinRequest.user.name}
        {joinRequest.message && `: "${joinRequest.message}"`}
      </div>
      <div className="flex flex-row space-x-2">
        <Button type="button" onClick={() => acceptJoinRequest(joinRequest)}>
          Accept
        </Button>
        <Button
          type="button"
          onClick={() => deleteJoinRequest(joinRequest.id)}
          invert
        >
          Reject
        </Button>
      </div>
    </div>
  );
};

export default JoinRequestListItem;
