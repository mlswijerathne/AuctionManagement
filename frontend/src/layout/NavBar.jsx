import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/authService'; // Import AuthService to handle logout

const Navbar = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <nav className="bg-gray-900 text-white p-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side: Logo and Bid Auctions */}
        <div className="flex items-center">
          <img src="/Bid.webp" alt="Bid Auctions Logo" className="h-10 w-auto mr-3" />
          <Link to="/" className="text-3xl font-bold">
            <span className="text-orange-500">B</span>id
            <span className="text-orange-500">A</span>uctions
          </Link>
        </div>

        {/* Middle: Links */}
        <div className="hidden md:flex space-x-6 text-0.8xl font-bold">
          <Link to="/allauctions" className="hover:text-orange-500">Auctions</Link>
          <Link to={userRole === 'Admin' ? '/admin/dashboard' : '/dashboard'} className="hover:text-orange-500">
            Dashboard
          </Link>
          <Link to="/profile" className="hover:text-orange-500">Profile</Link>
          <Link to="/aboutus" className="hover:text-orange-500">About Us</Link>
        </div>

        {/* Right Side: FAQ, Login/Logout */}
        <div className="hidden md:flex space-x-4 text-0.5xl font-bold">
          <Link to="/faq" className="hover:text-orange-500">FAQ</Link>
          {token ? (
            <button 
              onClick={handleLogout}
              className="px-4 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 ease-in-out"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="px-4 py-1 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition duration-200 ease-in-out">
                Login
              </Link>
              <Link to="/register" className="px-4 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-200 ease-in-out">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            className="mobile-menu-button"
            onClick={() => {
              document.getElementById('mobile-menu').classList.toggle('hidden');
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div id="mobile-menu" className="hidden md:hidden bg-gray-800">
        <div className="px-4 pt-2 pb-3 space-y-1">
          <Link to="/" className="block hover:text-primary">BidAuction</Link>
          <Link to="/allauctions" className="block hover:text-primary">Auctions</Link>
          <Link to={userRole === 'Admin' ? '/admin/dashboard' : '/dashboard'} className="block hover:text-primary">Admin Dashboard</Link>
          <Link to="/profile" className="block hover:text-primary">Profile</Link>
          <Link to="/faq" className="block hover:text-primary">FAQ</Link>
          {token ? (
            <button 
              onClick={handleLogout}
              className="block bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 ease-in-out"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="block bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-200 ease-in-out">
                Login
              </Link>
              <Link to="/register" className="block bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200 ease-in-out">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;