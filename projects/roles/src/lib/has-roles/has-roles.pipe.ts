import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';

import { SubjectRolesProvider } from '../subject-roles.provider';

@Pipe({name: 'hasRoles', pure: false})
export class HasRolesPipe implements PipeTransform, OnDestroy {

  private hasRoles = null;

  private sub: Subscription = null;

  constructor(private ref: ChangeDetectorRef, private subject: SubjectRolesProvider) {
  }

  transform(roles: string | string[], rolesAsArg: string[]): boolean {
    roles = rolesAsArg || roles as string[];
    this.clear();
    this.sub = this.subject.hasRolesAsync(roles).subscribe((hasRoles) => {
      if (this.hasRoles !== hasRoles) {
        this.hasRoles = hasRoles;
        this.ref.markForCheck();
      }
    });
    return this.hasRoles;
  }

  ngOnDestroy(): void {
    this.clear();
  }

  private clear(): void {
    this.hasRoles = null;
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }
}
