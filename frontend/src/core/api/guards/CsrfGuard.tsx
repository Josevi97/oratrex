import { Outlet } from 'react-router-dom';
import useApiCsrf from '../hooks/useApiCsrf';

const CsrfGuard = () => {
  const { isSuccess } = useApiCsrf();

  if (!isSuccess) return null;

  return <Outlet />;
};

export default CsrfGuard;
