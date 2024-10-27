// AuthGuard.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const token = localStorage.getItem("token");

  // If there is no token, redirect to the login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the children (protected content)
  return children;
};

export default AuthGuard;