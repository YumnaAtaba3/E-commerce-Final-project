export function checkIsBrowser(): boolean {
  return typeof window !== "undefined";
}

const defaultGetStorage = (): Storage | null =>
  checkIsBrowser() ? localStorage : null;

export const dataStorage = <T>(
  key: string,
  getStorage: () => Storage | null = defaultGetStorage
) => {
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
};

// Session storage variant
export const dataSessionStorage = <T>(key: string) =>
  dataStorage<T>(key, () => (checkIsBrowser() ? sessionStorage : null));

// ✅ Add this for user token storage
export const userStorage = dataStorage<string>("token");
