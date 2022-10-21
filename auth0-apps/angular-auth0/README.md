# Angular Auth0


Application example built with [Angular](https://angular.io/) 14 with authentication using the [Auth0](https://auth0.com/) service.

This tutorial was posted on my [blog](https://rodrigo.kamada.com.br/blog/autenticacao-usando-o-auth0-em-uma-aplicacao-angular) in portuguese and on the [DEV Community](https://dev.to/rodrigokamada/authentication-using-the-auth0-to-an-angular-application-eg0) in english.



[![Website](https://shields.braskam.com/v1/shields?name=website&format=rectangle&size=small&radius=5)](https://rodrigo.kamada.com.br)
[![LinkedIn](https://shields.braskam.com/v1/shields?name=linkedin&format=rectangle&size=small&radius=5)](https://www.linkedin.com/in/rodrigokamada)
[![Twitter](https://shields.braskam.com/v1/shields?name=twitter&format=rectangle&size=small&radius=5&socialAccount=rodrigokamada)](https://twitter.com/rodrigokamada)
[![Instagram](https://shields.braskam.com/v1/shields?name=instagram&format=rectangle&size=small&radius=5)](https://www.instagram.com/rodrigokamada)



## Prerequisites


Before you start, you need to install and configure the tools:

* [git](https://git-scm.com/)
* [Node.js and npm](https://nodejs.org/)
* [Angular CLI](https://angular.io/cli)
* IDE (e.g. [Visual Studio Code](https://code.visualstudio.com/))



## Getting started


### Create and configure the account on the Auth0

**1.** Let's create the account. Access the site [https://auth0.com/](https://auth0.com/) and click on the button *Sign up*.

![Auth0 - Home page](https://res.cloudinary.com/rodrigokamada/image/upload/v1636840196/Blog/angular-auth0/auth0-step1.png)

**2.** Fill in the field *Email* and click on the button *SIGN UP*.

![Auth0 - Sign up](https://res.cloudinary.com/rodrigokamada/image/upload/v1636841731/Blog/angular-auth0/auth0-step2.png)

**3.** Fill in the fields *Email*, *Password* and click on the button *Continue*.

![Auth0 - Create your account](https://res.cloudinary.com/rodrigokamada/image/upload/v1636912668/Blog/angular-auth0/auth0-step3.png)

**4.** Click on the option *Personal* and click on the button *NEXT*.

![Auth0 - Account type](https://res.cloudinary.com/rodrigokamada/image/upload/v1636998382/Blog/angular-auth0/auth0-step4.png)

**5.** Let's create the application. Click on the menu *Applications* and click on the menu *Applications*.

![Auth0 - Getting started](https://res.cloudinary.com/rodrigokamada/image/upload/v1636998429/Blog/angular-auth0/auth0-step5.png)

**6.** Click on the link with the application name.

![Auth0 - Applications](https://res.cloudinary.com/rodrigokamada/image/upload/v1636998431/Blog/angular-auth0/auth0-step6.png)

**7.** Copy the domain that has been generated, in my case, the domain `dev-5tf99p7c.us.auth0.com` was copied, copy the *Client ID* that has been generated, in my case, the *Client ID* `GBPB42qhMWCtvrwGmYxvm5cbHXU68nzG` was copied, select the option *Single Page Application* in the field *Application Type*, fill in the fields *Allowed Callback URLs*, *Allowed Logout URLs*, *Allowed Web Origins* and click on the button *Save Changes*.

![Auth0 - Applications settings](https://res.cloudinary.com/rodrigokamada/image/upload/v1636998434/Blog/angular-auth0/auth0-step7.png)

**8.** Check the registered email.

![Auth0 - Verify your account](https://res.cloudinary.com/rodrigokamada/image/upload/v1636998436/Blog/angular-auth0/auth0-step8.png)

**9.** Ready! Account created and application configured.



### Create the Angular application


**1.** Let's create the application with the Angular base structure using the `@angular/cli` with the route file and the SCSS style format.

```powershell
ng new angular-auth0 --routing true --style scss
CREATE angular-auth0/README.md (1058 bytes)
CREATE angular-auth0/.editorconfig (274 bytes)
CREATE angular-auth0/.gitignore (620 bytes)
CREATE angular-auth0/angular.json (3249 bytes)
CREATE angular-auth0/package.json (1077 bytes)
CREATE angular-auth0/tsconfig.json (863 bytes)
CREATE angular-auth0/.browserslistrc (600 bytes)
CREATE angular-auth0/karma.conf.js (1430 bytes)
CREATE angular-auth0/tsconfig.app.json (287 bytes)
CREATE angular-auth0/tsconfig.spec.json (333 bytes)
CREATE angular-auth0/src/favicon.ico (948 bytes)
CREATE angular-auth0/src/index.html (298 bytes)
CREATE angular-auth0/src/main.ts (372 bytes)
CREATE angular-auth0/src/polyfills.ts (2338 bytes)
CREATE angular-auth0/src/styles.scss (80 bytes)
CREATE angular-auth0/src/test.ts (745 bytes)
CREATE angular-auth0/src/assets/.gitkeep (0 bytes)
CREATE angular-auth0/src/environments/environment.prod.ts (51 bytes)
CREATE angular-auth0/src/environments/environment.ts (658 bytes)
CREATE angular-auth0/src/app/app-routing.module.ts (245 bytes)
CREATE angular-auth0/src/app/app.module.ts (393 bytes)
CREATE angular-auth0/src/app/app.component.scss (0 bytes)
CREATE angular-auth0/src/app/app.component.html (23364 bytes)
CREATE angular-auth0/src/app/app.component.spec.ts (1094 bytes)
CREATE angular-auth0/src/app/app.component.ts (218 bytes)
✔ Packages installed successfully.
    Successfully initialized git.
```

**2.** Install and configure the Bootstrap CSS framework. Do steps 2 and 3 of the post *[Adding the Bootstrap CSS framework to an Angular application](https://github.com/rodrigokamada/angular-bootstrap)*.

**3.** Configure the variable `auth0.domain` with the Auth0 domain and the variable `auth0.clientId` with the Auth0 Client ID in the `src/environments/environment.ts` and `src/environments/environment.prod.ts` files as below.

```typescript
auth0: {
  domain: 'dev-5tf99p7c.us.auth0.com',
  clientId: 'GBPB42qhMWCtvrwGmYxvm5cbHXU68nzG',
  redirectUri: 'http://localhost:4200/profile',
},
```

**4.** Install the `@auth0/auth0-angular` library.

```powershell
npm install @auth0/auth0-angular
```

**5.** Create the `SignInComponent` component.

```powershell
ng generate component sign-in --skip-tests=true
CREATE src/app/sign-in/sign-in.component.scss (0 bytes)
CREATE src/app/sign-in/sign-in.component.html (22 bytes)
CREATE src/app/sign-in/sign-in.component.ts (279 bytes)
UPDATE src/app/app.module.ts (477 bytes)
```

**6.** Change the `src/app/sign-in/sign-in.component.ts` file. Import the `Router` service and create the `signIn` method as below.

```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {

  constructor(private router: Router) {
  }

  public signIn(): void {
    this.router.navigate(['/profile']);
  }

}
```

**7.** Change the `src/app/sign-in/sign-in.component.html` file. Add the lines as below.

```html
<div class="row justify-content-center my-5">
  <div class="col-4">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col d-grid">
            <button type="button" (click)="signIn()" class="btn btn-sm btn-success">
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

**8.** Create the `ProfileComponent` component.

```powershell
ng generate component profile --skip-tests=true
CREATE src/app/profile/profile.component.scss (0 bytes)
CREATE src/app/profile/profile.component.html (22 bytes)
CREATE src/app/profile/profile.component.ts (280 bytes)
UPDATE src/app/app.module.ts (710 bytes)
```

**9.** Change the `src/app/profile/profile.component.ts` file. Import the `AuthService` service and add the lines as below.

```typescript
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  user: any;

  constructor(private authService: AuthService) {
    this.user = {};
  }

  public ngOnInit(): void {
    this.authService.user$.subscribe((success: any) => {
      this.user = success;
    });
  }

}
```

**10.** Change the `src/app/profile/profile.component.html` file and add the lines as below.

```html
<div class="row justify-content-center my-5">
  <div class="col-4">
    <div class="row" *ngIf="user.picture">
      <div class="col mb-2 text-center">
        <img [src]="user.picture" class="rounded-circle w-25">
      </div>
    </div>
    <div class="row">
      <div class="col mb-2">
        <label for="email" class="form-label">Email:</label>
        <input type="email" id="email" name="email" #email="ngModel" [ngModel]="user.email" class="form-control form-control-sm">
      </div>
    </div>
    <div class="row">
      <div class="col mb-2">
        <label for="nickname" class="form-label">Nickname:</label>
        <input type="text" id="nickname" name="nickname" #nickname="ngModel" [(ngModel)]="user.nickname" class="form-control form-control-sm">
      </div>
    </div>
  </div>
</div>
```

**11.** Change the `src/app/app.component.ts` file. Import the `AuthService` service and create the `signOut` method as below.

```typescript
import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  isAuthenticated: boolean;

  constructor(@Inject(DOCUMENT) private document: Document,
              private authService: AuthService) {
    this.isAuthenticated = false;
  }

  public ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((success: boolean) => {
      this.isAuthenticated = success;
    });
  }

  public signOut(): void {
    this.authService.logout({
      returnTo: this.document.location.origin,
    });
  }

}
```

**12.** Change the `src/app/app.component.html` file and add the menu as below.

```html
<nav class="navbar navbar-expand-sm navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Angular Auth0</a>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div id="navbarContent" class="collapse navbar-collapse">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" routerLink="/signIn" routerLinkActive="active" *ngIf="!isAuthenticated">Sign in</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/profile" routerLinkActive="active" *ngIf="isAuthenticated">Profile</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="" (click)="signOut()" *ngIf="isAuthenticated">Sign out</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<router-outlet></router-outlet>
```

**13.** Change the `src/app/app-routing.module.ts` file and add the routes as below.

```typescript
import { AuthGuard } from '@auth0/auth0-angular';

import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signIn',
    pathMatch: 'full',
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'signIn',
    component: SignInComponent,
  },
  {
    path: '**',
    redirectTo: 'signIn',
  },
];
```

**14.** Change the `src/app/app.module.ts` file. Import the `FormsModule` and `AuthModule` modules, the `ProfileComponent` and `SignInComponent` components and configure the `AuthModule` module as below.

```typescript
import { FormsModule } from '@angular/forms';
import { AuthModule } from '@auth0/auth0-angular';

import { environment } from '../environments/environment';

import { SignInComponent } from './sign-in/sign-in.component';
import { ProfileComponent } from './profile/profile.component';

declarations: [
  AppComponent,
  SignInComponent,
  ProfileComponent
],
imports: [
  BrowserModule,
  FormsModule,
  AuthModule.forRoot(environment.auth0),
  AppRoutingModule
],
```

**15.** Run the application with the command below.

```powershell
npm start

> angular-auth0@1.0.0 start
> ng serve

✔ Browser application bundle generation complete.

Initial Chunk Files   | Names         |      Size
vendor.js             | vendor        |   2.57 MB
styles.css, styles.js | styles        | 486.69 kB
polyfills.js          | polyfills     | 339.08 kB
scripts.js            | scripts       |  76.33 kB
main.js               | main          |  23.11 kB
runtime.js            | runtime       |   6.86 kB

                      | Initial Total |   3.48 MB

Build at: 2021-11-15T13:21:02.234Z - Hash: 6dbd594c55acc213 - Time: 11172ms

** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **


✔ Compiled successfully.
```

**16.** Ready! Access the URL `http://localhost:4200/` and check if the application is working. See the application working on [GitHub Pages](https://rodrigokamada.github.io/angular-auth0/) and [Stackblitz](https://stackblitz.com/edit/angular14-auth0).

![Angular Auth0](https://res.cloudinary.com/rodrigokamada/image/upload/v1636984020/Blog/angular-auth0/angular-auth0.png)



### Testing the application sign in

**1.** Let's test the application sign in. Access the URL `http://localhost:4200/` and click on the button *Sign in*.

![Application - Sign in](https://res.cloudinary.com/rodrigokamada/image/upload/v1636984337/Blog/angular-auth0/application-step1.png)

**2.** Click on the button *Sign up*.

![Application - Log in](https://res.cloudinary.com/rodrigokamada/image/upload/v1636984674/Blog/angular-auth0/application-step2.png)

**3.** Fill in the fields *Email Address*, *Password* and click on the button *Continue*.

![Application - Sign up](https://res.cloudinary.com/rodrigokamada/image/upload/v1636985147/Blog/angular-auth0/application-step3.png)

**4.** Click on the button *Accept*.

![Application - Authorize app](https://res.cloudinary.com/rodrigokamada/image/upload/v1636988414/Blog/angular-auth0/application-step4.png)

**5.** You will be redirected to the application.

![Application - Profile](https://res.cloudinary.com/rodrigokamada/image/upload/v1636996011/Blog/angular-auth0/application-step5.png)

**6.** Check the registered email.

![Application - Verify your account](https://res.cloudinary.com/rodrigokamada/image/upload/v1636999603/Blog/angular-auth0/application-step6.png)

**7.** Ready! We test the application sign in and profile view. Auth0 documentation is available at [https://auth0.com/docs](https://auth0.com/docs).



## Cloning the application

**1.** Clone the repository.

```powershell
git clone git@github.com:rodrigokamada/angular-auth0.git
```

**2.** Install the dependencies.

```powershell
npm ci
```

**3.** Run the application.

```powershell
npm start
```
