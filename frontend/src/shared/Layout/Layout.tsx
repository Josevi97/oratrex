import { useAuth } from '../../features/authentication/providers/AuthProvider';
import styles from './Layout.module.scss';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  const { actions: authActions } = useAuth();

  const logout = () => {
    authActions.logout();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.logo}>Oratrex</h2>
        <button onClick={logout}>Desconectar</button>
      </div>
      {props.children}
    </div>
  );
};

export default Layout;
