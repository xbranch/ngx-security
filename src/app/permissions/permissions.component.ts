import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  SubjectPermissionsProvider,
  UpdatableSubjectPermissionsProvider
} from '../../../projects/permissions/src/lib/subject-permissions.provider';

const isPermittedDirective = `<p *isPermitted="'printer:xpc4000:configure'"></p>`;
const isPermittedPipe = `<p *ngIf="'nas:timeCapsule:write' | isPermitted"></p>`;
const isPermittedPipePoetry = `<p *ngIf="'user' | isPermitted:'nas:timeCapsule:write'"></p>`;

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
<mat-card *ngIf="'user' | isPermitted:'nas:timeCapsule:write'">
<span>Permission is 'nas:timeCapsule:write'</span>
</mat-card>
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
