# ngx-security/permissions

## Installation

```
npm install --save @ngx-security/permissions
```

## Setup

Implement UserPermissions service which extends lib's SubjectPermissionsProvider class

```
@Injectable()
export class UserPermissionsService extends SubjectPermissionsProvider {

    constructor(private user: UserService) { }

    getPermissions(): Observable<string[]> {
        return observableOf(this.user.permissions);
    }
}
```

Import security permissions module in app module.

```
// AoT requires an exported function for factories
export function SubjectPermissionsProviderFactory(user: UserService) {
    return new UserPermissionsService(user);
}

@NgModule({
  imports: [
    BrowserModule,
    SecurityPermissionsModule.forRoot({
        subjectPermissions: { provide: SubjectPermissionsProvider, useFactory: SubjectPermissionsProviderFactory, deps: [UserService] }
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
