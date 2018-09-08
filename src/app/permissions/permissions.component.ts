import { Component, OnInit } from '@angular/core';

import { SubjectPermissionsProvider } from '../../../projects/permissions/src/lib/subject-permissions.provider';

const isPermittedDirective = `<p *isPermitted="'printer:xpc4000:configure'"></p>`;
const isPermittedPipe = `<p *ngIf="'nas:timeCapsule:write' | isPermitted"></p>`;
const isPermittedPipePoetry = `<p *ngIf="'user' | isPermitted:'nas:timeCapsule:write'"></p>`;

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {

  isPermittedDirective = isPermittedDirective;
  isPermittedPipe = isPermittedPipe;
  isPermittedPipePoetry = isPermittedPipePoetry;

  constructor(private subject: SubjectPermissionsProvider) {
  }

  ngOnInit() {
    this.subject.apply([
      'printer:xpc5000:print',
      'printer:xpc4000:*',
      'nas:timeCapsule,fritzbox:read'
    ]);
  }
}
