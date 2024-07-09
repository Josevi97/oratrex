import Modal from '../Modal';
import styles from './WarningModal.module.scss';

type WarningModal = {
  isOpen: boolean;
  header: string;
  message: string;
  children?: React.ReactNode;

  onRequestClose(): void;
};

const WarningModal = (props: WarningModal) => {
  return (
    <Modal
      className={styles.container}
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
    >
      <div className={styles.content}>
        <h2>{props.header}</h2>
        <p>{props.message}</p>
      </div>
      <button onClick={props.onRequestClose}>Aceptar</button>
    </Modal>
  );
};

export default WarningModal;
