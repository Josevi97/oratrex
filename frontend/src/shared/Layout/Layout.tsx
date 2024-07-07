import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/authentication/providers/AuthProvider';
import styles from './Layout.module.scss';

const Layout = () => {
  const { state: authState, actions: authActions } = useAuth();

  const navigate = useNavigate();

  const onLogoClick = () => {
    navigate('/');
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  const navigateToUser = () => {
    navigate('/user');
  };

  const logout = () => {
    authActions.logout();
  };

  const onClick = () => {
    const callback = authState.auth ? logout : navigateToLogin;
    callback();
  };

  const buttonText = authState.auth ? 'Desconectar' : 'Iniciar sesión';

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.leftHeader}>
          <button onClick={onLogoClick}>
            <h2 className={styles.logo}>Oratrex</h2>
          </button>
          <button onClick={navigateToUser} className={styles.button}>
            Perfil
          </button>
        </div>
        <button className={styles.button} onClick={onClick}>
          {buttonText}
        </button>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
