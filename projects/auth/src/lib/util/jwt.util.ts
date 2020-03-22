import { Base64Util } from './base64.util';

export class JwtUtil {

  /**
   * Decode JWT token
   *
   * @param token: JWT string
   */
  static decodeToken<T>(token: string): T {
    if (!token || token === '') {
      return null;
    }

    const parts = token.split('.');

    if (parts.length !== 3) {
      throw new Error(
        'The inspected token doesn\'t appear to be a JWT. Check to make sure it has three parts and see https://jwt.io for more.'
      );
    }

    const decoded = Base64Util.urlDecode(parts[1]);
    if (!decoded) {
      throw new Error('Cannot decode the token.');
    }

    return JSON.parse(decoded);
  }

  /**
   * Get JWT token expiration date
   *
   * @param token: JWT string
   */
  static getTokenExpirationDate(token: string): Date | null {
    const decoded: any = JwtUtil.decodeToken(token);

    if (!decoded || !decoded.hasOwnProperty('exp')) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);

    return date;
  }

  /**
   * Return if token is expired
   *
   * @param token: JWT string
   * @param offsetSeconds: offset from expiration date
   */
  static isTokenExpired(token: string, offsetSeconds?: number): boolean {
    if (!token || token === '') {
      return true;
    }
    const date = JwtUtil.getTokenExpirationDate(token);
    offsetSeconds = offsetSeconds || 0;

    if (date === null) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
  }
}
