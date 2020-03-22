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

  constructor(opt?: TokensServiceOptions) {
    this.tokenUrl = opt && opt.tokenUrl || null;
    this.clientId = opt && opt.clientId || null;
    this.clientSecret = opt && opt.clientSecret || null;
    this.useHttpBasicAuth = opt && opt.useHttpBasicAuth || true;
  }
}
