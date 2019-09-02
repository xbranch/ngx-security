import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';

import { SubjectRolesProvider } from '../subject-roles.provider';

@Pipe({name: 'hasAnyRole', pure: false})
export class HasAnyRolePipe implements PipeTransform, OnDestroy {

  private hasAnyRole: boolean = null;

  private sub: Subscription = null;

  constructor(private ref: ChangeDetectorRef, private subject: SubjectRolesProvider) {
  }

  transform(roles: string | string[], rolesAsArg: string[]): boolean {
    roles = rolesAsArg || roles as string[];
    this.clear();
    this.sub = this.subject.hasAnyRoleAsync(roles).subscribe((hasAnyRole) => {
      if (this.hasAnyRole !== hasAnyRole) {
        this.hasAnyRole = hasAnyRole;
        this.ref.markForCheck();
      }
    });
    return this.hasAnyRole;
  }

  ngOnDestroy(): void {
    this.clear();
  }

  private clear(): void {
    this.hasAnyRole = null;
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }
}
