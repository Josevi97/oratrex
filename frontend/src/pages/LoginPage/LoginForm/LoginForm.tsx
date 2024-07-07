import { useReducer } from 'react';
import LoginFormErrors from './LoginFormErrors/LoginFormErrors';

import styles from './LoginForm.module.scss';

const username = 'kathleen34';
const password = 'aaa2848c13da';

type State = {
  hasInitialized: boolean;
  isLoading: boolean;
  hasError: boolean;
  username: string;
  password: string;
  usernameErrors: string[];
  passwordErrors: string[];
};

type Action =
  | {
      type: 'username';
      payload: { username: string };
    }
  | {
      type: 'password';
      payload: { password: string };
    }
  | {
      type: 'loading';
    }
  | {
      type: 'error';
    };

const initialState: State = {
  hasInitialized: false,
  isLoading: false,
  hasError: false,
  username,
  password,
  usernameErrors: [],
  passwordErrors: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        hasInitialized: true,
        isLoading: true,
        hasError: false,
      };
    case 'error':
      return {
        ...state,
        hasInitialized: true,
        isLoading: false,
        hasError: true,
      };
    case 'username': {
      const uname = action.payload.username;
      const usernameErrors = [
        ...[uname.length < 4 ? 'No puede tener menos de 3 letras' : ''],
        ...[
          uname.replace(/\s+/g, ' ').includes(' ')
            ? 'No puede contener espacios'
            : '',
        ],
      ].filter((error) => error);
      return {
        ...state,
        hasInitialized: true,
        username: action.payload.username,
        usernameErrors,
      };
    }
    case 'password': {
      const pass = action.payload.password;
      const passwordErrors = [
        ...[pass.length < 4 ? 'No puede tener menos de 3 letras' : ''],
        ...[
          pass.replace(/\s+/g, ' ').includes(' ')
            ? 'No puede contener espacios'
            : '',
        ],
      ].filter((error) => error);

      return {
        ...state,
        hasInitialized: true,
        username: action.payload.password,
        passwordErrors,
      };
    }
    default:
      throw new Error('Unimplemented action type');
  }
};

type LoginFormProps = {
  onSubmit?(username: string, password: string): Promise<boolean>;
};

const LoginForm = (props: LoginFormProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'username', payload: { username: e.target.value } });
  };

  const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'password', payload: { password: e.target.value } });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'loading' });

    props.onSubmit?.(state.username, state.password).catch(() => {
      dispatch({ type: 'error' });
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.container}>
        <div className={styles.inputs}>
          <div className={styles.formRow}>
            <label htmlFor="loginUsername">Nombre de usuario</label>
            <input
              id="loginUsername"
              type="text"
              placeholder={username}
              defaultValue={state.username}
              onChange={updateUsername}
            />
            <LoginFormErrors errors={state.usernameErrors} />
          </div>
          <div className={styles.formRow}>
            <label htmlFor="loginPassword">Contraseña</label>
            <input
              id="loginPassword"
              type="password"
              placeholder={password}
              defaultValue={state.password}
              onChange={updatePassword}
            />
            <LoginFormErrors errors={state.passwordErrors} />
          </div>
        </div>
        <input
          type="submit"
          disabled={
            !!state.usernameErrors.length ||
            !!state.passwordErrors.length ||
            state.isLoading
          }
        />
      </div>
    </form>
  );
};

export default LoginForm;
