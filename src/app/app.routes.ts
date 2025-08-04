import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    data: {title: 'ngx-security', pageTitle: 'Home', pageIcon: 'home'}
  }, {
    path: 'core',
    loadComponent: () => import('./core/core.component').then(m => m.CoreComponent),
    data: {title: 'ngx-security/core', pageTitle: 'Core', pageIcon: 'security'}
  }, {
    path: 'roles',
    loadComponent: () => import('./roles/roles.component').then(m => m.RolesComponent),
    data: {title: 'ngx-security/roles', pageTitle: 'Roles', pageIcon: 'security'}
  }, {
    path: 'permissions',
    loadComponent: () => import('./permissions/permissions.component').then(m => m.PermissionsComponent),
    data: {title: 'ngx-security/permissions', pageTitle: 'Permissions', pageIcon: 'security'}
  }, {
    path: 'auth',
    loadComponent: () => import('./auth/auth.component').then(m => m.AuthComponent),
    data: {title: 'ngx-security/auth', pageTitle: 'Auth', pageIcon: 'security'}
  }, {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
