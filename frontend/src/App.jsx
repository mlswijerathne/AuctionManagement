import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import CssBaseline from "@mui/material/CssBaseline";
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
import BidSectionPage from './pages/BidSection';
import AuctionDetailsBox from './features/AuctionDetailsBox';
import AdminDashboard from './pages/AdminDashboard';
import AuthGuard from './pages/AuthGuard';

// Protected route component for admin
const ProtectedAdminRoute = ({ children }) => {
  const userRole = localStorage.getItem('userRole');
  
  if (userRole !== 'Admin') {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Protected route component for general user
const ProtectedUserRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const navLinks = [
  { path: "/", name: "Home" },
  { path: "/login", name: "Login" },
  { path: "/register", name: "Register" },
  { path: "/faq", name: "FAQ" },
  { path: "/contact-us", name: "Contact Us" },
  { path: "/addauction", name: "AddAuctionBox" },
  { path: "/profile", name: "ProfileBox" },
  { path: "/editprofile", name: "EditProfileBox" },
  { path: "/aboutus", name: "AboutUsBox" },
  { path: "/dashboard", name: "DashboardBox" },
  { path: "/setimage", name: "SetImageBox" },
  { path: "/myauctions", name: "MyAuctions" },
  { path: "/auctiondetails", name: "AuctionDetails" },
  { path: "/allauctions", name: "AllAuctions" },
  { path: "/bidsection", name: "BidSection" },
  { path: "/admin/dashboard", name: "AdminDashboard" }
];

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
          <CssBaseline />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/addauction" element={<AddAuctionPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/aboutus" element={<AboutUsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/editprofile" element={<EditProfilePage />} />
            <Route path="/setimage" element={<SetImagePage />} />
            <Route path="/myauctions" element={<MyAuctionsPage />} />
            <Route path="/auctiondetails/:id" element={<AuctionDetailsPage />} />
            <Route path="/allAuctions" element={<AllAuctionsPage />} />
            <Route path="/auctions/edit/:id" element={<OwnAuctionEditPage />} />
            <Route path="/bidsection" element={<BidSectionPage />} />
            <Route path="/auction/:auctionId" element={<AuctionDetailsBox />} />
            <Route path="/bid/:auctionId" element={<BidSectionPage />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              } 
            />
          </Routes>
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default App;