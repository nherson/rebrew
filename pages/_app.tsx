import '../styles/global.css'
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from '../styles/theme';
import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
//import { Auth0Provider } from 'use-auth0-hooks'
import { AuthProvider } from '../components/auth';

// For authentication flow reference, see: 
// https://github.com/sandrinodimattia/use-auth0-hooks/blob/master/examples/nextjs-spa/pages/_app.js

/**
 * Where to send the user after they have signed in.
 */
const onRedirectCallback = appState => {
  if (appState && appState.returnTo) {
    Router.push({
      pathname: appState.returnTo.pathname,
      query: appState.returnTo.query
    })
  }
};

/**
 * When it hasn't been possible to retrieve a new access token.
 * @param {Error} err 
 * @param {AccessTokenRequestOptions} options 
 */
const onAccessTokenError = (err, options) => {
  console.error('Failed to retrieve access token: ', err);
};

/**
 * When signing in fails for some reason, we want to show it here.
 * @param {Error} err 
 */
const onLoginError = (err) => {
  Router.push({
    pathname: '/oops',
    query: {
      message: err.error_description || err.message
    }
  })
};

/**
 * When redirecting to the login page you'll end up in this state where the login page is still loading.
 * You can render a message to show that the user is being redirected.
 */
const onRedirecting = () => {
  return (
    <div>
      <h1>Signing you in</h1>
      <p>
        In order to access this page you will need to sign in.
        Please wait while we redirect you to the login page...
      </p>
    </div>
  );
};

export default function App({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <AuthProvider>

      
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
          </AuthProvider>
    </React.Fragment>
  )
}
  