import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, pairwise, take } from 'rxjs/operators';

import { AuthSubject } from './auth-subject';
import { AuthSubjectDetails } from './auth-subject-details';
import { TokensService } from '../tokens/tokens.service';
import { JwtUtil } from '../../util/jwt.util';
import { TokensServiceOptions } from '../tokens/tokens-service-options';

@Injectable()
export class AuthSubjectService<T extends AuthSubjectDetails> implements OnDestroy {

  private readonly sub: Subscription;

  private subject: BehaviorSubject<AuthSubject<T>> = new BehaviorSubject(null);

  subject$: Observable<AuthSubject<T>> = this.subject.asObservable();
  principal$: Observable<string> = this.subject$.pipe(map(subject => subject && subject.principal || null));
  authorities$: Observable<string[]> = this.subject$.pipe(map(subject => subject && subject.authorities || []));
  details$: Observable<T | null> = this.subject$.pipe(map(subject => subject && subject.details || null));
  displayName$: Observable<string | null> = this.details$.pipe(map(details => details && details.displayName || null));
  hasAuthorized$: Observable<boolean> = this.authorities$.pipe(map(authorities => authorities.length > 0));

  changes$: Observable<AuthSubject<T>> = this.subject$.pipe(
    pairwise(),
    filter((pair: AuthSubject<T>[]) => pair[0] !== pair[1]
      && (pair[0] && pair[0].principal || null) !== (pair[1] && pair[1].principal || null)),
    map((pair: AuthSubject<T>[]) => pair[1])
  );

  constructor(private tokensService: TokensService, private options: TokensServiceOptions) {
    this.sub = this.tokensService.accessToken$.subscribe(accessToken => {
      this.update(accessToken);
    });
  }

  /**
   * Clean up
   * @ignore
   */
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.subject.complete();
  }

  /**
   * Return subject
   */
  getSubject(): AuthSubject<T> {
    return this.subject.getValue();
  }

  /**
   * Return subject authorities
   */
  getAuthorities(): string[] {
    const subject = this.subject.getValue();
    return subject && subject.authorities || [];
  }

  /**
   * Update user details
   *
   * @param details
   */
  updateDetails(details: T): void {
    const subject = this.getSubject();
    if (!subject) {
      return;
    }
    this.subject.next({...subject, ...{details}});
  }

  /**
   * Check if user is authenticated. Has valid access token or chance to obtain new
   */
  isAuthenticated(): Observable<boolean> {
    return combineLatest([this.tokensService.accessToken$, this.tokensService.refreshToken$]).pipe(
      take(1),
      map(([accessToken, refreshToken]) => {
        if (!accessToken && !refreshToken) {
          return false;
        }
        if (accessToken) {
          if (JwtUtil.isTokenExpired(accessToken)) {
            if (!refreshToken) {
              return false;
            }
            return !JwtUtil.isTokenExpired(refreshToken);
          }
          return true;
        }
        return !JwtUtil.isTokenExpired(refreshToken);
      })
    );
  }

  /**
   * Clear subject
   */
  clear(): void {
    this.subject.next(null);
  }

  /**
   * Decode access token to JWT and convert to subject object via {@link TokensServiceOptions.subjectMapper}
   * @ignore
   */
  private update(accessToken: string): void {
    const jwt = JwtUtil.decodeToken(accessToken);
    const subject: AuthSubject<any> = this.options.subjectMapper(jwt);
    this.subject.next(subject);
  }
}
