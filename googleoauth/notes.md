1. What is OAuth 2.0?

 OAuth 2.0 is a standard to **allow apps to access user data from other services** (like Google) without needing the user’s password.
 The flow works like this:

  1. User clicks **Login with Google**
  2. Google asks user to give permission
  3. If user agrees, Google sends a **code** to your app
  4. Your app exchanges the **code** for an **access token**
  5. You can now call Google APIs using the **access token**

2. Tools & Libraries We Used

| Node.js        | JavaScript runtime for server                     
| Express        | Framework to create server & routes easily        
| dotenv         | Load environment variables from `.env`            
| simple-oauth2  | Handle OAuth 2.0 token requests and authorization 
| axios          | Make HTTP requests to Google APIs                 

3. Project Setup

### 3.1 Install Node.js and npm

* Make sure Node.js is installed:

  ```bash
  node -v
  npm -v
  ```

### 3.2 Initialize Project

```bash
mkdir google-oauth
cd google-oauth
npm init -y
```

### 3.3 Install Dependencies

```bash
npm install express dotenv simple-oauth2@4.2.0 axios
```

> **Note:** We use `simple-oauth2@4.2.0` because the latest versions have breaking changes.

---

## **4. Setup Google Cloud**

1. Go to [Google Cloud Console → APIs & Services → Credentials](https://console.cloud.google.com/apis/credentials)
2. Create a **OAuth 2.0 Client ID**
3. Set **Authorized redirect URI** exactly:

```
http://localhost:3000/oauth/callback
```

4. Copy `CLIENT_ID` and `CLIENT_SECRET`

5. Set your OAuth consent screen (Testing mode is fine for now) and add yourself as a **Test User**

---

5. .env File

Create `.env` in project root:

```
GOOGLE_ID=your_client_id_here
GOOGLE_SECRET=your_client_secret_here
REDIRECT_URI=http://localhost:3000/oauth/callback
PORT=3000
```

Important:
>
> * No trailing spaces or mismatched quotes
> * `.env` must be added to `.gitignore` so secrets are not uploaded to GitHub

---

6. Server Code (`google-oauth.js`)

### 6.1 Load Libraries

```js
require('dotenv').config();
const express = require('express');
const { AuthorizationCode } = require('simple-oauth2');
const axios = require('axios');
```

### 6.2 Configure OAuth Client

```js
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
```

* `authorizeHost` + `authorizePath` → Google login page
* `tokenHost` + `tokenPath` → Where we exchange code for token

---

### 6.3 Create Express Server

```js
const app = express();
const port = process.env.PORT || 3000;
```

---

### 6.4 Route 1: Redirect User to Google

```js
app.get('/login', (req, res) => {
  const authUrl = client.authorizeURL({
    redirect_uri: process.env.REDIRECT_URI,
    scope: 'openid profile email',
    access_type: 'offline',
    prompt: 'consent'
  });

  res.redirect(authUrl);
});
```

* `scope` → tells Google what info you want (email, name, etc.)
* `access_type: offline` → allows refresh tokens for long-term access
* `prompt: consent` → forces user to select account each time

---

### 6.5 Route 2: Handle Callback

```js
app.get('/oauth/callback', async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).send('Missing code');

  try {
    const tokenParams = { code, redirect_uri: process.env.REDIRECT_URI };
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
```

* `code` → received from Google
* `getToken()` → exchanges code for access token
* `axios` → fetch user info from Google APIs
* Finally, we return user info as JSON

6.6 Start Server

```js
app.listen(port, () => console.log(`Open http://localhost:${port}/login`));
```

* Go to `/login` in browser → redirects to Google
* After login, Google redirects to `/oauth/callback` → shows your info

7. Key Points / Tips

1. **Redirect URI must match exactly**

   * `http` vs `https`, `localhost` vs `127.0.0.1`, port, path, trailing slash

2. **Never push `.env` to GitHub**

   * Use `.gitignore`

3. **Scopes control what info you can get**

   * `openid email profile` is enough for basic login

4. **Access tokens expire**

   * `access_type: offline` allows refresh tokens

5. **Error handling**

   * Always check for missing code or token exchange errors


8. How to Run

```bash
node google-oauth.js
```
Open browser: [http://localhost:3000/login](http://localhost:3000/login)
Login with Google
You’ll see JSON response with your info

9. Next Steps / Learning

1. Store user info in a database
2. Implement sessions or JWT for persistent login
3. Build a dashboard using the user info
4. Explore more Google APIs (Drive, Calendar, YouTube, etc.)

This project now demonstrates:

* OAuth 2.0 login flow
* Node.js + Express server
* API request with tokens
* Secure environment variables
* Handling callbacks and access tokens
