# ngx-security/auth

> OAuth2 Implementation

...in progress

## Password Flow

Include `SecurityAuthModule` into `AppModule` and provide configuration for password-flow and http-interceptor.

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

    constructor( private implicitFlowService: ImplicitFlowService) {
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

Include `SecurityAuthModule` into `AppModule` and provide configuration for authorization-code-flow and http-interceptor.

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

    constructor( private authorizationCodeFlowService: AuthorizationCodeFlowService) {
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

Include `SecurityAuthModule` into `AppModule` and provide configuration for client-credentials-flow and http-interceptor.

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

Add tokens configuration at `SecurityAuthModule` import.

```typescript
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SecurityAuthModule, AuthTokens } from '@ngx-security/auth';

import { AppComponent } from './app.component';

@NgModule({
    imports: [
        HttpClientModule,
        SecurityAuthModule.forRoot({
            tokens:{
                mapper: (tokens: any): AuthTokens => {
                    tokens = tokens || {};
                    return {
                        accessToken: tokens['access_token'] || tokens['accessToken'] || null,
                        refreshToken: tokens['refresh_token'] || tokens['refreshToken'] || null
                    };
                }
            }
        })
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```

## Custom subject mapper

Add subject configuration at `SecurityAuthModule` import.

```typescript
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SecurityAuthModule, AuthSubject } from '@ngx-security/auth';

import { AppComponent } from './app.component';

@NgModule({
    imports: [
        HttpClientModule,
        SecurityAuthModule.forRoot({
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
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```

## Combine with ngx-security/roles and/or ngx-security/permissions
 
...in progress
