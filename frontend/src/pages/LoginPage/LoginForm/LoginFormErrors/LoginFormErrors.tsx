import styles from './LoginFormErrors.module.scss';

type LoginFormErrorsProps = {
  errors: string[];
};

const LoginFormErrors = (props: LoginFormErrorsProps) => {
  return (
    <div
      className={[styles.container, props.errors.length && styles.show].join(
        ' '
      )}
    >
      {props.errors.map((error) => {
        return (
          <p key={error} className={styles.errorMessage}>
            {error}
          </p>
        );
      })}
    </div>
  );
};

export default LoginFormErrors;
