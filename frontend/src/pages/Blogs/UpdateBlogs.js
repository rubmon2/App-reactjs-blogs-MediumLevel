import React from 'react';
import { FormBlogs } from '../../components';
import { useBlogsContext } from '../../context/useBlogContex.js';
import { useNavigate, useParams } from 'react-router-dom';

export const UpdateBlogs = () => {
  const { UpdateBlogs } = useBlogsContext();
  const { blogId } = useParams();
  const navTo = useNavigate();

  const handleUpdate = async (state) => {
    await UpdateBlogs(blogId, state);

    navTo('/blogs/home');
  };

  const handleReturn = () => {
    navTo('/blogs/home');
  };
  return (
    <div>
      <div>
        {' '}
        <h2>Actualizar Blog con ID: {blogId}</h2>
      </div>
      <FormBlogs dispatchFnx={handleUpdate}></FormBlogs>
      <div>
        <button onClick={handleReturn}>volver</button>
      </div>
    </div>
  );
};
