import { AuthTokens } from './auth-tokens';

function defaultMapper(tokens: any): AuthTokens {
  tokens = tokens || {};
  return {
    accessToken: tokens['access_token'] || tokens['accessToken'] || null,
    refreshToken: tokens['refresh_token'] || tokens['refreshToken'] || null
  };
}

export class TokensServiceOptions {
  /**
   * Token mapper. Default is {@link defaultMapper}
   */
  mapper?: (tokens: any) => AuthTokens;

  constructor(opt?: TokensServiceOptions) {
    this.mapper = opt && opt.mapper || defaultMapper;
  }
}
