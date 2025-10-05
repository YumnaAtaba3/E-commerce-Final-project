import { userStorage } from '../storage/userStorage';


export function logoutHelper(fallbackUrl = '/login') {
  userStorage.remove();
  window.location.href = fallbackUrl;
}

