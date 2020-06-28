import {
  Container,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  Link,
  MenuItem,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";

export default function Layout({ children }) {
  // Handle menu clicks
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Link href="/reviews/new">
              <MenuItem onClick={handleClose}>Review a beer</MenuItem>
            </Link>
            <Link href="/submissions/new">
              <MenuItem onClick={handleClose}>Submit a beer</MenuItem>
            </Link>
            <MenuItem>
              <a href="/api/auth/logout">Logout</a>
            </MenuItem>
          </Menu>
          <Typography variant="h6">Rebrew</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xs" style={{ minHeight: "80vh" }}>
        {children}
      </Container>
    </>
  );
}
