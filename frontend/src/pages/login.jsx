// login.jsx
import { useState, useEffect } from 'react';
import LoginBox from "../features/loginBox";
import AuthViewModel from "../viewModels/AuthViewModel";
import LoginAccountDto from "../dto/auth/loginAccountDto";
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is already authenticated
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = async (e, email, password) => {
    e.preventDefault();
    setError('');
    
    try {
      const loginAccountDto = new LoginAccountDto();
      loginAccountDto.email = email;
      loginAccountDto.password = password;
      
      const response = await AuthViewModel.loginAccount(loginAccountDto);
      console.log('Login response:', response); // Debug log

      if ("error" in response) {
        setError(response.error);
        return;
      }

      setIsAuthenticated(true);
      if (AuthService.isAdmin()) {
        navigate("/");
      } else {
        navigate("/"); // Redirect to home or user's dashboard
      }
      
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed. Please try again.');
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    navigate('/login'); // Redirect to login page
  };

  return (
    <>
      {isAuthenticated ? (
        // Show only the logout button if authenticated
        <LoginBox handleLogout={handleLogout} />
      ) : (
        // Show the login form if not authenticated
        <LoginBox handleSubmit={handleSubmit} error={error} />
      )}
    </>
  );
};

export default LoginPage;