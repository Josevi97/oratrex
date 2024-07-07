import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import SessionProvider from '../../session/providers/SessionProvider';

const AuthGuard = () => {
  const { state: authState } = useAuth();

  if (!authState.hasInitialized) return null;
  if (!authState.auth) return <Navigate to="/login" />;

  return (
    <SessionProvider>
      <Outlet />
    </SessionProvider>
  );
};

export default AuthGuard;
