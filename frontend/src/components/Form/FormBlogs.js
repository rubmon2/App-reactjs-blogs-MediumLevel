import React, { useState } from 'react';
import { InputFormBlogs } from '../Input/InputFormBlogs';
import { useUserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import { useBlogsContext } from '../../context/useBlogContex';

const payload = { title: '', description: '', important: '' };
export const FormBlogs = ({ dispatchFnx }) => {
  const [blog, setBlogs] = useState(payload);
  const { setErrores, errores } = useUserContext();
  const { setMessage } = useBlogsContext();
  const navTo = useNavigate();
  const onInputOnchange = (event) => {
    const { name, value } = event.target;
    setBlogs({ ...blog, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await dispatchFnx(blog);
    try {
      if (response) {
        setMessage(response.message);
        navTo('/blogs/home');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputFormBlogs
          label={'title'}
          name={'title'}
          onInputOnchange={onInputOnchange}
          type={'text'}
          value={blog.title}
        ></InputFormBlogs>
        <div>
          <label>Descripcion</label>
          <textarea
            placeholder="Descripcion"
            name="description"
            value={blog.description}
            type="text"
            onChange={onInputOnchange}
          ></textarea>
        </div>
        <InputFormBlogs
          label={'important'}
          name={'important'}
          onInputOnchange={onInputOnchange}
          type={'text'}
          value={blog.important}
        ></InputFormBlogs>
        <div>
          <button type="submit">submit</button>
        </div>
      </form>
      {errores && <p>{errores}</p>}
    </div>
  );
};
