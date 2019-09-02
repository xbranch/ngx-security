# ngx-security/permissions

## Installation

```
npm install --save @ngx-security/permissions
```

## Setup

Implement custom UserPermissionsService which extends lib's `SubjectPermissionsProvider` class

```
import { Injectable } from '@angular/core';
import { Observable , of as observableOf } from 'rxjs';
import { SubjectPermissionsProvider } from '@ngx-security/permissions';

@Injectable({ providedIn: 'root' })
export class UserPermissionsService extends SubjectPermissionsProvider {

    permissions$: Observable<string[]> = this.user.authorities$;

    constructor(private user: UserService) {
        super();
    }

    getPermissions(): string[] {
        return this.user.getAuthorities();
    }
}
```

Import `SecurityPermissionsModule` in app module and set your custom `SubjectPermissionsProvider`.

```
@NgModule({
  imports: [
    BrowserModule,
    SecurityPermissionsModule.forRoot({
        subjectPermissions: { provide: SubjectPermissionsProvider, useClass: UserPermissionsService }
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
<p *isPermitted="'PERMISSION_1'">This should see users with PERMISSION_1</p>
```

### Pipes
```
<p *ngIf="'PERMISSION_1' | isPermitted">This should see users with PERMISSION_1</p>
```

### Pipes with poetry
```
<p *ngIf="'user' | isPermitted:'PERMISSION_1'">This should see users with PERMISSION_1</p>`
```
