import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import SessionProvider from '../../session/providers/SessionProvider';
import Layout from '../../../shared/Layout/Layout';

const AuthGuard = () => {
  const { state: authState } = useAuth();

  if (!authState.hasInitialized) return null;
  if (!authState.auth) return <Navigate to="/login" />;

  return (
    <SessionProvider>
      <Layout>{<Outlet />}</Layout>
    </SessionProvider>
  );
};

export default AuthGuard;
