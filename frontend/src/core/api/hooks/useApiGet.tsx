import { AxiosRequestConfig } from 'axios';
import { useAuth } from '../../../features/authentication/providers/AuthProvider';
import apiService from '../services/api.service';
import { useEffect, useReducer } from 'react';

type State<T extends object> = {
  isLoading: boolean;
  isSuccess: boolean;
  hasError: boolean;
  data: T | null;
};

type Action<T> =
  | {
      type: 'success';
      payload: {
        data: T;
      };
    }
  | {
      type: 'loading';
    }
  | {
      type: 'error';
    };

const makeReducer = <T extends object>() => {
  return (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return { ...state, isLoading: false, isSuccess: true, hasError: false };
      case 'success':
        return {
          isLoading: false,
          isSuccess: true,
          hasError: false,
          data: action.payload.data,
        };
      case 'error':
        return { ...state, isLoading: false, isSuccess: false, hasError: true };
      default:
        throw new Error('Unrecognized action type');
    }
  };
};

const useApiGet = <T extends object>(
  resource: string,
  config?: AxiosRequestConfig<unknown>
) => {
  const { state: authState } = useAuth();

  const [state, dispatch] = useReducer(makeReducer<T>(), {
    isLoading: false,
    isSuccess: false,
    hasError: false,
    data: null,
  });

  useEffect(() => {
    dispatch({ type: 'loading' });

    apiService
      .get<T>(resource, {
        ...config,
        headers: {
          ...config?.headers,
          Authorization: `Bearer ${authState.auth?.accessToken}`,
        },
      })
      .then((result) =>
        dispatch({ type: 'success', payload: { data: result.data } })
      )
      .catch(() => dispatch({ type: 'error' }));
  }, []);

  return state;
};

export default useApiGet;
