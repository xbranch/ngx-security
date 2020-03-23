import { AuthSubject } from './auth-subject';

function defaultSubjectMapper(jwt: any): AuthSubject<any> {
  jwt = jwt || {};
  return {
    principal: jwt['user_name'] || jwt['username'] || jwt['email'] || null,
    authorities: jwt['authorities'] || [],
    details: jwt
  };
}

export class AuthSubjectServiceOptions {
  /**
   * Subject mapper. Default is {@link defaultSubjectMapper}
   */
  subjectMapper?: (jwt: any) => AuthSubject<any>;

  constructor(opt?: AuthSubjectServiceOptions) {
    this.subjectMapper = opt && opt.subjectMapper || defaultSubjectMapper;
  }
}
