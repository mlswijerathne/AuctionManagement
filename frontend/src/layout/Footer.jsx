import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-5">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1 - Company Info */}
        <div className="space-y-4">
          <h4 className="text-orange-400 text-lg font-semibold">BiD aUCTION</h4>
          <p className="text-gray-400">
            The term bid refers to an offer made by an individual or corporation
            to purchase an asset. Buyers commonly make bids at auctions and in
            various markets, such as the stock market. Bids may also be made by
            companies that compete for project contracts.
          </p>
          <div className="flex space-x-4 mt-4">
            <a
              href="https://facebook.com"
              className="text-gray-400 hover:text-orange-500 transition duration-200"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a
              href="https://twitter.com"
              className="text-gray-400 hover:text-orange-500 transition duration-200"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href="https://instagram.com"
              className="text-gray-400 hover:text-orange-500 transition duration-200"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://linkedin.com"
              className="text-gray-400 hover:text-orange-500 transition duration-200"
            >
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h4 className="text-orange-400 text-lg font-semibold mb-4">
            Pages Links
          </h4>
          <ul className="space-y-2">
            <li>
              <a
                href="/aboutus"
                className="text-gray-400 hover:text-orange-500 transition duration-200"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/Auctioncategory"
                className="text-gray-400 hover:text-orange-500 transition duration-200"
              >
                Auction Category
              </a>
            </li>
            <li>
              <a
                href="/buy"
                className="text-gray-400 hover:text-orange-500 transition duration-200"
              >
                Buy
              </a>
            </li>
            <li>
              <a
                href="/sell"
                className="text-gray-400 hover:text-orange-500 transition duration-200"
              >
                Sell
              </a>
            </li>
            <li>
              <a
                href="/register"
                className="text-gray-400 hover:text-orange-500 transition duration-200"
              >
                Register
              </a>
            </li>
            <li>
              <a
                href="/login"
                className="text-gray-400 hover:text-orange-500 transition duration-200"
              >
                LogIn
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 - Auction Categories */}
        <div>
          <h4 className="text-orange-400 text-lg font-semibold mb-4">
            Auction Privacy
          </h4>
          <ul className="space-y-2">
            <li>
              <a
                href="/terms"
                className="text-gray-400 hover:text-orange-500 transition duration-200"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="/privacy"
                className="text-gray-400 hover:text-orange-500 transition duration-200"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-gray-400 hover:text-orange-500 transition duration-200"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4 - Other Connect Page */}
        <div>
          <h4 className="text-orange-400 text-lg font-semibold mb-4">
            Other Connect Page
          </h4>
          <ul className="space-y-2">
            <li>
              <a
                href="/profile"
                className="text-gray-400 hover:text-orange-500 transition duration-200"
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="/settings"
                className="text-gray-400 hover:text-orange-500 transition duration-200"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="/notification"
                className="text-gray-400 hover:text-orange-500 transition duration-200"
              >
                Notification
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-gray-400 hover:text-orange-500 transition duration-200"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="/help"
                className="text-gray-400 hover:text-orange-500 transition duration-200"
              >
                Help
              </a>
            </li>
            <li>
              <a
                href="/faq"
                className="text-gray-400 hover:text-orange-500 transition duration-200"
              >
                FAQ
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-orange-400">
        <p>
          © 2024{" "}
          <span className="font-semibold">Auction Management System</span>. All
          Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
