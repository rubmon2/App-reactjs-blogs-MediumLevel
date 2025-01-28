import React, { useState } from 'react';
import { FormRegister } from '../../components/Form/FormRegister.js';
import { useUserContext } from '../../context/userContext.js';

const payload = { username: '', email: '', password: '' };

export const RegisterPage = () => {
  //estados
  const { setErrores, signUp, errores } = useUserContext();
  const [state, setState] = useState(payload);
  return (
    <div>
      <div>RegisterPage</div>
      <div>
        <FormRegister
          valuesForm={{ state, setState, setErrores, signUp, errores }}
        ></FormRegister>
      </div>
    </div>
  );
};
