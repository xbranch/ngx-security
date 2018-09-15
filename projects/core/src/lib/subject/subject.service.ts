import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface SubjectDetails {
  displayName: string;
}

export interface Subject {
  credentials: string;
  authorities: string[];
  details: SubjectDetails;
}

export abstract class SubjectService<T extends Subject> implements OnDestroy {

  private subject: BehaviorSubject<T> = new BehaviorSubject<T>(null);

  subject$: Observable<T | null> = this.subject.asObservable();
  authorities$: Observable<string[] | null> = this.subject$.pipe(
    map(subject => subject && subject.authorities || null)
  );
  details$: Observable<SubjectDetails | null> = this.subject$.pipe(
    map(subject => subject && subject.details || null)
  );
  name$: Observable<string | null> = this.details$.pipe(
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

  update(subject: T): void {
    subject.credentials = null;
    this.subject.next(subject);
  }

  updateDetails(subjectDetails: SubjectDetails): void {
    const subject = {...<any>this.getSubject()};
    subject.details = subjectDetails;
    this.subject.next(subject);
  }

  clear(): void {
    this.subject.next(null);
  }
}

@Injectable()
export class SimpleSubjectProvider extends SubjectService<any> {
}
