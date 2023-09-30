import { AppBar, Box, Container, Link, Toolbar } from "@mui/material";
import { Outlet, Link as RouterLink } from "react-router-dom";
import Login from "./Login";
import Logo from "./Logo";
import NavMenu from "./NavMenu";

const Header = () => {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              display="flex"
              flexGrow={1}
              justifyContent="space-between"
              alignItems="center"
            >
              <Box display="flex" flexGrow={1}>
                <NavMenu />
              </Box>
              <Box display="flex" flexGrow={2} justifyContent="center">
                <Link
                  component={RouterLink}
                  to="/"
                  fontSize={20}
                  sx={{ textDecoration: "none", fontWeight: "bold" }}
                >
                  <Logo />
                </Link>
              </Box>
              <Box display="flex" flexGrow={1} justifyContent="end">
                <Login />
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box display="flex" flexDirection="column" flexGrow={1}>
        <Outlet />
      </Box>
    </>
  );
};

export default Header;
