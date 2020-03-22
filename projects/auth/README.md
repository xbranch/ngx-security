# ngx-security/auth

> OAuth2 Implementation

...in progress

## Password Flow

Include `SecurityAuthModule` into `AppModule` and provide configuration for password-flow, tokens and http-interceptor.

```typescript
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SecurityAuthModule } from '@ngx-security/auth';

import { AppComponent } from './app.component';

@NgModule({
    imports: [
        HttpClientModule,
        SecurityAuthModule.forRoot({
            passwordFlow: {
                tokenUrl: 'tokenUrl',
                clientId: 'clientId',
                clientSecret: 'clientSecret',
                useHttpBasicAuth: true
            },  
            tokens: {
                tokenUrl: 'tokenUrl',
                clientId: 'clientId',
                clientSecret: 'clientSecret',
                useHttpBasicAuth: true
            },
            interceptor: {
                whitelistedUrls: [new RegExp('.*/my-api.*')]
            }
        })
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```

Call `authenticate` method inside `PasswordFlowAuthService` to obtain access and refresh tokens.

```typescript
import { Component } from '@angular/core';
import { PasswordFlowAuthService } from '@ngx-security/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private passwordFlowAuthService: PasswordFlowAuthService) {
    }

    login(): void {
        this.passwordFlowAuthService
            .authenticate('username', 'password')
            .subscribe(console.log, console.error);
    }
}
```

## Implicit Flow

Include `SecurityAuthModule` into `AppModule` and provide configuration for implicit-flow and http-interceptor.

```typescript
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SecurityAuthModule } from '@ngx-security/auth';

import { AppComponent } from './app.component';

@NgModule({
    imports: [
        HttpClientModule,
        SecurityAuthModule.forRoot({
             implicitFlow: {
                 loginUrl: 'loginUrl',
                 clientId: 'clientId'
             },
            interceptor: {
                whitelistedUrls: [new RegExp('.*/my-api.*')]
            }
        })
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```

Call `initialize` method on app component initialization phase to check if authorization state is in URL. Calling `authenticate` method inside `ImplicitFlowAuthService` will redirect user to login page.

```typescript
import { Component, OnInit } from '@angular/core';
import { ImplicitFlowAuthService } from '@ngx-security/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor( private implicitFlowAuthService: ImplicitFlowAuthService) {
    }

    ngOnInit(): void {
        this.implicitFlowAuthService
            .initialize()
            .subscribe(console.log, console.error);
    }
    
    login(): void {
        this.implicitFlowAuthService.authenticate();
    }
}
```

## Authorization code Flow

Include `SecurityAuthModule` into `AppModule` and provide configuration for authorization-code-flow, tokens and http-interceptor.

```typescript
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SecurityAuthModule } from '@ngx-security/auth';

import { AppComponent } from './app.component';

@NgModule({
    imports: [
        HttpClientModule,
        SecurityAuthModule.forRoot({
            authorizationCodeFlow: {
                loginUrl: 'loginUrl',
                clientId: 'clientId'
            },
            tokens: {
                tokenUrl: 'tokenUrl',
                clientId: 'clientId',
                clientSecret: 'clientSecret',
                useHttpBasicAuth: true
            },
            interceptor: {
                whitelistedUrls: [new RegExp('.*/my-api.*')]
            }
        })
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```

Call `initialize` method on app component initialization phase to check if authorization state is in URL. Calling `authenticate` method inside `AuthorizationCodeFlowAuthService` will redirect user to login page.

```typescript
import { Component, OnInit } from '@angular/core';
import { AuthorizationCodeFlowAuthService } from '@ngx-security/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor( private authorizationCodeFlowAuthService: AuthorizationCodeFlowAuthService) {
    }

    ngOnInit(): void {
        this.authorizationCodeFlowAuthService
            .initialize()
            .subscribe(console.log, console.error);
    }
    
    login(): void {
        this.authorizationCodeFlowAuthService.authenticate();
    }
}
```

## Client credentials flow

Include `SecurityAuthModule` into `AppModule` and provide configuration for client-credentials-flow, tokens and http-interceptor.

```typescript
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SecurityAuthModule } from '@ngx-security/auth';

import { AppComponent } from './app.component';

@NgModule({
    imports: [
        HttpClientModule,
        SecurityAuthModule.forRoot({
            clientCredentialsFlow: {
                tokenUrl: 'tokenUrl',
                clientId: 'clientId',
                clientSecret: 'clientSecret',
            },  
            tokens: {
                tokenUrl: 'tokenUrl',
                clientId: 'clientId',
                clientSecret: 'clientSecret',
                useHttpBasicAuth: true
            },
            interceptor: {
                whitelistedUrls: [new RegExp('.*/my-api.*')]
            }
        })
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```

Call `authenticate` method inside `ClientCredentialsFlowAuthService` to obtain access tokens.

```typescript
import { Component } from '@angular/core';
import { ClientCredentialsFlowAuthService } from '@ngx-security/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private clientCredentialsFlowAuthService: ClientCredentialsFlowAuthService) {
    }

    login(): void {
        this.clientCredentialsFlowAuthService
            .authenticate()
            .subscribe(console.log, console.error);
    }
}
```

## Refresh token

Include `SecurityAuthModule` into `AppModule` and provide configuration for tokens and http-interceptor. This is also part of password and authorization-code flow so that's why you need to configure tokens there. 

```typescript
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SecurityAuthModule } from '@ngx-security/auth';

import { AppComponent } from './app.component';

@NgModule({
    imports: [
        HttpClientModule,
        SecurityAuthModule.forRoot({
            tokens: {
                tokenUrl: 'tokenUrl',
                clientId: 'clientId',
                clientSecret: 'clientSecret',
                useHttpBasicAuth: true
            },
            interceptor: {
                whitelistedUrls: [new RegExp('.*/my-api.*')]
            }
        })
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```

Call `refreshTokens` method inside `TokensService` to obtain new access and refresh tokens.

```typescript
import { Component } from '@angular/core';
import { TokensService } from '@ngx-security/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private tokensService: TokensService) {
    }

    refresh(): void {
        this.tokensService
            .refreshTokens('RefreshTokenValue')
            .subscribe(console.log, console.error);
    }
}
```

## Clearing state

Each service above has `clear` method which clear app state and persistent storage (session and local). Real implementation of clear method is in `TokenService.clear`.
