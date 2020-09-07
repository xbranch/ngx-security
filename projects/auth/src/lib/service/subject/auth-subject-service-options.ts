import { Subject, SubjectDetails } from '@ngx-security/core';

function defaultMapper<D extends SubjectDetails, S extends Subject<D>>(jwt: any): S {
  jwt = jwt || {};
  return {
    principal: jwt['user_name'] || jwt['username'] || jwt['email'] || null,
    authorities: jwt['authorities'] || [],
    details: jwt
  } as S;
}

export class AuthSubjectServiceOptions<D extends SubjectDetails, S extends Subject<D>> {
  /**
   * Subject mapper. Default is {@link defaultMapper}
   */
  mapper?: (jwt: any) => S;

  constructor(opt?: AuthSubjectServiceOptions<D, S>) {
    this.mapper = opt && opt.mapper || defaultMapper;
  }
}
