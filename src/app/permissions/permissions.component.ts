import { Component, OnInit } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatCard } from '@angular/material/card';
import { Highlight } from 'ngx-highlightjs';

import {
  SubjectPermissionsProvider,
  UpdatableSubjectPermissionsProvider
} from '../../../projects/permissions/src/lib/subject-permissions.provider';
import { SecurityPermissionsModule } from '../../../projects/permissions/src/lib/permissions.module';

const isPermittedDirective = `<p *isPermitted="'printer:xpc4000:configure'">Visible to users with 'printer:xpc4000:configure' permission</p>`;
const isPermittedPipe = `
@if ('nas:timeCapsule:write' | isPermitted) {
    <p>Visible to users with 'nas:timeCapsule:write' permission</p>
}
`;
const isPermittedPipePoetry = `
@if ('user' | isPermitted:'nas:timeCapsule:write') {
    <p>Visible to users with 'nas:timeCapsule:write' permission</p>
}
`;

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
  imports: [SecurityPermissionsModule, MatTabGroup, MatTab, Highlight, MatCard]
})
export class PermissionsComponent implements OnInit {

  isPermittedDirective = isPermittedDirective;
  isPermittedPipe = isPermittedPipe;
  isPermittedPipePoetry = isPermittedPipePoetry;

  permissions = `
[
  'printer:xpc5000:print',
  'printer:xpc4000:*',
  'nas:timeCapsule,fritzbox:read'
]
  `;

  firstCard = `
<mat-card *isPermitted="'printer:xpc4000:configure'">
  <span>Permission is 'printer:xpc4000:configure'</span>
</mat-card>
`;

  secondCard = `
@if ('user' | isPermitted:'nas:timeCapsule:write') {
    <mat-card >
        <span>Permission is 'nas:timeCapsule:write'</span>
    </mat-card>
}
`;

  constructor(private subjectPermissionsProvider: SubjectPermissionsProvider) {
  }

  ngOnInit() {
    this.update([
      'printer:xpc5000:print',
      'printer:xpc4000:*',
      'nas:timeCapsule,fritzbox:read'
    ]);
  }

  private update(authorities: string[]): void {
    (this.subjectPermissionsProvider as UpdatableSubjectPermissionsProvider).update(authorities);
    this.subjectPermissionsProvider.apply();
  }
}
