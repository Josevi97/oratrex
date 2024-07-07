import { useEffect } from 'react';
import { useAuth } from '../../features/authentication/providers/AuthProvider';
import styles from './LoginPage.module.scss';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { state: authState, actions: authActions } = useAuth();

  const navigate = useNavigate();

  const login = () => {
    authActions.login();
  };

  useEffect(() => {
    if (authState.auth) {
      navigate('/user');
    }
  }, [authState.auth]);

  return (
    <div className={styles.container}>
      <button onClick={login}>Login</button>
    </div>
  );
};

export default LoginPage;
