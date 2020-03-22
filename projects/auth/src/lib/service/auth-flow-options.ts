export class AuthFlowOptions {
  /**
   * Client ID
   */
  clientId?: string;
  /**
   * Scopes
   */
  scope?: string;
  /**
   * Resource
   */
  resource?: string;

  constructor(opt?: AuthFlowOptions) {
    this.clientId = opt && opt.clientId || null;
    this.scope = opt && opt.scope || null;
    this.resource = opt && opt.resource || null;
  }
}
