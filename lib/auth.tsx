import { initAuth0 } from '@auth0/nextjs-auth0';

export default initAuth0({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: 'openid profile email',
  redirectUri: 'https://cf1fcf657f3f.ngrok.io/api/auth/callback',
  postLogoutRedirectUri: 'https://cf1fcf657f3f.ngrok.io/',
  session: {
    cookieSecret: 'some-very-very-very-very-very-very-very-very-long-secret', //TODO
    cookieLifetime: 60 * 60 * 8
  }
});