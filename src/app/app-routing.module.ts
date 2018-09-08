import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'home',
  loadChildren: './home/home.module#HomeModule',
  data: {title: 'ngx-security', pageTitle: 'Home', pageIcon: 'home'}
}, {
  path: 'core',
  loadChildren: './core/core.module#CoreModule',
  data: {title: 'ngx-security/core', pageTitle: 'Core', pageIcon: 'security'}
}, {
  path: 'roles',
  loadChildren: './roles/roles.module#RolesModule',
  data: {title: 'ngx-security/roles', pageTitle: 'Roles', pageIcon: 'security'}
}, {
  path: 'auth',
  loadChildren: './auth/auth.module#AuthModule',
  data: {title: 'ngx-security/auth', pageTitle: 'Auth', pageIcon: 'security'}
}, {
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
