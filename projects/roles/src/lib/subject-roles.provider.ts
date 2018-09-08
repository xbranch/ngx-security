import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class SubjectRolesProvider implements OnDestroy {

  private sub: Subscription = null;
  private roles: BehaviorSubject<string[]> = new BehaviorSubject([]);

  roles$: Observable<string[]> = this.roles.asObservable();

  static hasRole(subjectRoles: string[], role: string) {
    if (!subjectRoles || !role) {
      return false;
    }
    return subjectRoles.indexOf(role) >= 0;
  }

  static hasAnyRole(subjectRoles: string[], roles: string[]) {
    if (!subjectRoles || !roles) {
      return false;
    }
    return subjectRoles.filter((subjectRole) => roles.indexOf(subjectRole) >= 0).length > 0;
  }

  static hasRoles(subjectRoles: string[], roles: string[]) {
    if (!subjectRoles || !roles) {
      return false;
    }
    return subjectRoles.filter((subjectRole) => roles.indexOf(subjectRole) >= 0).length === roles.length;
  }

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
      map((subjectRoles) => SubjectRolesProvider.hasRole(subjectRoles, role))
    );
  }

  hasAnyRoleAsync(roles: string[]): Observable<boolean> {
    return this.roles$.pipe(
      map((subjectRoles) => SubjectRolesProvider.hasAnyRole(subjectRoles, roles))
    );
  }

  hasRolesAsync(roles: string[]): Observable<boolean> {
    return this.roles$.pipe(
      map((subjectRoles) => SubjectRolesProvider.hasRoles(subjectRoles, roles))
    );
  }

  hasRole(role: string): boolean {
    return SubjectRolesProvider.hasRole(this.roles.getValue(), role);
  }

  hasAnyRole(roles: string[]): boolean {
    return SubjectRolesProvider.hasAnyRole(this.roles.getValue(), roles);
  }

  hasRoles(roles: string[]): boolean {
    return SubjectRolesProvider.hasRoles(this.roles.getValue(), roles);
  }
}

@Injectable()
export class SubjectRolesFakeProvider extends SubjectRolesProvider {
  getRoles(): Observable<string[]> {
    return of([]);
  }
}
