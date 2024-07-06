import { Auth } from '../types/auth';
import apiService from '../../../core/api/services/api.service';

const cookieKey = 'auth';

const saveCookie = (auth: Auth) => {
  const date = new Date(auth.expiresAt);
  document.cookie = `${cookieKey}=${encodeURIComponent(JSON.stringify(auth))};expires=${date}`;
};

const getCookie = (): Auth | null => {
  const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
  if (!cookies.length) return null;

  const formattedCookies: { [key: string]: string } = Object.fromEntries(
    cookies.map((cookie) => cookie.split('='))
  );

  const auth = formattedCookies[cookieKey];
  if (!auth) return null;

  return JSON.parse(decodeURIComponent(auth));
};

type AuthService = {
  login(username: string, password: string): Promise<Auth | null>;
  getSession(): Auth | null;
  logout(): void;
};

const authService = (): AuthService => {
  const login = async (
    username: string,
    password: string
  ): Promise<Auth | null> => {
    const data = { username, password };
    const response = await apiService.post<Auth>('auth', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const auth = response.data;
    saveCookie(auth);

    return response.data;
  };

  const getSession = (): Auth | null => getCookie();

  const logout = () => {};

  return {
    login,
    getSession,
    logout,
  };
};

export default authService();
