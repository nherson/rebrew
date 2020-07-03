import "../styles/global.css";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from "../styles/theme";
import React from "react";
import Link from "next/link";
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

export default function App({ Component, pageProps }) {
  const { user, loading } = useFetchUser();

  return (
    <React.Fragment>
      <UserProvider value={{ user, loading }}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Head>
            <title>Rebrew</title>
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </UserProvider>
    </React.Fragment>
  );
}
