import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

type ModalProps = {
  isOpen: boolean;
  onRequestClose(): void;
  children?: React.ReactNode;
  className?: string;
};

const Modal = (props: ModalProps) => {
  if (!props.isOpen) return null;

  return createPortal(
    <div className={styles.container}>
      <button className={styles.background} onClick={props.onRequestClose} />
      <div className={[styles.content, props.className].join(' ')}>
        {props.children}
      </div>
    </div>,
    document.getElementById('modals')!
  );
};

export default Modal;
