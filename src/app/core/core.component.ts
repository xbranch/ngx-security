import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { SubjectService } from '../../../projects/core/src/lib/subject/subject.service';


const usageComponentController = `
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
`;

const usageComponentView = `
<h3>{{user.displayName$ | async}}</h3>
<h5>{{user.authorities$ | async | json}}</h5>
`;

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoreComponent implements OnInit {

  usageComponentController = usageComponentController;
  usageComponentView = usageComponentView;

  constructor(public user: SubjectService) {
  }

  ngOnInit() {
  }

  login() {
    this.user.update({
      authorities: ['ROLE_1', 'ROLE_2', 'ROLE_3'],
      details: {
        displayName: 'Jon Snow'
      }
    });
  }

  logout() {
    this.user.clear();
  }
}
