import React, { useEffect, useState } from 'react';
import { FormLogin } from '../../components';
import { useUserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

const payload = { email: '', password: '' };

export const LoginPage = () => {
  const { errores, setErrores, signIn, authenticate } = useUserContext();
  const [state, setState] = useState(payload);
  const navTo = useNavigate();
  useEffect(() => {
    if (authenticate) navTo('/blogs/home');
  }, [authenticate, navTo]);

  return (
    <div>
      <div>LoginPage</div>

      <FormLogin
        valuesLogin={{ state, errores, setErrores, signIn, setState }}
      ></FormLogin>
    </div>
  );
};
