# ngx-security/core

This package provides the core functionality for managing subjects in the `@ngx-security` ecosystem. It includes the `SubjectService`, which is used to manage user details, authorities, and other subject-related information.

## Installation

```shell script
npm install --save @ngx-security/core
```

## Setup

`SubjectService` is provided using the `provideSecurityCore` helper function, which most apps include in the application `providers` in `app.config.ts`.

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideSecurityCore()
  ]
};
```

## Usage

```typescript
import { Component, OnInit } from '@angular/core';
import { Subject, SubjectDetails, SubjectService } from '@ngx-security/core';

class UserDetails extends SubjectDetails {
}

class User extends Subject<UserDetails> {
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public user: SubjectService<UserDetails, User>) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.user.update({
        principal: 'jsnow',
        authorities: ['ROLE_1', 'ROLE_2', 'ROLE_3'],
        details: {
          displayName: 'Jon Snow'
        }
      });
    });
  }
}
```

```html
<h3>{{user.displayName$ | async}}</h3>
<h5>{{user.authorities$ | async | json}}</h5>
```
