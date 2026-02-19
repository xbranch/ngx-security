# ngx-security/roles

This module provides structural directives and pipes to check roles of the current user. Default roles are provided by the `SubjectService` from `@ngx-security/core`, which is used to manage user details and authorities.

## Installation

```shell script
npm install --save @ngx-security/core @ngx-security/roles
```

## Setup

`SubjectRolesProvider` is provided using the `provideSecurityRoles` helper function, which most apps include in the application `providers` in `app.config.ts`.

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideSecurityCore(),
    provideSecurityRoles()
  ]
};
```

Now you are ready to use it. See [SecurityCoreModule](https://github.com/xbranch/ngx-security/tree/develop/projects/core) for `SubjectService` implementation which provide authorities as roles.

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

```angular20html
@if ('ROLE_1' | hasRole) {
    <p>This should see users with ROLE_1</p>
}
```

```angular20html
@if (['ROLE_1','ROLE_2'] | hasAnyRole) {
    <p>This should see users with ROLE_1 or ROLE_2</p>
}
```

```angular20html
@if (['ROLE_1','ROLE_2'] | hasRoles) {
    <p>This should see users with ROLE_1 and ROLE_2</p>
}
```

### Pipes with poetry

```angular20html
@if ('user' | hasRole:'ROLE_1') {
    <p>This should see users with ROLE_1</p>`
}
```

```angular20html
@if ('user' | hasAnyRole:['ROLE_1','ROLE_2']) {
    <p>This should see users with ROLE_1 or ROLE_2</p>`
}
```

```angular20html
@if ('user' | hasRoles:['ROLE_1','ROLE_2']) {
    <p>This should see users with ROLE_1 and ROLE_2</p>`
}
```

## Advance setup

Implement custom custom `SubjectRolesProvider` class:

```typescript
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SubjectRolesProvider } from '@ngx-security/roles';

@Injectable()
export class MyRolesProvider extends SubjectRolesProvider implements OnDestroy {

  private roles: BehaviorSubject<string[]> = new BehaviorSubject(['ROLE_1', 'ROLE_2']);

  roles$: Observable<string[]> = this.roles.asObservable();

  constructor() {
    super();
  }

  ngOnDestroy(): void {
    this.roles.complete();
  }

  getRoles(): string[] {
    return this.roles.getValue();
  }
}
```

Add provider for core and roles module in your `app.config.ts` and set `SubjectRolesProvider` to your custom provider:

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideSecurityCore(),
    provideSecurityRoles({
      subjectRoles: {provide: SubjectRolesProvider, useClass: MyRolesProvider}
    })
  ]
};
```
