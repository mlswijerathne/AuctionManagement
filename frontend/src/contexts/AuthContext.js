import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Load user data from localStorage on initial mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await AuthService.validateToken(token);
          if (userData && !userData.error) {
            setCurrentUser(userData);
          } else {
            // Invalid token
            localStorage.removeItem('token');
            setCurrentUser(null);
          }
        }
      } catch (err) {
        console.error('Error loading user:', err);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await AuthService.login(email, password);
      
      if (response.error) {
        setError(response.error);
        return false;
      }

      const { token, user } = response;
      localStorage.setItem('token', token);
      setCurrentUser(user);
      return true;
    } catch (err) {
      setError('Failed to login. Please try again.');
      return false;
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const response = await AuthService.register(userData);
      
      if (response.error) {
        setError(response.error);
        return false;
      }

      // Automatically log in after successful registration
      const { token, user } = response;
      localStorage.setItem('token', token);
      setCurrentUser(user);
      return true;
    } catch (err) {
      setError('Failed to register. Please try again.');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    navigate('/login');
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
