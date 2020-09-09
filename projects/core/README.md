# ngx-security/core

## Installation

```shell script
npm install --save @ngx-security/core
```

## Setup

Import `SecurityCoreModule` in app module.

```typescript
@NgModule({
  imports: [
    BrowserModule,
    SecurityCoreModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
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
