export class AuthHttpInterceptorOptions {
  /**
   * Whitelisted URLs where access token will be added as authorization header. By default none URL is whitelisted.
   * Examples:
   * 1. [new RegExp(".&ast;/my-api.&ast;")]
   * 2. ["https://example.com/my-auth-api/users/me"]
   */
  whitelistedUrls?: (RegExp | string)[];

  constructor(opt?: AuthHttpInterceptorOptions) {
    this.whitelistedUrls = opt && opt.whitelistedUrls || [];
  }
}
