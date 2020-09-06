import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class SubjectRolesProvider {

  abstract roles$: Observable<string[]>;

  abstract getRoles(): string[];

  protected constructor() {
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

  protected _hasRole(role: string, subjectRoles: string[] = this.getRoles()) {
    if (!subjectRoles || !role) {
      return false;
    }
    return subjectRoles.indexOf(role) >= 0;
  }

  protected _hasAnyRole(roles: string[], subjectRoles: string[] = this.getRoles()) {
    if (!subjectRoles || !roles) {
      return false;
    }
    return subjectRoles.filter((subjectRole) => roles.indexOf(subjectRole) >= 0).length > 0;
  }

  protected _hasRoles(roles: string[], subjectRoles: string[] = this.getRoles()) {
    if (!subjectRoles || !roles) {
      return false;
    }
    return subjectRoles.filter((subjectRole) => roles.indexOf(subjectRole) >= 0).length === roles.length;
  }
}

@Injectable({
  providedIn: 'root'
})
export class UpdatableSubjectRolesProvider extends SubjectRolesProvider implements OnDestroy {

  private roles: BehaviorSubject<string[]> = new BehaviorSubject([]);

  roles$: Observable<string[]> = this.roles.asObservable();

  constructor() {
    super();
  }

  ngOnDestroy(): void {
    this.roles.complete();
  }

  getRoles(): string[] {
    return this.roles.getValue();
  }

  update(roles: string[]): void {
    this.roles.next(roles);
  }
}
