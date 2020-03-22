export class SessionStorageUtil {

  /**
   * Stringify to JSON string value and save it to session-storage
   *
   * @param key as string
   * @param value as any
   */
  static put<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Read value from session-storage and parse it as JSON.
   *
   * @param key as string
   */
  static get<T>(key: string): T | null {
    const item = sessionStorage.getItem(key);
    if (!item) {
      return null;
    }
    return JSON.parse(item);
  }

  /**
   * Remove value from session-storage
   *
   * @param key as string
   */
  static remove(key: string): void {
    sessionStorage.removeItem(key);
  }
}
