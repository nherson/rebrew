import "../styles/global.css";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from "../styles/theme";
import React from "react";
import Link from "next/link";
import Head from "next/head";
import Layout from "../components/layout";
import { UserProvider } from "@auth0/nextjs-auth0";

export default function App({ Component, pageProps }) {
  const { user } = pageProps;

  return (
    <React.Fragment>
      <UserProvider user={user}>
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
