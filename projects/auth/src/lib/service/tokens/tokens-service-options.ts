import { AuthToken } from './auth-token';
import { AuthSubject } from '../subject/auth-subject';

function defaultTokenMapper(token: any): AuthToken {
  token = token || {};
  return {
    accessToken: token['access_token'] || token['accessToken'] || null,
    refreshToken: token['refresh_token'] || token['refreshToken'] || null
  };
}

function defaultSubjectMapper(jwt: any): AuthSubject<any> {
  jwt = jwt || {};
  return {
    principal: jwt['user_name'] || jwt['username'] || jwt['email'] || null,
    authorities: jwt['authorities'] || [],
    details: jwt
  };
}

export class TokensServiceOptions {
  /**
   * Token URL for refresh_token and authorization_code grant types
   */
  tokenUrl?: string;
  /**
   * Client ID
   */
  clientId?: string;
  /**
   * Dummy client secret if {@link useHttpBasicAuth} is set to true
   */
  clientSecret?: string;
  /**
   * Include clientId and clientSecret as basic authorization header when fetching tokens. Default value is true.
   */
  useHttpBasicAuth?: boolean;
  /**
   * Token mapper. Default is {@link defaultTokenMapper}
   */
  tokenMapper?: (token: any) => AuthToken;
  /**
   * Subject mapper. Default is {@link defaultSubjectMapper}
   */
  subjectMapper?: (jwt: any) => AuthSubject<any>;

  constructor(opt?: TokensServiceOptions) {
    this.tokenUrl = opt && opt.tokenUrl || null;
    this.clientId = opt && opt.clientId || null;
    this.clientSecret = opt && opt.clientSecret || null;
    this.useHttpBasicAuth = opt && opt.useHttpBasicAuth || true;
    this.tokenMapper = opt && opt.tokenMapper || defaultTokenMapper;
    this.subjectMapper = opt && opt.subjectMapper || defaultSubjectMapper;
  }
}
