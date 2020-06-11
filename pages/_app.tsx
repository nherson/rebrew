import "../styles/global.css";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from "../styles/theme";
import React from "react";
import Head from "next/head";
import { UserProvider, useFetchUser } from "../lib/user";
import Layout from "../components/layout";
import {
  AppBar,
  IconButton,
  Typography,
  Toolbar,
  Menu,
  MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

// For authentication flow reference, see:
// https://github.com/sandrinodimattia/use-auth0-hooks/blob/master/examples/nextjs-spa/pages/_app.js

export default function App({ Component, pageProps }) {
  const { user, loading } = useFetchUser();

  // Handle menu clicks
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Head>
        <title>Rebrew</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <UserProvider value={{ user, loading }}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
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
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
                <MenuItem>
                  <a href="/api/auth/logout">Logout</a>
                </MenuItem>
              </Menu>
              <Typography variant="h6">Rebrew</Typography>
            </Toolbar>
          </AppBar>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </UserProvider>
    </React.Fragment>
  );
}
