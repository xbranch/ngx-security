import { AuthFlowOptions, AuthFlowType } from '../auth-flow-options';

export class ImplicitFlowOptions extends AuthFlowOptions {
  /**
   * Login URL
   */
  loginUrl?: string;
  /**
   * OAuth2 response type. Default is 'token'
   */
  responseType?: 'token' | 'id_token' | string;
  /**
   * Prevent clear hash after login. By default we clear authorization state un URL.
   */
  preventClearHashAfterLogin?: boolean;

  constructor(opt?: ImplicitFlowOptions) {
    super(AuthFlowType.IMPLICIT, opt as AuthFlowOptions);
    this.loginUrl = opt && opt.loginUrl || null;
    this.responseType = opt && opt.responseType || 'token';
    this.preventClearHashAfterLogin = opt && opt.preventClearHashAfterLogin || false;
  }
}
