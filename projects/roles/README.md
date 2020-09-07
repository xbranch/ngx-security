# ngx-security/roles

## Installation

```shell script
npm install --save @ngx-security/core @ngx-security/roles
```

## Setup

Implement custom UserRolesService which extends lib's `SubjectRolesProvider` class

```typescript
import { Injectable } from '@angular/core';
import { Observable , of as observableOf } from 'rxjs';
import { SubjectRolesProvider } from '@ngx-security/roles';

@Injectable({ providedIn: 'root' })
export class UserRolesService extends SubjectRolesProvider {

    roles$: Observable<string[]> = this.user.authorities$;

    constructor(private user: UserService) {
        super();
    }

    getRoles(): string[] {
        return this.user.getAuthorities();
    }
}
```

Import `SecurityRolesModule` in app module and set your custom `SubjectRolesProvider`.

````typescript
@NgModule({
  imports: [
    BrowserModule,
    SecurityRolesModule.forRoot({
        subjectRoles: { provide: SubjectRolesProvider, useClass: UserRolesService }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
````

Now you are ready to use it.

## Usage

### Structural directives
```html
<p *hasRole="'ROLE_1'">This should see users with ROLE_1</p>
```
```html
<p *hasAnyRole="['ROLE_1','ROLE_2']">This should see users with ROLE_1 or ROLE_2</p>
```
```html
<p *hasRoles="['ROLE_1','ROLE_2']">This should see users with ROLE_1 and ROLE_2</p>
```

### Pipes
```html
<p *ngIf="'ROLE_1' | hasRole">This should see users with ROLE_1</p>
```
```html
<p *ngIf="['ROLE_1','ROLE_2'] | hasAnyRole">This should see users with ROLE_1 or ROLE_2</p>
```
```html
<p *ngIf="['ROLE_1','ROLE_2'] | hasRoles">This should see users with ROLE_1 and ROLE_2</p>
```

### Pipes with poetry
```html
<p *ngIf="'user' | hasRole:'ROLE_1'">This should see users with ROLE_1</p>`
```
```html
<p *ngIf="'user' | hasAnyRole:['ROLE_1','ROLE_2']">This should see users with ROLE_1 or ROLE_2</p>`
```
```html
<p *ngIf="'user' | hasRoles:['ROLE_1','ROLE_2']">This should see users with ROLE_1 and ROLE_2</p>`
```
