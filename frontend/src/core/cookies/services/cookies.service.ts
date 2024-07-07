type CookiesService = {
  saveCookie(key: string, value: unknown, expiresAt: Date | null): void;
  getCookies(): { [key: string]: string } | null;
  getCookie<T>(key: string): T | null;
};

const cookiesService = (): CookiesService => {
  const saveCookie = (key: string, value: unknown, expiresAt: Date | null) => {
    if (expiresAt) {
      document.cookie = `${key}=${encodeURIComponent(JSON.stringify(value))};expires=${expiresAt}`;
    } else {
      document.cookie = `${key}=${encodeURIComponent(JSON.stringify(value))}`;
    }
  };

  const getCookies = (): { [key: string]: string } | null => {
    const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
    if (!cookies.length) return null;

    const formattedCookies: { [key: string]: string } = Object.fromEntries(
      cookies.map((cookie) => cookie.split('='))
    );

    return formattedCookies;
  };

  const getCookie = <T>(key: string): T | null => {
    const cookies = getCookies();
    if (!cookies) return null;

    const auth = cookies[key];
    if (!auth) return null;

    return JSON.parse(decodeURIComponent(auth));
  };

  return {
    saveCookie,
    getCookies,
    getCookie,
  };
};

export default cookiesService();
