import AsyncStorage from "@react-native-async-storage/async-storage";

export class StorageService {
  static async getItem<T>(key: string, fallbackValue: T): Promise<T> {
    try {
      const storedValue = await AsyncStorage.getItem(key);

      if (!storedValue) {
        return fallbackValue;
      }

      return JSON.parse(storedValue) as T;
    } catch {
      return fallbackValue;
    }
  }

  static async setItem<T>(key: string, value: T): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }
}