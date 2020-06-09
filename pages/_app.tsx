import '../styles/global.css'
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from '../styles/theme';
import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { UserProvider, useFetchUser } from '../lib/user';

// For authentication flow reference, see: 
// https://github.com/sandrinodimattia/use-auth0-hooks/blob/master/examples/nextjs-spa/pages/_app.js


export default function App({ Component, pageProps }) {
  const { user, loading } = useFetchUser()

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <UserProvider value={{ user, loading }}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UserProvider>
    </React.Fragment>
  )
}
  