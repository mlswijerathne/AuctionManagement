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
import FAQPage from './pages/FAQ';
import ContactUsPage from './pages/ContactUs';
import AddAuctionBox from './features/AddAuctionBox';
import ProfilePage from './pages/Profile';
import EditProfilePage from './pages/EditProfile';
import AddAuctionPage from './pages/AddAuction';
import SetImagePage from "./pages/SetImagePage";
import AboutUsPage from './pages/AboutUs';
import DashboardPage from './pages/Dashboard';
import AuctionDetailsPage from './pages/AuctionDetails';
import MyAuctionsPage from './pages/MyAuctions';
import AllAuctionsPage from './pages/AllAuctions';
import OwnAuctionEditPage from './pages/OwnAuctionEdit';





const navLinks = [
  { path: "/", name: "Home" },
  { path: "/login", name: "Login" },
  { path: "/register", name: "Register" },
  { path: "/faq", name: "FAQ" },
  { path: "/contact-us", name: "Contact Us" },
  { path: "/addauction", name: "AddAuctionBox" },
  { path:"/profile", name:"ProfileBox"},
  { path:"EditProfile", name:"EditProfileBox"},
  { path:"/aboutus", name:"AboutUsBox"},
  { path:"/dashboard",name:"DashboardBox"},
  { path:"/setimage",name:"SetImageBox"},
  { path: "/myauctions", name: "MyAuctions" },
  { path : "/auctiondetails", name: "AuctionDetails"}
 

 

 

  
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
            <Route path ="/auction" element={<AddAuctionBox />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/aboutus" element={<AboutUsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/editprofile" element={<EditProfilePage />} />
            <Route path="/setimage" element={<SetImagePage />} />
            <Route path="/myauctions" element={<MyAuctionsPage />} />
            <Route path="/auctiondetails/:id" element={<AuctionDetailsPage />} />
            <Route path="/addauction" element={<AddAuctionPage />} />
            <Route path="/allAuctions" element={<AllAuctionsPage />} />
            <Route path="/auctions/edit/:id" element={<OwnAuctionEditPage />} />
            
            
          </Routes>
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default App;

