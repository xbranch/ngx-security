import { AuthFlowOptions, AuthFlowType } from '../auth-flow-options';

export class PasswordFlowOptions extends AuthFlowOptions {
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

  constructor(opt?: PasswordFlowOptions) {
    super(AuthFlowType.PASSWORD, opt as AuthFlowOptions);
    this.tokenUrl = opt && opt.tokenUrl || null;
    this.clientSecret = opt && opt.clientSecret || null;
    this.useHttpBasicAuth = opt && opt.useHttpBasicAuth || true;
  }
}
