import { createContext, useContext, useEffect, useReducer } from 'react';
import { Auth } from '../types/auth';
import authService from '../services/auth.service';

type State = {
  hasInitialized: boolean;
  auth: Auth | null;
};

type Action =
  | {
      type: 'authorized';
      payload: {
        auth: Auth;
      };
    }
  | {
      type: 'unauthorized';
    };

const initialState: State = {
  hasInitialized: false,
  auth: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'authorized':
      return { ...state, hasInitialized: true, auth: action.payload.auth };
    case 'unauthorized':
      return { ...state, hasInitialized: true, auth: null };
    default:
      throw new Error('Unrecognized action type');
  }
};

const Context = createContext({
  state: initialState,
  actions: {
    login: (): Promise<void> => {
      throw new Error('Unimplemented function');
    },
    logout: (): Promise<void> => {
      throw new Error('Unimplemented function');
    },
  },
});

type AuthProvider = {
  children?: React.ReactNode;
};

const AuthProvider = (props: AuthProvider) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async () => {
    const username = 'kathleen34';
    const password = 'aaa2848c13da';

    const auth = await authService.login(username, password);

    if (auth) {
      dispatch({ type: 'authorized', payload: { auth: auth } });
    }
  };

  const logout = async () => {
    authService.logout();
    dispatch({ type: 'unauthorized' });
  };

  useEffect(() => {
    const auth = authService.getSession();

    if (auth) {
      dispatch({ type: 'authorized', payload: { auth } });
    } else {
      dispatch({ type: 'unauthorized' });
    }
  }, []);

  const context = {
    state,
    actions: {
      login,
      logout,
    },
  };

  return (
    <Context.Provider value={context}>
      {state.hasInitialized ? props.children : null}
    </Context.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(Context);
