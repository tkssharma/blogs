# Next.js and Auth0 Example

This example shows how you can use [`@auth0/nextjs-auth0`](https://github.com/auth0/nextjs-auth0) to easily add authentication support to your Next.js application.

## Configuring Auth0

Go to the [Auth0 dashboard](https://manage.auth0.com/) and create a new application of type *Web Application* and make sure to configure the following:

 - *Allowed Callback URLs*: Should be set to `http://localhost:3000/api/callback` when testing locally or typically to `https://myapp.com/api/callback` when deploying your application.
 - *Allowed Logout URLs*: Should be set to `http://localhost:3000/` when testing locally or typically to `https://myapp.com/` when deploying your application.

### Configuring Next.js

In the Next.js configuration file (`next.config.js`) you'll see that different environment variables are being loaded in the server runtime configuration. 

### Local Development

For local development you'll just want to create a `.env` file with the necessary settings:

```
AUTH0_DOMAIN=YOUR_AUTH0_DOMAIN
AUTH0_CLIENT_ID=YOUR_AUTH0_CLIENT_ID
AUTH0_CLIENT_SECRET=YOUR_AUTH0_CLIENT_SECRET
REDIRECT_URI=http://localhost:3000/api/callback
POST_LOGOUT_REDIRECT_URI=http://localhost:3000/
SESSION_COOKIE_SECRET=viloxyf_z2GW6K4CT-KQD_MoLEA2wqv5jWuq4Jd0P7ymgG5GJGMpvMneXZzhK3sL (at least 32 characters, used to encrypt the cookie)
```

### Hosting in Now.sh

When deploying this example to Now.sh you'll want to update the `now.json` configuration file:

```json
{
  "build": {
    "env": {
      "AUTH0_DOMAIN": "YOUR_AUTH0_DOMAIN",
      "AUTH0_CLIENT_ID": "YOUR_AUTH0_CLIENT_ID",
      "AUTH0_CLIENT_SECRET": "@auth0_client_secret",
      "REDIRECT_URI": "https://my-website.now.sh/api/callback",
      "POST_LOGOUT_REDIRECT_URI": "https://my-website.now.sh/",
      "SESSION_COOKIE_SECRET": "@session_cookie_secret",
      "SESSION_COOKIE_LIFETIME": 7200
    }
  }
}
```

Some of these values are settings and can just be added to your repository if you want. Others are actual secrets and need to be created as such using the `now` CLI:

```bash
now secrets add auth0_client_secret YOUR_AUTH0_CLIENT_SECRET
now secrets add session_cookie_secret viloxyf_z2GW6K4CT-KQD_MoLEA2wqv5jWuq4Jd0P7ymgG5GJGMpvMneXZzhK3sL
```

## About this sample

This sample tries to cover a few topics:

 - Signing in
 - Signing out
 - Registration
 - Loading the user on the server side and adding it as part of SSR (`/pages/profile.js`)
 - Loading the user on the client side and using fast/cached SSR pages (`/pages/index.js`)
 - API Routes which can load the current user (`/pages/api/me.js`)
 - Using hooks to make the user available throughout the application (`/lib//user.js`)

## Scenarios

### User Registration

When the user is not signed in you'll see a Register and a Login link:

```js
<li>
  <a href='/api/register'>Register</a>
</li>
<li>
  <a href='/api/login'>Login</a>
</li>
```

The Register link redirects to the `/api/register` API route calling the login handler and passing a custom parameter which sets `prompt=signup`.

```js
import auth0 from '../../lib/auth0';

export default async function register(req, res) {
  try {
    await auth0.handleLogin(req, res, {
      authParams: {
        initialScreen: 'signup'
      }
    });
  } catch(error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
}
```

This parameter is then exposed to the Auth0 login page which can be used to show the signup tab. Note that this only works for the "Classic" experience today. In order to change to the signup tab when this parameter is sent, you'll need to modify the Login page in Auth0 and add the `initialScreen`:

```js
var lock = new Auth0Lock(config.clientID, config.auth0Domain, {
  ...
  initialScreen: (config.extraParams.initialScreen === 'signup' && 'signUp') || 'login',
  ...
});
```