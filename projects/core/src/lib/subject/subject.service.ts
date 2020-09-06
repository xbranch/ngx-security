import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class SubjectDetails {
  displayName: string;
}

export abstract class Subject {
  credentials: string;
  authorities: string[];
  details: SubjectDetails;
}

export abstract class SubjectService<T extends Subject = any> {
  abstract subject$: Observable<T | null>;
  abstract authorities$: Observable<string[] | null>;
  abstract details$: Observable<SubjectDetails | null>;
  abstract displayName$: Observable<string | null>;
  abstract isAuthorized$: Observable<boolean>;

  abstract getSubject(): T | null;

  protected abstract setSubject(subject: T | null): void;

  getAuthorities(): string[] {
    const subject = this.getSubject();
    return subject && subject.authorities || [];
  }

  update(subject: T): void {
    subject.credentials = null;
    this.setSubject(subject);
  }

  updateDetails(subjectDetails: SubjectDetails): void {
    const subject = {...<any>this.getSubject()};
    subject.details = subjectDetails;
    this.setSubject(subject);
  }

  clear(): void {
    this.setSubject(null);
  }
}

@Injectable()
export class StandardSubjectService<T extends Subject = any> extends SubjectService<T> implements OnDestroy {

  private subject: BehaviorSubject<T> = new BehaviorSubject<T>(null);

  subject$: Observable<T | null> = this.subject.asObservable();

  authorities$: Observable<string[] | null> = this.subject$.pipe(
    map(subject => subject && subject.authorities || null)
  );
  details$: Observable<SubjectDetails | null> = this.subject$.pipe(
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

  getSubject(): T | null {
    return this.subject.getValue();
  }

  protected setSubject(subject: T | null) {
    this.subject.next(subject);
  }
}
