import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { Highlight } from 'ngx-highlightjs';

import { Subject, SubjectDetails, SubjectService } from '../../../projects/core/src/lib/subject/subject.service';

const usageComponentController = `
import { Component } from '@angular/core';
import { SubjectService } from '@ngx-security/core';

class UserDetails extends SubjectDetails {
}

class User extends Subject<UserDetails> {
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(public user: SubjectService<UserDetails, User>) {
    }
}
`;

const usageComponentView = `
<h3>{{user.displayName$ | async}}</h3>
<h5>{{user.authorities$ | async | json}}</h5>
`;

class UserDetails extends SubjectDetails {
}

class User extends Subject<UserDetails> {
}

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
  imports: [
    AsyncPipe,
    MatTabGroup,
    MatTab,
    Highlight,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    JsonPipe,
    MatCardActions,
    MatButton
  ]
})
export class CoreComponent {

  usageComponentController = usageComponentController;
  usageComponentView = usageComponentView;

  constructor(public user: SubjectService<UserDetails, User>) {
  }

  login(): void {
    this.user.update({
      principal: 'jsnow',
      authorities: ['ROLE_1', 'ROLE_2', 'ROLE_3'],
      details: {
        displayName: 'Jon Snow'
      }
    });
  }

  logout(): void {
    this.user.clear();
  }
}
