import { Logout } from "@mui/icons-material";
import { Avatar, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { signOutUser } from "../services/AuthService";
import { playerState } from "../state/PlayerState";
import Login from "./Login";

const ProfileMenu = () => {
  const player = useRecoilValue(playerState);
  const [menuElement, setMenuElement] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();

  const handleMenuOpen = (element: HTMLElement) => {
    setMenuElement(element);
  };

  const handleMenuClose = () => {
    setMenuElement(null);
  };

  const handleLogOut = () => {
    signOutUser().catch(console.error);
  };

  const initials = (name: string): string => {
    return name
      .split(/\s+/)
      .filter((w) => w.length !== 0)
      .map((w) => w[0].toUpperCase())
      .join("");
  };

  if (!player) {
    return <Login />;
  }

  return (
    <>
      <IconButton onClick={(e) => handleMenuOpen(e.currentTarget)}>
        <Avatar>{initials(player.displayName)}</Avatar>
      </IconButton>
      <Menu
        anchorEl={menuElement}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(menuElement)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleLogOut}>
          <Logout />
          <Typography>Log Out</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
