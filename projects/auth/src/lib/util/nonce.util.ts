import { Base64Util } from './base64.util';
import { SessionStorageUtil } from './session-storage.util';

export class NonceUtil {

  static createNonce(): string {
    const unreserved = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let size = 45;
    let id = '';

    const crypto = typeof self === 'undefined' ? null : (self.crypto || self['msCrypto']);
    if (crypto) {
      let bytes = new Uint8Array(size);
      crypto.getRandomValues(bytes);
      bytes = bytes.map(x => unreserved.charCodeAt(x % unreserved.length));
      id = String.fromCharCode.apply(null, bytes);
    } else {
      while (0 < size--) {
        id += unreserved[Math.random() * unreserved.length | 0];
      }
    }
    return Base64Util.urlEncode(id);
  }

  static createAndSaveNonce(): string {
    const nonce = NonceUtil.createNonce();
    SessionStorageUtil.put('nonce', nonce);
    return nonce;
  }
}
