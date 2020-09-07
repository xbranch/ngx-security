import { AuthSubject } from './auth-subject';

function defaultMapper(jwt: any): AuthSubject<any> {
  jwt = jwt || {};
  return {
    principal: jwt['user_name'] || jwt['username'] || jwt['email'] || null,
    authorities: jwt['authorities'] || [],
    details: jwt
  };
}

export class AuthSubjectServiceOptions {
  /**
   * Subject mapper. Default is {@link defaultMapper}
   */
  mapper?: (jwt: any) => AuthSubject<any>;

  constructor(opt?: AuthSubjectServiceOptions) {
    this.mapper = opt && opt.mapper || defaultMapper;
  }
}
