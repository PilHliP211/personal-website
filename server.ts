import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

const CLIENT_ID = process.env['GPHOTOS_CLIENT_ID'];
const CLIENT_SECRET = process.env['GPHOTOS_CLIENT_SECRET'];
const REDIRECT_URI = process.env['GPHOTOS_REDIRECT_URI'];

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
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

  server.get('/auth', (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',  // Get refresh token
      scope: ['https://www.googleapis.com/auth/photoslibrary.readonly'],  // Google Photos scope
    });
    res.redirect(authUrl);
  });

  server.get('/oauth2callback', async (req, res) => {
    const code = req.query['code'] as string;
  
    if (!code) {
      return res.status(400).send('Missing authorization code');
    }
  
    try {
      // Exchange the authorization code for tokens
      const { tokens } = await oAuth2Client.getToken(code);
      oAuth2Client.setCredentials(tokens);
  
      // Store tokens in session or database if needed
      console.log('Access Token:', tokens.access_token);
      console.log('Refresh Token:', tokens.refresh_token);
  
      // Redirect or notify user authentication was successful
      res.send('Authentication successful! You can now make API requests.');
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      res.status(500).send('Error during authentication');
    }
  });
  server.get('/albums', async (req, res) => {
    if (!oAuth2Client.credentials.access_token) {
      return res.status(401).send('User is not authenticated');
    }
  
    try {
      const result = await axios.get('https://photoslibrary.googleapis.com/v1/albums', {
        headers: {
          Authorization: `Bearer ${oAuth2Client.credentials.access_token}`,
        },
      });
  
      // Send albums back to client
      res.json(result.data.albums);
    } catch (error) {
      console.error('Error fetching albums:', error);
      res.status(500).send('Error fetching albums');
    }
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
