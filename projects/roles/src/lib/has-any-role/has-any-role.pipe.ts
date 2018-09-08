import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserRolesProvider } from '../user-roles.provider';

@Pipe({name: 'hasAnyRole', pure: false})
export class HasAnyRolePipe implements PipeTransform, OnDestroy {

  private hasAnyRole = null;

  private sub: Subscription = null;

  constructor(private ref: ChangeDetectorRef, private user: UserRolesProvider) {
  }

  transform(roles: string[], rolesAsArg: string[]): boolean {
    roles = rolesAsArg || roles;
    this.clear();
    this.sub = this.user.hasAnyRoleAsync(roles).subscribe((hasAnyRole) => {
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
