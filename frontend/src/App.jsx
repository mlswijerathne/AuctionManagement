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
import AdminProfile from './pages/AdminProfile';
import CheckoutPage from './pages/CheckoutPage';

// Protected route component for admin
const ProtectedAdminRoute = ({ children }) => {
  const userRole = localStorage.getItem('userRole');
  const token = localStorage.getItem('token');
  
  if (!token || userRole !== 'Admin') {
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

// Separate admin and user navigation links
const userNavLinks = [
  { path: "/", name: "Home" },
  { path: "/login", name: "Login" },
  { path: "/register", name: "Register" },
  { path: "/faq", name: "FAQ" },
  { path: "/contact-us", name: "Contact Us" },
  { path: "/addauction", name: "Add Auction" },
  { path: "/profile", name: "Profile" },
  { path: "/editprofile", name: "Edit Profile" },
  { path: "/aboutus", name: "About Us" },
  { path: "/dashboard", name: "Dashboard" },
  { path: "/setimage", name: "Set Image" },
  { path: "/myauctions", name: "My Auctions" },
  { path: "/allauctions", name: "All Auctions" },
  { path: "/bidsection", name: "Bid Section" },
  { path: "/checkout", name: "Checkout" },
];

const adminNavLinks = [
  { path: "/admin/dashboard", name: "Admin Dashboard" },
  { path: "/admin/profile", name: "Admin Profile" },
  { path: "/admin/users", name: "Manage Users" },
  { path: "/admin/auctions", name: "Manage Auctions" },
];

function App() {
  const [theme, setTheme] = useState(getCurrentTheme());
  const userRole = localStorage.getItem('userRole');

  const handleThemeChange = (event, newThemeName) => {
    let theme = saveCurrentTheme(newThemeName);
    setTheme(theme);
  };

  // Combine navigation links based on user role
  const navLinks = userRole === 'Admin' 
    ? [...adminNavLinks, ...userNavLinks.filter(link => !['Login', 'Register'].includes(link.name))]
    : userNavLinks;

  return (
    <>
      <ThemeProvider theme={theme.theme}>
        <Layout onThemeChange={handleThemeChange} navLinks={navLinks}>
          <CssBaseline />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/aboutus" element={<AboutUsPage />} />

            {/* Protected User Routes */}
            <Route path="/addauction" element={<ProtectedUserRoute><AddAuctionPage /></ProtectedUserRoute>} />
            <Route path="/profile" element={<ProtectedUserRoute><ProfilePage /></ProtectedUserRoute>} />
            <Route path="/dashboard" element={<ProtectedUserRoute><DashboardPage /></ProtectedUserRoute>} />
            <Route path="/editprofile" element={<ProtectedUserRoute><EditProfilePage /></ProtectedUserRoute>} />
            <Route path="/setimage" element={<ProtectedUserRoute><SetImagePage /></ProtectedUserRoute>} />
            <Route path="/myauctions" element={<ProtectedUserRoute><MyAuctionsPage /></ProtectedUserRoute>} />
            <Route path="/auctiondetails/:id" element={<ProtectedUserRoute><AuctionDetailsPage /></ProtectedUserRoute>} />
            <Route path="/allAuctions" element={<ProtectedUserRoute><AllAuctionsPage /></ProtectedUserRoute>} />
            <Route path="/auctions/edit/:id" element={<ProtectedUserRoute><OwnAuctionEditPage /></ProtectedUserRoute>} />
            <Route path="/bidsection" element={<ProtectedUserRoute><BidSectionPage /></ProtectedUserRoute>} />
            <Route path="/auction/:auctionId" element={<ProtectedUserRoute><AuctionDetailsBox /></ProtectedUserRoute>} />
            <Route path="/bid/:auctionId" element={<ProtectedUserRoute><BidSectionPage /></ProtectedUserRoute>} />
            <Route path="/checkout/:bidId" element={<ProtectedUserRoute><CheckoutPage /></ProtectedUserRoute>} />

            {/* Protected Admin Routes */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              } 
            />
            <Route 
              path="/admin/profile" 
              element={
                <ProtectedAdminRoute>
                  <AdminProfile />
                </ProtectedAdminRoute>
              } 
            />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default App;