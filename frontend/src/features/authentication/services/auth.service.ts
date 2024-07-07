import { Auth } from '../types/auth';
import apiService from '../../../core/api/services/api.service';
import cookiesService from '../../../core/cookies/services/cookies.service';

const cookieKey = 'auth';

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

    const response = await apiService.post<Auth>('auth', data);

    const auth = response.data;
    cookiesService.saveCookie(cookieKey, auth, new Date(auth.expiresAt));

    return response.data;
  };

  const getSession = (): Auth | null => {
    return cookiesService.getCookie<Auth>(cookieKey);
  };

  const logout = () => {
    const date = new Date();
    document.cookie = `${cookieKey}=;expires=${date}`;
  };

  return {
    login,
    getSession,
    logout,
  };
};

export default authService();
