import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class SubjectDetails {
  displayName: string;
}

export abstract class Subject<D extends SubjectDetails> {
  principal: string;
  credentials?: string;
  authorities: string[];
  details: D;
}

export abstract class SubjectService<D extends SubjectDetails, S extends Subject<D> = any> {
  abstract subject$: Observable<S | null>;
  abstract authorities$: Observable<string[] | null>;
  abstract details$: Observable<D | null>;
  abstract displayName$: Observable<string | null>;
  abstract isAuthorized$: Observable<boolean>;

  abstract getSubject(): S | null;

  protected abstract setSubject(subject: S | null): void;

  getAuthorities(): string[] {
    const subject = this.getSubject();
    return subject && subject.authorities || [];
  }

  update(subject: S): void {
    subject.credentials = null;
    this.setSubject(subject);
  }

  updateDetails(subjectDetails: D): void {
    const subject = {...<any>this.getSubject()};
    subject.details = subjectDetails;
    this.setSubject(subject);
  }

  clear(): void {
    this.setSubject(null);
  }
}

@Injectable()
export class StandardSubjectService<D extends SubjectDetails, S extends Subject<D>> extends SubjectService<D, S> implements OnDestroy {

  private subject: BehaviorSubject<S> = new BehaviorSubject<S>(null);

  subject$: Observable<S | null> = this.subject.asObservable();

  authorities$: Observable<string[] | null> = this.subject$.pipe(
    map(subject => subject && subject.authorities || null)
  );
  details$: Observable<D | null> = this.subject$.pipe(
    map(subject => subject && subject.details || null)
  );
  displayName$: Observable<string | null> = this.details$.pipe(
    map(details => details && details.displayName || null)
  );
  isAuthorized$: Observable<boolean> = this.subject$.pipe(
    map(subject => subject && subject.authorities && subject.authorities.length >= 0)
  );

  ngOnDestroy(): void {
    this.subject.complete();
  }

  getSubject(): S | null {
    return this.subject.getValue();
  }

  protected setSubject(subject: S | null) {
    this.subject.next(subject);
  }
}
