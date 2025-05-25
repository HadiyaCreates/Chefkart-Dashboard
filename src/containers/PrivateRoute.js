import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../app/AuthContext';

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
