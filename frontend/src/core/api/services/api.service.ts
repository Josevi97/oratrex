import axios, { AxiosRequestConfig } from 'axios';
import csrfService from '../../csrf/services/csrf.service';

type ApiService = {
  get<T>(
    resource: string,
    config?: AxiosRequestConfig<unknown>
  ): Promise<{ data: T }>;
  post<T>(
    resource: string,
    data: unknown,
    config?: AxiosRequestConfig<unknown>
  ): Promise<{ data: T }>;
};

const instance = axios.create({
  baseURL: 'http://0.0.0.0:3000/api',
});

const apiService = (): ApiService => {
  const get = async <T>(
    resource: string,
    config?: AxiosRequestConfig<unknown>
  ): Promise<{ data: T }> => {
    return new Promise((resolve, reject) => {
      instance
        .get<{ data: T }>(resource, config)
        .then((result) => resolve({ data: result.data.data }))
        .catch((error) => reject(error));
    });
  };

  const post = async <T>(
    resource: string,
    data?: unknown,
    config?: AxiosRequestConfig<unknown>
  ): Promise<{ data: T }> => {
    return new Promise((resolve, reject) => {
      instance
        .post<{ data: T }>(resource, data, {
          ...config,
          headers: {
            'Content-Type': 'application/json',
            // FIXME: This is not working as expected
            'X-CSRF-TOKEN': csrfService.loadCsrf()?.csrfToken,
            ...config?.headers,
          },
        })
        .then((result) => resolve({ data: result.data.data }))
        .catch((error) => reject(error));
    });
  };

  return {
    get,
    post,
  };
};

export default apiService();
