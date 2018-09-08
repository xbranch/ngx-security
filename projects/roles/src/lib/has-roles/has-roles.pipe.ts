import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserRolesProvider } from '../user-roles.provider';

@Pipe({name: 'hasRoles', pure: false})
export class HasRolesPipe implements PipeTransform, OnDestroy {

  private hasRoles = null;

  private sub: Subscription = null;

  constructor(private ref: ChangeDetectorRef, private user: UserRolesProvider) {
  }

  transform(roles: string[], rolesAsArg: string[]): boolean {
    roles = rolesAsArg || roles;
    this.clear();
    this.sub = this.user.hasRolesAsync(roles).subscribe((hasRoles) => {
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
