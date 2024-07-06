import { createContext, useContext, useEffect, useReducer } from 'react';
import { User } from '../../users/types/user';
import useApiSession from '../hooks/useApiSession';

type State = {
  hasInitialized: boolean;
  user: User | null;
};

type Action = {
  type: 'load';
  payload: {
    user: User;
  };
};

const initialState: State = {
  hasInitialized: false,
  user: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    default:
      throw new Error('Unrecognized action type');
  }
};

const Context = createContext({
  state: initialState,
});

type SessionProviderProps = {
  children?: React.ReactNode;
};

const SessionProvider = (props: SessionProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { data, isLoading, isSuccess, hasError } = useApiSession();

  const load = (user: User) => dispatch({ type: 'load', payload: { user } });

  const context = {
    state,
  };

  useEffect(() => {
    if (!isLoading) return;

    if (isSuccess && data) {
      load(data);
    }
  }, [data, isSuccess, isLoading]);

  console.log(data);

  return (
    <Context.Provider value={context}>
      {isLoading && <>Loading...</>}
      {hasError && <>An error has ocurred</>}
      {isSuccess && props.children}
    </Context.Provider>
  );
};

export default SessionProvider;

export const useSession = () => useContext(Context);
