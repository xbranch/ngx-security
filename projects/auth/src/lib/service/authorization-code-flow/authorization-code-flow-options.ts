import { AuthFlowOptions } from '../auth-flow-options';

export class AuthorizationCodeFlowOptions extends AuthFlowOptions {
  /**
   * Login URL
   */
  loginUrl?: string;
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
    super(opt as AuthFlowOptions);
    this.loginUrl = opt && opt.loginUrl || null;
    this.responseType = opt && opt.responseType || 'code';
    this.preventClearHashAfterLogin = opt && opt.preventClearHashAfterLogin || false;
    this.disablePKCE = opt && opt.disablePKCE || null;
  }
}
