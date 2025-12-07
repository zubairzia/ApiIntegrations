// google-oauth.js
require('dotenv').config();
const express = require('express');
const { AuthorizationCode } = require('simple-oauth2');
const axios = require('axios');

const client = new AuthorizationCode({
  client: {
    id: process.env.GOOGLE_ID,
    secret: process.env.GOOGLE_SECRET
  },
  auth: {
    authorizeHost: 'https://accounts.google.com',
    authorizePath: '/o/oauth2/v2/auth',
    tokenHost: 'https://oauth2.googleapis.com',
    tokenPath: '/token'
  }
});

const app = express();
const port = process.env.PORT || 3000;

// 1) Google login redirect
app.get('/login', (req, res) => {
  const authUrl = client.authorizeURL({
    redirect_uri: process.env.REDIRECT_URI,
    scope: 'openid profile email',
    access_type: 'offline',
    prompt: 'consent'
  });

  res.redirect(authUrl);
});

// 2) Google callback
app.get('/oauth/callback', async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).send('Missing code');

  try {
    const tokenParams = {
      code,
      redirect_uri: process.env.REDIRECT_URI
    };

    const accessToken = await client.getToken(tokenParams);

    const api = axios.create({
      baseURL: 'https://www.googleapis.com',
      headers: { Authorization: `Bearer ${accessToken.token.access_token}` }
    });

    const { data } = await api.get('/oauth2/v2/userinfo');
    res.json(data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send('OAuth failed');
  }
});

app.listen(port, () => console.log(`Open http://localhost:${port}/login`));
