import { useSession } from '../../features/session/providers/SessionProvider';
import styles from './UserPage.module.scss';

const UserPage = () => {
  const { state: sessionState } = useSession();

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>¡Escanea tú código!</h1>
      <div className={styles.event}>
        <span>Nuevo evento en</span>
        <span className={styles.address}>{sessionState.user?.address}</span>
      </div>
      <div className={styles.codeQr}>
        <img
          width={270}
          src={sessionState.user?.qr}
          alt="Código qr del usuario"
        />
        <span className={styles.code}>{sessionState.user?.code}</span>
      </div>
    </div>
  );
};

export default UserPage;
