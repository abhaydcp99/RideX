import { useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser, logout } from "../utils/authUtils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div className="flex justify-between items-center px-8 py-6 bg-gray-800 text-white fixed top-0 left-0 right-0 z-50">
      {/* Left Section: Navigation */}
      <div className="flex items-center space-x-8">
        <div className="text-2xl font-bold">RideX</div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/rides" className="hover:text-gray-300">
            Explore Cars
          </Link>
          <Link to="/about" className="hover:text-gray-300">
            About
          </Link>
          <Link to="/blog" className="hover:text-gray-300">
            Blog
          </Link>
          {user && (
            <Link to="/bookings" className="hover:text-gray-300">
              My Bookings
            </Link>
          )}
        </div>
      </div>

      {/* Right Section: Auth Button */}
      <div className="hidden md:flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-sm">{user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </Link>
        )}
      </div>

      {/* Hamburger for Mobile */}
      <button
        className="md:hidden z-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Mobile Navigation */}
      <nav
        className={`md:hidden fixed top-0 right-0 h-full bg-gray-800 w-64 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out pt-20 space-y-6 px-6 z-40`}
      >
        <Link
          to="/"
          className="hover:text-gray-300"
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/rides"
          className="hover:text-gray-300"
          onClick={() => setIsOpen(false)}
        >
          Explore Cars
        </Link>
        <Link
          to="/about"
          className="hover:text-gray-300"
          onClick={() => setIsOpen(false)}
        >
          About
        </Link>
        <Link
          to="/blog"
          className="hover:text-gray-300"
          onClick={() => setIsOpen(false)}
        >
          Blog
        </Link>
        {user && (
          <Link
            to="/bookings"
            className="hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            My Bookings
          </Link>
        )}
        {user ? (
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 w-full"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 w-full text-center"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
        )}
      </nav>
    </div>
  );
}
