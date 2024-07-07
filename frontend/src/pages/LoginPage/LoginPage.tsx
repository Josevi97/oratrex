import { useEffect } from 'react';
import { useAuth } from '../../features/authentication/providers/AuthProvider';
import styles from './LoginPage.module.scss';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm/LoginForm';

const LoginPage = () => {
  const { state: authState, actions: authActions } = useAuth();

  const navigate = useNavigate();

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    return authActions.login(username, password);
  };

  useEffect(() => {
    if (authState.auth) {
      navigate('/user');
    }
  }, [authState.auth]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm onSubmit={login} />
      </div>
    </div>
  );
};

export default LoginPage;
