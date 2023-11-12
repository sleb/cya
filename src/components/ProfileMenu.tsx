import { Logout } from "@mui/icons-material";
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useMessages } from "../hooks/useMessages";
import { signOutUser } from "../services/AuthService";
import { playerState } from "../state/PlayerState";
import InitialsAvatar from "./InitialsAvatar";
import Login from "./Login";

const ProfileMenu = () => {
  const player = useRecoilValue(playerState);
  const [menuElement, setMenuElement] = useState<HTMLElement | null>(null);
  const messages = useMessages();

  const handleMenuOpen = (element: HTMLElement) => {
    setMenuElement(element);
  };

  const handleMenuClose = () => {
    setMenuElement(null);
  };

  const handleLogOut = () => {
    signOutUser().catch(messages.error);
  };

  if (!player) {
    return <Login />;
  }

  return (
    <>
      <IconButton onClick={(e) => handleMenuOpen(e.currentTarget)}>
        <InitialsAvatar name={player.displayName} />
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
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <Typography>Log Out</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
