import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/" />;
};

export default AuthGuard;
