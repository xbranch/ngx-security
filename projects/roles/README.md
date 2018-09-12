# ngx-security/roles

## Installation

```
npm install --save @ngx-security/roles
```

## Setup

Implement custom UserRolesService which extends lib's `SubjectRolesProvider` class

```
import { Injectable } from '@angular/core';
import { Observable , of as observableOf } from 'rxjs';
import { SubjectRolesProvider } from '@ngx-security/roles';

@Injectable({ providedIn: 'root' })
export class UserRolesService extends SubjectRolesProvider {

    constructor(private user: UserService) { }

    getRoles(): Observable<string[]> {
        return observableOf(this.user.roles);
    }
}
```

Import `SecurityRolesModule` in app module and set your custom `SubjectRolesProvider`.

```
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
```

Now you are ready to use it.

## Usage

### Structural directives
```
<p *hasRole="'ROLE_1'">This should see users with ROLE_1</p>
```
```
<p *hasAnyRole="['ROLE_1','ROLE_2']">This should see users with ROLE_1 or ROLE_2</p>
```
```
<p *hasRoles="['ROLE_1','ROLE_2']">This should see users with ROLE_1 and ROLE_2</p>
```

### Pipes
```
<p *ngIf="'ROLE_1' | hasRole">This should see users with ROLE_1</p>
```
```
<p *ngIf="['ROLE_1','ROLE_2'] | hasAnyRole">This should see users with ROLE_1 or ROLE_2</p>
```
```
<p *ngIf="['ROLE_1','ROLE_2'] | hasRoles">This should see users with ROLE_1 and ROLE_2</p>
```

### Pipes with poetry
```
<p *ngIf="'user' | hasRole:'ROLE_1'">This should see users with ROLE_1</p>`
```
```
<p *ngIf="'user' | hasAnyRole:['ROLE_1','ROLE_2']">This should see users with ROLE_1 or ROLE_2</p>`
```
```
<p *ngIf="'user' | hasRoles:['ROLE_1','ROLE_2']">This should see users with ROLE_1 and ROLE_2</p>`
```
