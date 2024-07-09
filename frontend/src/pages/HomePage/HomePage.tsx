import { useReducer, useRef } from 'react';
import apiService from '../../core/api/services/api.service';

import styles from './HomePage.module.scss';
import WarningModal from '@/styles/ui/Modal/WarningModal/WarningModal';

type State = {
  isLoading: boolean;
  isLoaded: boolean;
  isSuccess: boolean;
  hasError: boolean;
  data: File | null;
};

type Action =
  | {
      type: 'loaded';
      payload: {
        data: File;
      };
    }
  | {
      type: 'loading';
    }
  | {
      type: 'success';
    }
  | {
      type: 'error';
    }
  | {
      type: 'reset';
    };

const initialState: State = {
  isLoading: false,
  isLoaded: false,
  isSuccess: false,
  hasError: false,
  data: null,
};

const reducer = (_: State, action: Action): State => {
  switch (action.type) {
    case 'success':
      return {
        ...initialState,
        isSuccess: true,
      };
    case 'loaded':
      return {
        ...initialState,
        isLoaded: true,
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

  const inputRef = useRef<HTMLInputElement>(null);

  const closeModal = () => {
    dispatch({ type: 'reset' });

    if (inputRef.current) {
      inputRef.current!.value = '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    dispatch({ type: 'loaded', payload: { data: file } });
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
      .then(() => dispatch({ type: 'success' }))
      .catch(() => dispatch({ type: 'error' }));
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
        disabled={!state.isLoaded}
      >
        {state.isLoading ? 'Subiendo...' : 'Subir archivo'}
      </button>
      <input
        ref={inputRef}
        id={'loadCsvHome'}
        className={styles.loadCsvInput}
        type="file"
        onChange={handleInputChange}
      />
      <WarningModal
        isOpen={state.hasError}
        onRequestClose={closeModal}
        header="Error cargando CSV"
        message="Ha ocurrido un error inesperado. Asegurate que el archivo es un archivo de tipo CSV"
      />
      <WarningModal
        isOpen={state.isSuccess}
        onRequestClose={closeModal}
        header="Archivo CSV cargado correctamente"
        message="El archivo se ha cargado correctamente en el servidor. Ahora podrás disfrutar de los nuevos usuarios"
      />
    </div>
  );
};

export default HomePage;
