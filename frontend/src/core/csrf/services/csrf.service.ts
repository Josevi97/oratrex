import cookiesService from '../../cookies/services/cookies.service';
import { Csrf } from '../types/csrf';

const cookieKey = 'csrf';

type CsrfService = {
  saveCsrf(csrf: Csrf): void;
  loadCsrf(): Csrf | null;
};

const csrfService = (): CsrfService => {
  const saveCsrf = (csrf: Csrf): void => {
    cookiesService.saveCookie(cookieKey, csrf, null);
  };

  const loadCsrf = (): Csrf | null => cookiesService.getCookie<Csrf>(cookieKey);

  return {
    saveCsrf,
    loadCsrf,
  };
};

export default csrfService();
