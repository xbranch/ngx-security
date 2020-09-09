# ngx-security/roles

## Installation

```shell script
npm install --save @ngx-security/core @ngx-security/roles
```

## Setup

Import `SecurityCoreModule` and `SecurityRolesModule` in app module.

````typescript
@NgModule({
  imports: [
    BrowserModule,
    SecurityCoreModule.forRoot(),
    SecurityRolesModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
````

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

Import `SecurityRolesModule` in app module and set your custom `SubjectRolesProvider`.

````typescript
@NgModule({
  imports: [
    BrowserModule,
    SecurityCoreModule.forRoot(),
    SecurityRolesModule.forRoot({
        subjectRoles: { provide: SubjectRolesProvider, useClass: MyRolesProvider }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
````
