import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserRolesProvider } from '../user-roles.provider';

@Pipe({name: 'hasRole', pure: false})
export class HasRolePipe implements PipeTransform, OnDestroy {

  private hasRole: boolean = null;

  private sub: Subscription = null;

  constructor(private ref: ChangeDetectorRef, private user: UserRolesProvider) {
  }

  transform(role: string, roleAsArg: string): boolean {
    role = roleAsArg || role;
    this.clear();
    this.sub = this.user.hasRoleAsync(role).subscribe((hasRole) => {
      if (this.hasRole !== hasRole) {
        this.hasRole = hasRole;
        this.ref.markForCheck();
      }
    });
    return this.hasRole;
  }

  ngOnDestroy(): void {
    this.clear();
  }

  private clear(): void {
    this.hasRole = null;
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }
}
