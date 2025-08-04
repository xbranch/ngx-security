# ngx-security/permissions

This module provides a way to manage permissions in your Angular application using structural directives and pipes. Default permissions are provided by the `SubjectService` from `@ngx-security/core`, which is used to manage user details and authorities.

## Installation

```shell script
npm install --save @ngx-security/core @ngx-security/permissions
```

## Setup

`SubjectPermissionsProvider` is provided using the `provideSecurityPermissions` helper function, which most apps include in the application `providers` in `app.config.ts`.

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideSecurityCore(),
    provideSecurityPermissions()
  ]
};
```

Now you are ready to use it. See [SecurityCoreModule](https://github.com/xbranch/ngx-security/tree/develop/projects/core) for `SubjectService` implementation which provide authorities as permissions.

## Usage

### Structural directives

```html
<p *isPermitted="'printer:xpc4000:*'">This should see users with printer:xpc4000:*</p>
```

### Pipes

```html
<p *ngIf="'printer:xpc4000:*' | isPermitted">This should see users with printer:xpc4000:*</p>
```

### Pipes with poetry

```html
<p *ngIf="'user' | isPermitted:'printer:xpc4000:*'">This should see users with printer:xpc4000:*</p>`
```

## Advance setup

Implement custom `SubjectPermissionsProvider` class:

```typescript
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SubjectPermissionsProvider } from '@ngx-security/permissions';

@Injectable()
export class MyPermissionsProvider extends SubjectPermissionsProvider implements OnDestroy {

  private permissions: BehaviorSubject<string[]> = new BehaviorSubject(['printer:xpc5000:print', 'printer:xpc4000:*', 'nas:timeCapsule,fritzbox:read']);

  permissions$: Observable<string[]> = this.permissions.asObservable();

  constructor() {
    super();
  }

  ngOnDestroy(): void {
    this.permissions.complete();
  }

  getPermissions(): string[] {
    return this.permissions.getValue();
  }
}
```

Add provider for core and permissions module in your `app.config.ts` and set your custom provider:

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideSecurityCore(),
    provideSecurityPermissions({
      subjectPermissions: {provide: SubjectPermissionsProvider, useClass: MyPermissionsProvider}
    })
  ]
};
```
