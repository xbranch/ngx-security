import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  modules = [{
    title: 'ngx-security/core',
    link: '/core',
    subTitle: 'Core security module',
    description: 'Core security module for common interfaces, services etc.',
    image: 'assets/core.png'
  }, {
    title: 'ngx-security/roles',
    link: '/roles',
    subTitle: 'Roles scurity module',
    description: 'Small independent module for handling user roles',
    image: 'assets/roles.png'
  }, {
    title: 'ngx-security/auth',
    link: '/auth',
    subTitle: 'Auth security module',
    description: 'Authorization module ',
    image: 'assets/auth.png'
  }];

  constructor() {
  }

  ngOnInit() {
  }
}
