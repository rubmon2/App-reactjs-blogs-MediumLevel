import React from 'react';
import { FormBlogs } from '../../components';
import { useBlogsContext } from '../../context/useBlogContex';
import { useNavigate } from 'react-router-dom';

export const CreateBlogs = () => {
  const { registerBlog } = useBlogsContext();
  const navTo = useNavigate();
  const handleReturn = () => {
    navTo('/blogs/home');
  };

  return (
    <div>
      <div>CreateBlogs</div>
      <FormBlogs dispatchFnx={registerBlog}></FormBlogs>
      <div>
        <button onClick={handleReturn}>Volver</button>
      </div>
    </div>
  );
};
