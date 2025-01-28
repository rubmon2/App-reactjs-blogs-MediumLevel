import React from 'react';
import { useUserContext } from '../../context/userContext';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  const { authenticate, logoutFnx } = useUserContext();
  const handleLogout = async () => {
    await logoutFnx;
  };
  return (
    <div>
      {authenticate ? (
        <div>
          <nav>
            <Link to={'/blogs/create'}>Crear</Link>
            <Link onClick={handleLogout}>Cerrar sesion</Link>
          </nav>
        </div>
      ) : (
        <div>
          <Link to={'/'}>Blogs App</Link>
          <Link to={'/login'}>Login</Link>
          <Link to={'/register'}>Registrarse</Link>
        </div>
      )}
    </div>
  );
};
