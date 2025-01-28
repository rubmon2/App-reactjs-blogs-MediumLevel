import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api/api.js';

export const userContext = createContext();

export const useUserContext = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error('Necesitas loguearte, para usar la app');
  }

  return context;
};
//provider
const payload = { username: '', id: '' };

export const UserProvider = ({ children }) => {
  //estados
  const [userData, setUserData] = useState(payload);
  const [errores, setErrores] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authenticate, setAuthenticate] = useState(false);
  const [Acces, setAcces] = useState('');
  //consultas api

  const signUp = async (state) => {
    try {
      const response = await api.post('/users/register', state);
      const { data } = response;

      return data;
    } catch (error) {
      if (error?.response) {
        setErrores(error?.response?.data?.message);
      }
    }
  }; //fin register

  const signIn = async (state) => {
    try {
      const response = await api.post('/users/login', state);
      const { token } = response.data;
      localStorage.setItem('Token', token);
      return token;
    } catch (error) {
      console.log('Error logueando user', error);
      if (error?.response?.data) {
        setErrores(error?.response?.data);
      }
    }
  }; //fin login
  //comprobar token
  const getUser = async () => {
    const token = localStorage.getItem('Token');
    try {
      if (token) {
        const response = await api.get('/users/profile', {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const { user } = response.data;
        setUserData(user.payload);
        setAcces(user.acces);
        return user;
      } else {
        setAuthenticate(false);
        setUserData(payload);
        setAcces('');
        return;
      }
    } catch (error) {
      console.log('error in check profile', error);
      if (error?.response?.data) {
        setErrores(error?.response?.data?.message);
      }
    }
  };

  //estados user e informacion

  const checkAuth = async () => {
    try {
      if (Acces) {
        setAuthenticate(true);
      } else {
        await getUser();
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data) {
        setErrores(error?.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
    return () => {
      console.log('limpiando componente, se verifico usuario ', authenticate);
    };
  }, [authenticate, loading, Acces]);

  useEffect(() => {
    if (errores) {
      console.log('preparando timer');
      const timer = setTimeout(() => {
        setErrores(null);
      }, 4500);

      return () => {
        console.log('limpiando timer');
        clearTimeout(timer);
      };
    }
  }, [errores]);

  //logout
  function removeDataUser() {
    setUserData(null);
    setAuthenticate(false);
    setLoading(true);
    setAcces(null);
    localStorage.removeItem('Token');
  }
  const logoutFnx = async () => {
    try {
      const response = await api.post('/users/logout', {});
      console.log('cerrando sesiones', response);
      removeDataUser();
      return () => {
        console.log('logout user');
      };
    } catch (error) {
      console.log('Error deslogueando user', error);
      if (error?.response?.data) {
        setErrores(error?.response?.data);
      }
    }
  }; //fin logout

  return (
    <userContext.Provider
      value={{
        logoutFnx,
        signUp,
        signIn,
        userData,
        authenticate,
        loading,
        errores,
        setErrores,
        logoutFnx,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
