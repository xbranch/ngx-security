export enum AuthFlowType {
  PASSWORD = 'PASSWORD',
  IMPLICIT = 'IMPLICIT',
  AUTHORIZATION_CODE = 'AUTHORIZATION_CODE',
  CLIENT_CREDENTIALS = 'CLIENT_CREDENTIALS'
}

export class AuthFlowOptions {
  /**
   * Flow type
   */
  type?: AuthFlowType;
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

  constructor(type: AuthFlowType, opt?: AuthFlowOptions) {
    this.type = type;
    this.clientId = opt && opt.clientId || null;
    this.scope = opt && opt.scope || null;
    this.resource = opt && opt.resource || null;
  }
}
