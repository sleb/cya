import React from "react";
import { User } from "../model/user";
import { signOutUser } from "../services/auth-service";

type Props = { user: User };

const LogOutButton = ({ user }: Props) => {
  const logOut = () => {
    signOutUser().catch(console.error);
  };

  return (
    <button
      className="bg-green-900 text-white px-3 py-2 rounded-md text-sm font-medium"
      onClick={logOut}
    >
      Log out {user.name}
    </button>
  );
};

export default LogOutButton;
