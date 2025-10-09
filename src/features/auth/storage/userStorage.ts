import { dataStorage } from "../../../lib/storage";

export const userStorage = dataStorage<string | null>("token");
