import React from 'react';
import { useUserContext } from '../../context/userContext';
import { Navigate, Outlet } from 'react-router-dom';

export const RoutedProtected = () => {
  const { authenticate, loading } = useUserContext();
  if (loading) return <div>Cargando...</div>;
  return authenticate ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to="/login" replace></Navigate>
  );
};
