import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class UserRolesProvider implements OnDestroy {

  private sub: Subscription = null;

  private roles: BehaviorSubject<string[]> = new BehaviorSubject([]);
  roles$: Observable<string[]> = this.roles.asObservable();

  abstract getRoles(): Observable<string[]>;

  constructor() {
    this.sub = this.getRoles().subscribe((roles: string[]) => {
      this.apply(roles);
    });
  }

  ngOnDestroy(): void {
    this.roles.complete();
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }

  apply(roles: string[]) {
    this.roles.next(roles || []);
  }

  hasRoleAsync(role: string): Observable<boolean> {
    return this.roles$.pipe(
      map((userRoles) => this._hasRole(userRoles, role))
    );
  }

  hasAnyRoleAsync(roles: string[]): Observable<boolean> {
    return this.roles$.pipe(
      map((userRoles) => this._hasAnyRole(userRoles, roles))
    );
  }

  hasRolesAsync(roles: string[]): Observable<boolean> {
    return this.roles$.pipe(
      map((userRoles) => this._hasRoles(userRoles, roles))
    );
  }

  hasRole(role: string): boolean {
    return this._hasRole(this.roles.getValue(), role);
  }

  hasAnyRole(roles: string[]): boolean {
    return this._hasAnyRole(this.roles.getValue(), roles);
  }

  hasRoles(roles: string[]): boolean {
    return this._hasRoles(this.roles.getValue(), roles);
  }

  private _hasRole(userRoles: string[], role: string) {
    if (!userRoles || !role) {
      return false;
    }
    return userRoles.indexOf(role) >= 0;
  }

  private _hasAnyRole(userRoles: string[], roles: string[]) {
    if (!userRoles || !roles) {
      return false;
    }
    return userRoles.filter((userRole) => roles.indexOf(userRole) >= 0).length > 0;
  }

  private _hasRoles(userRoles: string[], roles: string[]) {
    if (!userRoles || !roles) {
      return false;
    }
    return userRoles.filter((userRole) => roles.indexOf(userRole) >= 0).length === roles.length;
  }
}

@Injectable()
export class UserRolesFakeProvider extends UserRolesProvider {
  getRoles(): Observable<string[]> {
    return of([]);
  }
}
