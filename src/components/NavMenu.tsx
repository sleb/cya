import { Games, Home } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavMenu = () => {
  const [menuElement, setMenuElement] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();

  const handleMenuClose = () => {
    setMenuElement(null);
  };

  const handleMenuOpen = (element: HTMLElement) => {
    setMenuElement(element);
  };

  const go = (to: string) => {
    handleMenuClose();
    navigate(to);
  };

  return (
    <>
      <IconButton onClick={(e) => handleMenuOpen(e.currentTarget)}>
        <MenuIcon htmlColor="white" />
      </IconButton>
      <Menu
        anchorEl={menuElement}
        open={Boolean(menuElement)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={() => go("/")}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <Typography>Home</Typography>
        </MenuItem>
        <MenuItem onClick={() => go("/games")}>
          <ListItemIcon>
            <Games />
          </ListItemIcon>
          <Typography>Games</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default NavMenu;
