import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'home',
  loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  data: {title: 'ngx-security', pageTitle: 'Home', pageIcon: 'home'}
}, {
  path: 'core',
  loadChildren: () => import('./core/core.module').then(m => m.CoreModule),
  data: {title: 'ngx-security/core', pageTitle: 'Core', pageIcon: 'security'}
}, {
  path: 'roles',
  loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule),
  data: {title: 'ngx-security/roles', pageTitle: 'Roles', pageIcon: 'security'}
}, {
  path: 'permissions',
  loadChildren: () => import('./permissions/permissions.module').then(m => m.PermissionsModule),
  data: {title: 'ngx-security/permissions', pageTitle: 'Permissions', pageIcon: 'security'}
}, {
  path: 'auth',
  loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  data: {title: 'ngx-security/auth', pageTitle: 'Auth', pageIcon: 'security'}
}, {
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
