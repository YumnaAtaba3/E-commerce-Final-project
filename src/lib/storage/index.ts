
function checkIsBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}


const defaultGetStorage = (): Storage => {
  if (!checkIsBrowser()) {
   
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
      key: () => null,
      length: 0,
    } as Storage;
  }
  return localStorage;
};

export function dataStorage<T = unknown>(
  key: string,
  getStorage: () => Storage = defaultGetStorage
) {
  const storage = getStorage();

  return {
   set: (data: T): void => {
  if (!checkIsBrowser()) return;
  try {
    const value =
      typeof data === "string" ? (data as string) : JSON.stringify(data);
    storage.setItem(key, value);
  } catch (err) {
    console.error(`Failed to set ${key} in storage`, err);
  }
},

get: (): T | undefined => {
  if (!checkIsBrowser()) return undefined;
  try {
    const value = storage.getItem(key);
    if (!value) return undefined;
    try {
      return JSON.parse(value) as T;
    } catch {
      return value as unknown as T;
    }
  } catch {
    return undefined;
  }
},


    remove: (): void => {
      if (!checkIsBrowser()) return;
      try {
        storage.removeItem(key);
      } catch (err) {
        console.error(` Failed to remove ${key} from storage`, err);
      }
    },
  };
}

export function dataSessionStorage<T = unknown>(key: string) {
  return dataStorage<T>(key, () => sessionStorage);
}
