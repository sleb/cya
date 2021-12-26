import React from "react";
import { JoinRequest } from "../model/join-request";
import Button from "./Button";

export type Props = {
  joinRequest: JoinRequest;
};

const JoinRequestListItem = ({ joinRequest }: Props) => {
  return (
    <div className="flex justify-between border rounded-md border-green-800 p-2 mb-2">
      <div>
        {joinRequest.user.name}
        {joinRequest.message && `: "${joinRequest.message}"`}
      </div>
      <div className="flex flex-row space-x-2">
        <Button type="button" title="Accept" />
        <Button type="button" title="Reject" invert />
      </div>
    </div>
  );
};

export default JoinRequestListItem;
