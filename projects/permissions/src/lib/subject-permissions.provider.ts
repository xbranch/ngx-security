import { OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { newTrie, ShiroTrie } from 'shiro-trie';

export abstract class SubjectPermissionsProvider implements OnDestroy {

  private trie: ShiroTrie;
  private sub: Subscription = null;
  private permissions: BehaviorSubject<string[]> = new BehaviorSubject([]);

  permissions$: Observable<string[]> = this.permissions.asObservable();

  abstract getPermissions(): Observable<string[]>;

  protected constructor() {
    this.trie = newTrie();
    this.sub = this.getPermissions().subscribe((permissions: string[]) => {
      this.apply(permissions);
    });
  }

  ngOnDestroy(): void {
    this.permissions.complete();
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }

  apply(permissions: string[]) {
    this.trie.reset();
    this.trie.add(...permissions);
    this.permissions.next(permissions || []);
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

export class EmptySubjectPermissionsProvider extends SubjectPermissionsProvider {

  constructor() {
    super();
  }

  getPermissions(): Observable<string[]> {
    return of([]);
  }
}
