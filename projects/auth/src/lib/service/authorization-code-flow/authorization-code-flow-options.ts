import { AuthFlowOptions, AuthFlowType } from '../auth-flow-options';

export class AuthorizationCodeFlowOptions extends AuthFlowOptions {
  /**
   * Login URL
   */
  loginUrl?: string;
  /**
   * Token URL for obtaining access token and refresh token
   */
  tokenUrl?: string;
  /**
   * Dummy client secret if {@link useHttpBasicAuth} is set to true
   */
  clientSecret?: string;
  /**
   * Include clientId and clientSecret as basic authorization header when fetching tokens. Default value is true.
   */
  useHttpBasicAuth?: boolean;
  /**
   * OAuth2 response type. Default is 'code'
   */
  responseType?: 'code' | string;
  /**
   * Prevent clear hash after login. By default we clear authorization state un URL.
   */
  preventClearHashAfterLogin?: boolean;
  disablePKCE?: boolean;

  constructor(opt?: AuthorizationCodeFlowOptions) {
    super(AuthFlowType.AUTHORIZATION_CODE, opt as AuthFlowOptions);
    this.loginUrl = opt && opt.loginUrl || null;
    this.tokenUrl = opt && opt.tokenUrl || null;
    this.clientSecret = opt && opt.clientSecret || null;
    this.useHttpBasicAuth = opt && opt.useHttpBasicAuth || null;
    this.responseType = opt && opt.responseType || 'code';
    this.preventClearHashAfterLogin = opt && opt.preventClearHashAfterLogin || false;
    this.disablePKCE = opt && opt.disablePKCE || null;
  }
}
