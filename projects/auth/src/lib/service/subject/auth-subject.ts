import { AuthSubjectDetails } from './auth-subject-details';

export abstract class AuthSubject<T extends AuthSubjectDetails> {
  principal: string;
  authorities: string[];
  details: T;
}
