# React Auth0

Application example built with [React](https://reactjs.org/) 18 with authentication using the [Auth0](https://auth0.com/) service.

This tutorial was posted on my [blog](https://rodrigo.kamada.com.br/blog/autenticacao-usando-o-auth0-em-uma-aplicacao-react) in portuguese and on the [DEV Community](https://dev.to/rodrigokamada/authentication-using-the-auth0-to-an-react-application-3da3) in english.



[![Website](https://shields.braskam.com/v1/shields?name=website&format=rectangle&size=small&radius=5)](https://rodrigo.kamada.com.br)
[![LinkedIn](https://shields.braskam.com/v1/shields?name=linkedin&format=rectangle&size=small&radius=5)](https://www.linkedin.com/in/rodrigokamada)
[![Twitter](https://shields.braskam.com/v1/shields?name=twitter&format=rectangle&size=small&radius=5&socialAccount=rodrigokamada)](https://twitter.com/rodrigokamada)
[![Instagram](https://shields.braskam.com/v1/shields?name=instagram&format=rectangle&size=small&radius=5)](https://www.instagram.com/rodrigokamada)



## Prerequisites


Before you start, you need to install and configure the tools:

* [git](https://git-scm.com/)
* [Node.js and npm](https://nodejs.org/)
* IDE (e.g. [Visual Studio Code](https://code.visualstudio.com/) or [WebStorm](https://www.jetbrains.com/webstorm/))



## Getting started


### Create and configure the account on the Auth0

**1.** Let's create the account. Access the site [https://auth0.com/](https://auth0.com/) and do steps 1 and 9 of the post *[Authentication using the Auth0 to an Angular application](https://github.com/rodrigokamada/angular-auth0)* to create and configure the account on the Auth0.

**2.** In step 7 of the post above, fill in the field *Allowed Callback URLs* with the URL `http://localhost:3000/react-auth0/profile`, fill in the fields *Allowed Logout URLs*, *Allowed Web Origins* with the URL `http://localhost:3000/react-auth0` and click on the button *Save Changes*.



### Create the React application


**1.** Let's create the application with the React base structure using the `create-react-app` tool.

```powershell
npx create-react-app react-auth0 --template typescript

Creating a new React app in /home/rodrigokamada/Development/React/react-auth0.

Installing packages. This might take a couple of minutes.
Installing react, react-dom, and react-scripts with cra-template-typescript...


added 1369 packages in 26s

169 packages are looking for funding
  run `npm fund` for details

Initialized a git repository.

Installing template dependencies using npm...
npm WARN deprecated source-map-resolve@0.6.0: See https://github.com/lydell/source-map-resolve#deprecated

added 38 packages, and changed 1 package in 5s

169 packages are looking for funding
  run `npm fund` for details

We detected TypeScript in your project (src/App.test.tsx) and created a tsconfig.json file for you.

Your tsconfig.json has been populated with default values.

Removing template package using npm...


removed 1 package, and audited 1407 packages in 2s

169 packages are looking for funding
  run `npm fund` for details

8 moderate severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.

Created git commit.

Success! Created react-auth0 at /home/rodrigokamada/Development/React/react-auth0
Inside that directory, you can run several commands:

  npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd react-auth0
  npm start

Happy hacking!
```

**2.** Install and configure the Material UI CSS framework. Do step 2 of the post *[Adding the Material UI CSS framework to an React application](https://github.com/rodrigokamada/react-mui)*.

**3.** Install the `@auth0/auth0-react` and `react-router-dom` libraries.

```powershell
npm install @auth0/auth0-react react-router-dom
```

**4.** Create the `SignIn` component.

```powershell
touch src/SignIn.tsx
```

**5.** Add the lines in the `src/SignIn.tsx` file as below.

```typescript
import { useAuth0 } from '@auth0/auth0-react'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function SignIn() {
  const { loginWithRedirect } = useAuth0();

  return (
    <main style={{ padding: '1rem 0' }}>
      <Grid container>
        <Grid container justifyContent="center">
          <Button variant="contained" onClick={loginWithRedirect}>Sign In</Button>
        </Grid>
      </Grid>
    </main>
  );
}

export default SignIn;
```

**6.** Create the `Profile` component.

```powershell
touch src/Profile.tsx
```

**7.** Add the lines in the `src/Profile.tsx` file as below.

```typescript
import { useAuth0 } from '@auth0/auth0-react'
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

function Profile() {
  const { isAuthenticated, user } = useAuth0();

  return (
    <main style={{ padding: '1rem 0' }}>
      {isAuthenticated &&
      <Grid container>
        <Grid container justifyContent="center">
          <Grid sx={{ m: 1 }}>
            <Avatar alt={user?.email} src={user?.picture} sx={{ width: 75, height: 75 }} />
          </Grid>
          <Grid item xs={12} sx={{ m: 1 }}>
            <TextField id="email" label="Email" value={user?.email} variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12} sx={{ m: 1 }}>
            <TextField id="nickname" label="Nickname" value={user?.nickname} variant="outlined" fullWidth />
          </Grid>
        </Grid>
      </Grid>
      }
    </main>
  );
}

export default Profile;
```

**8.** Change the `src/index.tsx` file. Import the `Auth0Provider` component and configure the parameter `domain` with the Auth0 domain and the parameter `clientId` with the Auth0 Client ID as below.

```typescript
import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-5tf99p7c.us.auth0.com"
      clientId="GBPB42qhMWCtvrwGmYxvm5cbHXU68nzG"
      redirectUri={window.location.origin + '/react-auth0/profile'}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

**9.** Change the `src/App.tsx` file. Add the menu and the routes in the `src/Profile.tsx` file as below.

```typescript
import React from 'react';
import { BrowserRouter, Link as RouterLink, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Profile from './Profile';
import SignIn from './SignIn';
import './App.css';

function App() {
  const { isAuthenticated, logout } = useAuth0();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Container maxWidth="xl" sx={{ p: '0px !important' }}>
      <BrowserRouter basename="/react-auth0">
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
              >
                React Auth0
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  <MenuItem onClick={(e) => {
                      e.preventDefault();
                      window.location.href = 'https://rodrigokamada.github.io/angular-auth0/';
                    }}
                  >
                    <Typography textAlign="center">
                      <Button>Angular Application</Button>
                    </Typography>
                  </MenuItem>
                  {!isAuthenticated &&
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Button component={RouterLink} to="/signIn">Sign In</Button>
                    </Typography>
                  </MenuItem>
                  }
                  {isAuthenticated &&
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Button component={RouterLink} to="/profile">Profile</Button>
                    </Typography>
                  </MenuItem>
                  }
                  {isAuthenticated &&
                  <MenuItem onClick={() => {
                      handleCloseNavMenu();
                      logout({ returnTo: window.location.origin + '/react-auth0' });
                    }}
                  >
                    <Typography textAlign="center">
                      <Button >Sign Out</Button>
                    </Typography>
                  </MenuItem>
                  }
                </Menu>
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
              >
                React Auth0
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'https://rodrigokamada.github.io/angular-auth0/';
                  }}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Angular Application
                </Button>
                {!isAuthenticated &&
                <Button
                  component={RouterLink}
                  to="/signIn"
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Sign In
                </Button>
                }
                {isAuthenticated &&
                <Button
                  component={RouterLink}
                  to="/profile"
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Profile
                </Button>
                }
                {isAuthenticated &&
                <Button
                  onClick={() => {
                    logout({ returnTo: window.location.origin + '/react-auth0' });
                  }}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Sign Out
                </Button>
                }
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="*" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
```

**10.** Run the application with the command below.

```powershell
npm start

Compiled successfully!

You can now view react-auth0 in the browser.

  http://localhost:3000/react-auth0

Note that the development build is not optimized.
To create a production build, use npm run build.

assets by path static/js/*.js 2.79 MiB
  asset static/js/bundle.js 2.79 MiB [emitted] (name: main) 1 related asset
  asset static/js/node_modules_web-vitals_dist_web-vitals_js.chunk.js 6.93 KiB [emitted] 1 related asset
asset index.html 1.74 KiB [emitted]
asset asset-manifest.json 518 bytes [emitted]
cached modules 2.66 MiB (javascript) 32.5 KiB (runtime) [cached] 602 modules
webpack 5.69.1 compiled successfully in 1275 ms
```

**11.** Ready! Access the URL `http://localhost:300/react-auth0` and check if the application is working. See the application working on [GitHub Pages](https://rodrigokamada.github.io/react-auth0/) and [Stackblitz](https://stackblitz.com/edit/react18-auth0).

![React Auth0](https://res.cloudinary.com/rodrigokamada/image/upload/v1645713765/Blog/react-auth0/react-auth0.png)



### Testing the application sign in

**1.** Let's test the application sign in. Access the URL `http://localhost:3000/react-auth0` and click on the button *Sign in*.

![Application - Sign in](https://res.cloudinary.com/rodrigokamada/image/upload/v1645714984/Blog/react-auth0/application-step1.png)

**2.** Click on the button *Sign up*.

![Application - Log in](https://res.cloudinary.com/rodrigokamada/image/upload/v1645722889/Blog/react-auth0/application-step2.png)

**3.** Fill in the fields *Email Address*, *Password* and click on the button *Continue*.

![Application - Sign up](https://res.cloudinary.com/rodrigokamada/image/upload/v1645722889/Blog/react-auth0/application-step3.png)

**4.** Click on the button *Accept*.

![Application - Authorize app](https://res.cloudinary.com/rodrigokamada/image/upload/v1646131163/Blog/react-auth0/application-step4.png)

**5.** You will be redirected to the application.

![Application - Profile](https://res.cloudinary.com/rodrigokamada/image/upload/v1646010451/Blog/react-auth0/application-step5.png)

**6.** Check the registered email.

![Application - Verify your account](https://res.cloudinary.com/rodrigokamada/image/upload/v1646010304/Blog/react-auth0/application-step6.png)

**7.** Ready! We test the application sign in and profile view. Auth0 documentation is available at [https://auth0.com/docs](https://auth0.com/docs).



## Cloning the application

**1.** Clone the repository.

```shell
git clone git@github.com:rodrigokamada/react-auth0.git
```

**2.** Install the dependencies.

```shell
npm ci
```

**3.** Run the application.

```shell
npm start
```
