import useApiGet from './useApiGet';
import { Csrf } from '../../csrf/types/csrf';
import { useEffect } from 'react';
import csrfService from '../../csrf/services/csrf.service';

const useApiCsrf = () => {
  const { data, isLoading, isSuccess, hasError } = useApiGet<Csrf>(['csrf']);

  useEffect(() => {
    if (isLoading) return;
    if (hasError) return;

    if (data && isSuccess) {
      csrfService.saveCsrf(data);
    }
  }, [data, isLoading, isSuccess, hasError]);

  return {
    isSuccess: !!data && isSuccess && !isLoading && !hasError,
  };
};

export default useApiCsrf;
