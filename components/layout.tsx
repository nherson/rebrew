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
  Divider,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useContext, useState } from "react";
import { AdminContext } from "../lib/admin";

export default function Layout({ children }) {
  // Handle menu clicks
  const [anchorEl, setAnchorEl] = useState(null);

  // Render admin buttons, if applicable
  const adminAuth = useContext(AdminContext);

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
            {adminAuth.isAdmin && (
              <div>
                <MenuItem>
                  <a href="/admin/meetings">Manage Meetings</a>
                </MenuItem>
                <Divider />
              </div>
            )}
            <MenuItem>
              <a href="/api/auth/logout">Logout</a>
            </MenuItem>
          </Menu>
          <Link href="/" color="inherit" underline="none">
            <Typography variant="h6">Rebrew</Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xs" style={{ minHeight: "80vh" }}>
        {children}
      </Container>
    </>
  );
}
