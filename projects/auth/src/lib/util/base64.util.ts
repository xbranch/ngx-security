export class Base64Util {

  /**
   * Decode base64 value
   *
   * <br/>
   * <i>credits for decoder goes to https://github.com/atk</i>
   *
   *  @param value: base64 value
   */
  static decode(value: string): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output = '';

    value = String(value).replace(/=+$/, '');

    if (value.length % 4 === 1) {
      throw new Error('\'atob\' failed: The string to be decoded is not correctly encoded.');
    }

    for (
      // initialize result and counters
      let bc = 0, bs: any, buffer: any, idx = 0;
      // get next character
      (buffer = value.charAt(idx++));
      // character found in table? initialize bit storage and add its ascii value;
      ~buffer &&
      (
        (bs = bc % 4 ? bs * 64 + buffer : buffer),
          // and if not first of each 4 characters,
          // convert the first 8 bits to one ascii character
        bc++ % 4
      )
        ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
        : 0
    ) {
      // try to find character in table (0-63, not found => -1)
      buffer = chars.indexOf(buffer);
    }
    return output;
  }

  /**
   * Decode base64 value
   *
   * @param value: base64 value
   */
  static decodeUnicode(value: string): string {
    const fn = (c: any) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    return decodeURIComponent(Array.prototype.map.call(Base64Util.decode(value), fn).join(''));
  }

  /**
   * Decode url-base64 value
   *
   * @param value: url-base64 encoded
   */
  static urlDecode(value: string): string {
    let output = value
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw new Error('Illegal base64url string!');
    }

    return Base64Util.decodeUnicode(output);
  }

  /**
   * Encode in url-base64 format
   *
   * @param value: plain text
   */
  static urlEncode(value: string): string {
    const base64 = btoa(value);
    return base64
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }
}
