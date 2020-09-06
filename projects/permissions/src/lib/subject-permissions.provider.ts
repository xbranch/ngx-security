import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { newTrie, ShiroTrie } from 'shiro-trie';

export abstract class SubjectPermissionsProvider {

  private trie: ShiroTrie;

  abstract permissions$: Observable<string[]>;

  abstract getPermissions(): string[];

  protected constructor() {
    this.trie = newTrie();
  }

  apply(): void {
    this.trie.reset();
    this.trie.add(...this.getPermissions());
  }

  isPermittedAsync(permission: string): Observable<boolean> {
    return this.permissions$.pipe(
      map(() => this._isPermitted(permission))
    );
  }

  isPermitted(permission: string): boolean {
    return this._isPermitted(permission);
  }

  protected _isPermitted(permission: string) {
    return this.trie.check(permission);
  }
}

@Injectable({
  providedIn: 'root'
})
export class UpdatableSubjectPermissionsProvider extends SubjectPermissionsProvider implements OnDestroy {

  private permissions: BehaviorSubject<string[]> = new BehaviorSubject([]);

  permissions$: Observable<string[]> = this.permissions.asObservable();

  constructor() {
    super();
    this.apply();
  }

  ngOnDestroy(): void {
    this.permissions.complete();
  }

  getPermissions(): string[] {
    return this.permissions.getValue();
  }

  update(permissions: string[]): void {
    this.permissions.next(permissions);
  }
}
