import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardImage,
    MatCardActions,
    MatButton,
    MatIcon,
    RouterLink
  ],
})
export class HomeComponent {

  modules = [{
    title: 'ngx-security/core',
    link: '/core',
    subTitle: 'Core security module',
    description: 'Core security module for common interfaces, services etc.',
    image: 'assets/core.png'
  }, {
    title: 'ngx-security/roles',
    link: '/roles',
    subTitle: 'Roles security module',
    description: 'Small independent module for handling user roles',
    image: 'assets/roles.png'
  }, {
    title: 'ngx-security/permissions',
    link: '/permissions',
    subTitle: 'Permissions security module',
    description: 'Small independent module for handling user permissions in an Apache Shiro-like style',
    image: 'assets/permissions.png'
  }, {
    title: 'ngx-security/auth',
    link: '/auth',
    subTitle: 'Auth security module',
    description: 'Authorization module ',
    image: 'assets/auth.png'
  }];
}
