// src/lib/storage/index.ts
function checkIsBrowser(): boolean {
  return typeof window !== "undefined";
}

const defaultGetStorage = (): Storage | null =>
  checkIsBrowser() ? localStorage : null;

export function dataStorage<T = unknown>(
  key: string,
  getStorage: () => Storage | null = defaultGetStorage
) {
  const storage = getStorage();

  return {
    set: (data: T): void => {
      if (!checkIsBrowser() || !storage) return;
      storage.setItem(key, JSON.stringify(data));
    },
    get: (): T | undefined => {
      if (!checkIsBrowser() || !storage) return undefined;
      const json = storage.getItem(key);
      if (!json) return undefined;
      try {
        return JSON.parse(json) as T;
      } catch {
        return json as unknown as T;
      }
    },
    remove: (): void => {
      if (!checkIsBrowser() || !storage) return;
      storage.removeItem(key);
    },
  };
}

export function dataSessionStorage<T = unknown>(key: string) {
  return dataStorage<T>(key, () => sessionStorage);
}

