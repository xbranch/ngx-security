import { OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class SubjectRolesProvider implements OnDestroy {

  private sub: Subscription = null;
  private roles: BehaviorSubject<string[]> = new BehaviorSubject([]);

  roles$: Observable<string[]> = this.roles.asObservable();

  abstract getRoles(): Observable<string[]>;

  protected constructor() {
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
      map((subjectRoles) => this._hasRole(role, subjectRoles))
    );
  }

  hasAnyRoleAsync(roles: string[]): Observable<boolean> {
    return this.roles$.pipe(
      map((subjectRoles) => this._hasAnyRole(roles, subjectRoles))
    );
  }

  hasRolesAsync(roles: string[]): Observable<boolean> {
    return this.roles$.pipe(
      map((subjectRoles) => this._hasRoles(roles, subjectRoles))
    );
  }

  hasRole(role: string): boolean {
    return this._hasRole(role);
  }

  hasAnyRole(roles: string[]): boolean {
    return this._hasAnyRole(roles);
  }

  hasRoles(roles: string[]): boolean {
    return this._hasRoles(roles);
  }

  protected _hasRole(role: string, subjectRoles: string[] = this.roles.getValue()) {
    if (!subjectRoles || !role) {
      return false;
    }
    return subjectRoles.indexOf(role) >= 0;
  }

  protected _hasAnyRole(roles: string[], subjectRoles: string[] = this.roles.getValue()) {
    if (!subjectRoles || !roles) {
      return false;
    }
    return subjectRoles.filter((subjectRole) => roles.indexOf(subjectRole) >= 0).length > 0;
  }

  protected _hasRoles(roles: string[], subjectRoles: string[] = this.roles.getValue()) {
    if (!subjectRoles || !roles) {
      return false;
    }
    return subjectRoles.filter((subjectRole) => roles.indexOf(subjectRole) >= 0).length === roles.length;
  }
}

export class EmptySubjectRolesProvider extends SubjectRolesProvider {

  constructor() {
    super();
  }

  getRoles(): Observable<string[]> {
    return of([]);
  }
}
