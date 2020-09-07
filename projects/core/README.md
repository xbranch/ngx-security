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

### SubjectService
```typescript
import { Component } from '@angular/core';
import { SubjectService } from '@ngx-security/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(public user: SubjectService) {
    }
}
```

```html
<h3>{{user.displayName$ | async}}</h3>
<h5>{{user.authorities$ | async | json}}</h5>
```
