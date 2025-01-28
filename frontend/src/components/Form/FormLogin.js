import React from 'react';
import { InputForm } from '../Input';
import { useNavigate } from 'react-router-dom';

export const FormLogin = ({ valuesLogin }) => {
  const { state, errores, setErrores, signIn, setState } = valuesLogin;
  const navTo = useNavigate();

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (!state.email || !state.password) {
        return setErrores('complete todos los campos porfavor para loguearse');
      }
      const response = await signIn(state);
      if (response) {
        navTo('/blogs/home');
      }
    } catch (error) {
      console.log('error logueando usuario', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputForm valuesInput={{ state, onInputChange }}></InputForm>
        <button type="submit">Submit</button>
      </form>
      {errores && <div>{errores}</div>}
    </div>
  );
};
