import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import CssBaseLine from "@mui/material/CssBaseline"
import { ThemeProvider } from '@emotion/react';
import Layout from './layout/Layout';
import { useState } from 'react';
import Themes, { getCurrentTheme, saveCurrentTheme } from './utils/theme';
import HomePage from './pages/home';


const navLinks = [
  { path: "/", name: "Home" },
  { path: "/login", name: "Login" },
  { path: "/register", name: "Register" },
]

function App() {
  const [theme, setTheme] = useState(getCurrentTheme());

  const handleThemeChange = (event, newThemeName) => {
    let theme = saveCurrentTheme(newThemeName);
    setTheme(theme);
  }

  return (
    <>
      <ThemeProvider theme={theme.theme}>
        <Layout onThemeChange={handleThemeChange} navLinks={navLinks}>
          <CssBaseLine />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default App;