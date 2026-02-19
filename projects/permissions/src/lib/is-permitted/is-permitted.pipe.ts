import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';

import { SubjectPermissionsProvider } from '../subject-permissions.provider';

@Pipe({name: 'isPermitted', pure: false})
export class IsPermittedPipe implements PipeTransform, OnDestroy {

  private isPermitted: boolean = null;

  private sub: Subscription = null;

  constructor(private ref: ChangeDetectorRef, private subject: SubjectPermissionsProvider) {
  }

  transform(permission: string, permissionAsArg?: string): boolean {
    permission = permissionAsArg || permission;
    this.clear();
    this.sub = this.subject.isPermittedAsync(permission).subscribe((isPermitted) => {
      if (this.isPermitted !== isPermitted) {
        this.isPermitted = isPermitted;
        this.ref.markForCheck();
      }
    });
    return this.isPermitted;
  }

  ngOnDestroy(): void {
    this.clear();
  }

  private clear(): void {
    this.isPermitted = null;
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }
}
