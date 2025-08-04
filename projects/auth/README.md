# ngx-security/auth

> OAuth2 Implementation

...in progress

## Installation

```shell script
npm install --save @ngx-security/core @ngx-security/auth
```

## Password Flow

```typescript
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideSecurityCore(),
    provideSecurityAuth({
      passwordFlow: {
        tokenUrl: 'tokenUrl',
        clientId: 'clientId',
        clientSecret: 'clientSecret',
        useHttpBasicAuth: true
      },
      interceptor: {
        whitelistedUrls: [new RegExp('.*/my-api.*')]
      }
    })
  ]
};
```

Call `authenticate` method inside `PasswordFlowService` to obtain access and refresh tokens.

```typescript
import { Component } from '@angular/core';
import { PasswordFlowService } from '@ngx-security/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private passwordFlowService: PasswordFlowService) {
  }

  login(): void {
    this.passwordFlowService
      .authenticate('username', 'password')
      .subscribe(console.log, console.error);
  }
}
```

## Implicit Flow

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideSecurityCore(),
    provideSecurityAuth({
      implicitFlow: {
        loginUrl: 'loginUrl',
        clientId: 'clientId'
      },
      interceptor: {
        whitelistedUrls: [new RegExp('.*/my-api.*')]
      }
    })
  ]
};
```

Call `initialize` method on app component initialization phase to check if authorization state is in URL. Calling `authenticate` method inside `ImplicitFlowService` will redirect user to login page.

```typescript
import { Component, OnInit } from '@angular/core';
import { ImplicitFlowService } from '@ngx-security/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private implicitFlowService: ImplicitFlowService) {
  }

  ngOnInit(): void {
    this.implicitFlowService
      .initialize()
      .subscribe(console.log, console.error);
  }

  login(): void {
    this.implicitFlowService
      .authenticate();
  }
}
```

## Authorization code Flow

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideSecurityCore(),
    provideSecurityAuth({
      authorizationCodeFlow: {
        loginUrl: 'loginUrl',
        tokenUrl: 'tokenUrl',
        clientId: 'clientId',
        clientSecret: 'clientSecret',
        useHttpBasicAuth: true
      },
      interceptor: {
        whitelistedUrls: [new RegExp('.*/my-api.*')]
      }
    })
  ]
};
```

Call `initialize` method on app component initialization phase to check if authorization state is in URL. Calling `authenticate` method inside `AuthorizationCodeFlowService` will redirect user to login page.

```typescript
import { Component, OnInit } from '@angular/core';
import { AuthorizationCodeFlowService } from '@ngx-security/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authorizationCodeFlowService: AuthorizationCodeFlowService) {
  }

  ngOnInit(): void {
    this.authorizationCodeFlowService
      .initialize()
      .subscribe(console.log, console.error);
  }

  login(): void {
    this.authorizationCodeFlowService
      .authenticate();
  }
}
```

## Client credentials flow

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideSecurityCore(),
    provideSecurityAuth({
      clientCredentialsFlow: {
        tokenUrl: 'tokenUrl',
        clientId: 'clientId',
        clientSecret: 'clientSecret',
        useHttpBasicAuth: true
      },
      interceptor: {
        whitelistedUrls: [new RegExp('.*/my-api.*')]
      }
    })
  ]
};
```

Call `authenticate` method inside `ClientCredentialsFlowService` to obtain access tokens.

```typescript
import { Component } from '@angular/core';
import { ClientCredentialsFlowService } from '@ngx-security/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private clientCredentialsFlowService: ClientCredentialsFlowService) {
  }

  login(): void {
    this.clientCredentialsFlowService
      .authenticate()
      .subscribe(console.log, console.error);
  }
}
```

## Clearing state

Each service above has `clear` method which clear app state and persistent storage (session and local). Real implementation of clear method is in `TokenService.clear`.

## Custom token mapper

Add `tokens` configuration at auth provider in your `app.config.ts`:

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideSecurityCore(),
    provideSecurityAuth({
      tokens: {
        mapper: (tokens: any): AuthTokens => {
          tokens = tokens || {};
          return {
            accessToken: tokens['access_token'] || tokens['accessToken'] || null,
            refreshToken: tokens['refresh_token'] || tokens['refreshToken'] || null
          };
        }
      }
    })
  ]
};
```

## Custom subject mapper

Add `subject` configuration at auth provider in your `app.config.ts`:

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideSecurityCore(),
    provideSecurityAuth({
      subject: {
        mapper: (jwt: any): AuthSubject<any> => {
          jwt = jwt || {};
          return {
            principal: jwt['user_name'] || jwt['username'] || jwt['email'] || null,
            authorities: jwt['authorities'] || [],
            details: jwt
          };
        }
      }
    })
  ]
};
```

## Combine with ngx-security/roles and/or ngx-security/permissions

### Install

```shell script
npm install --save @ngx-security/roles
```

or

```shell script
npm install --save @ngx-security/permissions
```

### `@ngx-security/roles` example

#### Import module

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideSecurityCore(),
    provideSecurityAuth(),
    provideSecurityRoles()
  ]
};
```

#### Usage

```html
<p *hasRole="'ROLE_1'">This should see users with ROLE_1</p>
```
