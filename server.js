// This file is used as the main entrypoint in a production environment,
// and allows the heroku app to force redirection to HTTPS. Not needed in
// local and development environments

// Real MVP: https://medium.com/@tpae/enabling-ssl-https-on-next-js-with-heroku-55d0c6ce8516
const next = require("next");
const express = require("express");
const sslRedirect = require("heroku-ssl-redirect");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

var proc = require('process')
proc.on('SIGINT', () => {
  console.info("Interrupted")
  proc.exit(0)
})

app.prepare().then(() => {
  const server = express();

  // redirect to SSL
  if (process.env.NODE_ENV === "production") {
    server.use(sslRedirect());
  }
  
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
