import React, { useCallback, useEffect } from 'react';
import { useBlogsContext } from '../../context/useBlogContex';
import { BlogsCards } from '../../components';
import { useNavigate } from 'react-router-dom';

export const HomeBlogs = () => {
  //estados
  const {
    getAllBlogs,
    setterDataBlogs,
    message,
    blogs,
    deleteOne,
    setMessage,
  } = useBlogsContext();

  const navTo = useNavigate();
  //fnx en memoria para tener los blogs
  const handleBlogs = useCallback(async () => {
    try {
      await getAllBlogs();
    } catch (error) {
      console.log(
        'error obteniendo blogs, usuario sesion puede que vencida',
        error,
      );
    }
  }, [getAllBlogs, setterDataBlogs]);
  //aplicar trigger por cambios
  useEffect(() => {
    handleBlogs();
  }, []);
  //delete fnx
  const handleDelete = async (id) => {
    const response = await deleteOne(id);
    if (response) {
      setMessage(response.message);
    }
  };

  //redireccionar a crear blog
  const onNewBlog = () => {
    navTo('/blogs/create');
  };

  return (
    <div>
      <div>
        <div>HomeBlogs</div>
        {message && <p>{message}</p>}
        {blogs.map((blog, index) => (
          <BlogsCards key={index} blog={blog} fnx={handleDelete}></BlogsCards>
        ))}
      </div>

      <button onClick={onNewBlog}>Crear Blog</button>
    </div>
  );
};
