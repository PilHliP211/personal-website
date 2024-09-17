console.log('executing')
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import { OAuth2Client } from 'google-auth-library';

const CLIENT_ID = process.env['GPHOTOS_CLIENT_ID']
const CLIENT_SECRET = process.env['GPHOTOS_CLIENT_SECRET']
const REDIRECT_URI = process.env['GPHOTOS_REDIRECT_URI']
// Configure OAuth client
const oauth2Client = new OAuth2Client(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
const user = 'pilhlip';

export function app(): express.Express {
  console.log('loading')
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // OAuth endpoint
  server.get('/auth/google', (req, res) => {
    console.log('here')
    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/photoslibrary.readonly']
    });
    res.redirect(url);
  });

  server.get('/auth/google/callback', async (req, res) => {
    const { code } = req.query;
    try {
      const { tokens } = await oauth2Client.getToken(code as string);
      oauth2Client.setCredentials(tokens);
      // await saveToken(tokens);
      // Here you can handle the tokens, e.g., save them to a database
      res.send('Authentication successful!');
    } catch (error) {
      console.error('Error authenticating:', error);
      res.status(500).send('Authentication failed');
    }
  });

  // Serve static files from /browser
  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();