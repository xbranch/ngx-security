export class AuthTokens {
  /**
   * Access token value
   */
  accessToken: string;
  /**
   * Refresh token (available in password and authorization-code flow)
   */
  refreshToken?: string;
}
