import React from 'react';
import { InputForm } from '../Input/InputForm.js';
import { useNavigate } from 'react-router-dom';

export const FormRegister = ({ valuesForm }) => {
  //estados
  const { state, setState, setErrores, signUp, errores } = valuesForm;
  const navTo = useNavigate();
  //handles
  const onInputChange = async (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (!state.email || !state.username || !state.password) {
        return setErrores('Complete todos los campos por favor');
      }
      const response = await signUp(state);
      if (response) {
        navTo('/login');
      }
    } catch (error) {
      console.log('Error enviando la informacion inputada', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label> Username</label>
          <input
            placeholder="Insert Username"
            type="text"
            value={state.username}
            name="username"
            onChange={onInputChange}
          ></input>
          <InputForm valuesInput={{ onInputChange, state }}></InputForm>
        </div>
        <button type="submit">Submit</button>
      </form>
      {errores && <div> {errores}</div>}
    </div>
  );
};
