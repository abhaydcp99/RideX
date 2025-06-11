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
      <div className="flex items-center space-x-8">
        <div className="text-2xl font-bold">RideX</div>
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

          <Link to="/payment" className="hover:text-gray-300">
            Payments
          </Link>
          {user && (
            <Link to="/bookings" className="hover:text-gray-300">
              My Bookings
            </Link>
          )}
        </div>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        {user ? (
          <>
            <span className="mr-4">Hello, {user.name}</span>
            {/* Orders button as separate, styled button */}
            <Link
              to="/orders"
              className="bg-orange-500 px-4 py-2 rounded hover:bg-orange-600 transition font-semibold"
            >
              Orders
            </Link>
            <button
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition ml-4"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-green-600 px-3 py-1 rounded hover:bg-green-700 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
