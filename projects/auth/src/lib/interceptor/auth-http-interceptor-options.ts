export class AuthHttpInterceptorOptions {
  /**
   * Whitelisted domains where access token will be added as authorization header. By default none domain is whitelisted.
   * Examples:
   * 1. [new RegExp(".&ast;/my-api.&ast;")]
   * 2. ["https://example.com/my-auth-api/users/me"]
   */
  whitelistedDomains?: (RegExp | string)[];

  constructor(opt?: AuthHttpInterceptorOptions) {
    this.whitelistedDomains = opt && opt.whitelistedDomains || [];
  }
}
