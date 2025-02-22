export class StorageService {
  static get<T>(key: string, defaultValue: T): T {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    try {
      return JSON.parse(item);
    } catch {
      return defaultValue;
    }
  }

  static set(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}