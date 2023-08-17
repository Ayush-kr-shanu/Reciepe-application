import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children, isLoggedIn }) => {
  if (isLoggedIn) {
    return children;
  }
  return <Navigate to="/" />;
};

export default AuthGuard;
