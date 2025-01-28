import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useUserContext } from './userContext';
import { api } from '../api/api';

export const blogContext = createContext();

export const useBlogsContext = () => {
  const context = useContext(blogContext);
  if (!context) {
    throw new Error(
      'Necesitas tener un usuario valido, y blogs creados/autenticados',
    );
  }
  return context;
};

export const BlogsProvider = ({ children }) => {
  const { setErrores } = useUserContext();
  const [message, setMessage] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const token = localStorage.getItem('Token');

  //todos los blogs
  const getAllBlogs = useCallback(async () => {
    try {
      const response = await api.get('/blogs/', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const { data } = response;
      setterDataBlogs(data);
      return data;
    } catch (error) {
      console.log('error obteniendo los blogs', error);
      if (error?.response?.data)
        return setErrores(error?.response?.data?.message);
    }
  }, [token]);

  //setear blogs y message
  const setterDataBlogs = useCallback((data) => {
    setBlogs(data.blog);
  }, []);
  //otras consultasa

  //create blogs
  const registerBlog = async (state) => {
    try {
      const response = await api.post('/blogs/register', state, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { data } = response;
      console.log(data);
      return data;
    } catch (error) {
      console.log(
        'error creando un nuevo blogs, verifique sus permisos y datos enviados',
        error,
      );

      if (error?.response?.data)
        return setErrores(error?.response?.data?.message);
    }
  };

  //update blogs
  const UpdateBlogs = async (id, state) => {
    try {
      const response = await api.put(`/blogs/update/${id}`, state, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { data } = response;

      return data;
    } catch (error) {
      console.log(
        'error actualizando el blogs, revisa los campos o volvete a loguear',
        error,
      );
      if (error?.response?.data) {
        setErrores(error?.response?.data?.message);
      }
    }
  };
  //delete blogs
  const deleteOne = async (id) => {
    try {
      const response = await api.delete(`/blogs/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { data } = response;
      console.log('this is delete', data);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));

      return data;
    } catch (error) {
      console.log('error elimando un blog', error);
      if (error?.response) {
        setErrores(error?.response?.data?.message);
      }
    }
  };
  //refrescar mensajes
  useEffect(() => {
    if (message.length > 0) {
      console.log('iniciando limpieza mensajes');
      const timer = setTimeout(() => {
        setMessage([]);
      }, 4500);
      return () => {
        console.log('limpieza realizada');
        clearTimeout(timer);
      };
    }
  }, [message]);

  const value = useMemo(() => ({
    getAllBlogs,
    setterDataBlogs,
    blogs,
    message,
    registerBlog,
    UpdateBlogs,
    deleteOne,
    setMessage,
  }));
  return <blogContext.Provider value={value}>{children}</blogContext.Provider>;
};
