const express = require('express');
const next = require('next');

const port = process.env.PORT || 3000;
const host = '0.0.0.0'; // Important for external access

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Optional: custom routes
  // server.get('/custom', (req, res) => {
  //   return app.render(req, res, '/custom');
  // });

  // Default handler for everything else
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, host, () => {
    console.log(`🚀 Server ready on http://${host}:${port}`);
  });
});