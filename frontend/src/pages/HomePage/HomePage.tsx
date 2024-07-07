import { useReducer } from 'react';
import apiService from '../../core/api/services/api.service';

import styles from './HomePage.module.scss';

type State = {
  isLoading: boolean;
  isSuccess: boolean;
  hasError: boolean;
  data: File | null;
};

type Action =
  | {
      type: 'success';
      payload: {
        data: File;
      };
    }
  | {
      type: 'loading';
    }
  | {
      type: 'error';
    }
  | {
      type: 'reset';
    };

const initialState: State = {
  isLoading: false,
  hasError: false,
  isSuccess: false,
  data: null,
};

const reducer = (_: State, action: Action): State => {
  switch (action.type) {
    case 'success':
      return {
        ...initialState,
        isSuccess: true,
        data: action.payload.data,
      };
    case 'loading':
      return {
        ...initialState,
        isLoading: true,
      };
    case 'error':
      return {
        ...initialState,
        hasError: true,
      };
    case 'reset': {
      return { ...initialState };
    }
    default:
      throw new Error('Umimplemented action type');
  }
};

const HomePage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    dispatch({ type: 'success', payload: { data: file } });
  };

  const upload = () => {
    if (!state.data) return;

    const file = state.data;
    dispatch({ type: 'loading' });

    const formData = new FormData();
    formData.append('file', file);

    apiService
      .post('users/bulk', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => dispatch({ type: 'reset' }))
      .catch(() => dispatch({ type: 'reset' }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.spacer} />
      <label
        className={[styles.button, styles.loadCsv].join(' ')}
        htmlFor="loadCsvHome"
      >
        Cargar archivo CSV
      </label>
      <button
        onClick={upload}
        className={[styles.button, styles.saveCsv].join(' ')}
        disabled={!state.isSuccess}
      >
        {state.isLoading ? 'Subiendo...' : 'Subir archivo'}
      </button>
      <input
        id={'loadCsvHome'}
        className={styles.loadCsvInput}
        type="file"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default HomePage;
