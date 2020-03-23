import { AuthToken } from './auth-token';

function defaultTokenMapper(token: any): AuthToken {
  token = token || {};
  return {
    accessToken: token['access_token'] || token['accessToken'] || null,
    refreshToken: token['refresh_token'] || token['refreshToken'] || null
  };
}

export class TokensServiceOptions {
  /**
   * Token mapper. Default is {@link defaultTokenMapper}
   */
  tokenMapper?: (token: any) => AuthToken;

  constructor(opt?: TokensServiceOptions) {
    this.tokenMapper = opt && opt.tokenMapper || defaultTokenMapper;
  }
}
