export class AuthToken {
  /**
   * Access token value
   */
  access_token: string;
  /**
   * Refresh token (available in password and code oauth2 flow)
   */
  refresh_token?: string;
}
