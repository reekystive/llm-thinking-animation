export interface LocalStorageData {
  theme: 'light' | 'dark' | 'system';
}

const cache = new Map<keyof LocalStorageData, string>();

export const localStorageWithCache = {
  getItem: (key: keyof LocalStorageData): LocalStorageData[keyof LocalStorageData] | null => {
    if (cache.has(key)) {
      return cache.get(key) as LocalStorageData[keyof LocalStorageData];
    }
    const value = localStorage.getItem(key) as LocalStorageData[keyof LocalStorageData] | null;
    if (value) {
      cache.set(key, value);
      return value;
    }
    return null;
  },
  setItem: (key: keyof LocalStorageData, value: LocalStorageData[keyof LocalStorageData]) => {
    localStorage.setItem(key, value);
    cache.set(key, value);
  },
};
