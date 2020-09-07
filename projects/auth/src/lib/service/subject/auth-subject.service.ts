import { Injectable, OnDestroy } from '@angular/core';
import { Subject, SubjectDetails, SubjectService } from '@ngx-security/core';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, pairwise, take } from 'rxjs/operators';

import { TokensService } from '../tokens/tokens.service';
import { AuthSubjectServiceOptions } from './auth-subject-service-options';
import { JwtUtil } from '../../util/jwt.util';
import { AuthFlowType } from '../auth-flow-options';

@Injectable()
export class AuthSubjectService<D extends SubjectDetails, S extends Subject<D>> extends SubjectService<D, S> implements OnDestroy {

  private readonly sub: Subscription;

  private subject: BehaviorSubject<S> = new BehaviorSubject(null);

  subject$: Observable<S> = this.subject.asObservable();
  principal$: Observable<string> = this.subject$.pipe(map(subject => subject && subject.principal || null));
  authorities$: Observable<string[]> = this.subject$.pipe(map(subject => subject && subject.authorities || []));
  details$: Observable<D | null> = this.subject$.pipe(map(subject => subject && subject.details || null));
  displayName$: Observable<string | null> = this.details$.pipe(map(details => details && details.displayName || null));
  isAuthorized$: Observable<boolean> = this.authorities$.pipe(map(authorities => authorities.length > 0));

  changes$: Observable<S> = this.subject$.pipe(
    pairwise(),
    filter((pair: S[]) => pair[0] !== pair[1] && (pair[0] && pair[0].principal || null) !== (pair[1] && pair[1].principal || null)),
    map((pair: S[]) => pair[1])
  );

  constructor(private tokensService: TokensService, private options: AuthSubjectServiceOptions<D, S>) {
    super();
    this.sub = this.tokensService.accessToken$.subscribe(accessToken => {
      this.decode(accessToken);
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

  protected setSubject(subject: S | null) {
    this.subject.next(subject);
  }

  /**
   * Return subject
   */
  getSubject(): S {
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
  updateDetails(details: D): void {
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
          if (this.tokensService.getAuthenticationFlowType(accessToken) === AuthFlowType.CLIENT_CREDENTIALS) {
            return true;
          }
          if (JwtUtil.isTokenExpired(accessToken)) {
            return refreshToken && !JwtUtil.isTokenExpired(refreshToken);
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
   * Decode access token to JWT and convert to subject object via {@link AuthSubjectServiceOptions.mapper}
   * @ignore
   */
  private decode(accessToken: string): void {
    const jwt = JwtUtil.decodeToken(accessToken);
    this.setSubject(this.options.mapper(jwt));
  }
}
