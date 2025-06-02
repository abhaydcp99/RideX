import React, { useState } from "react";
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
      <div className="text-2xl font-bold">RideX</div>

      {/* Hamburger button */}
      <button className="md:hidden z-50" onClick={() => setIsOpen(!isOpen)}>
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

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center space-x-6">
        <a className="hover:text-gray-300" href="/">
          Home
        </a>
        <a className="hover:text-gray-300" href="/rides">
          Explore Cars
        </a>
        <a className="hover:text-gray-300" href="/about">
          About
        </a>
        <a className="hover:text-gray-300" href="/order">
          Order
        </a>
        <a className="hover:text-gray-300" href="/payment">
          Payments
        </a>
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-sm">{user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <a
            href="/login"
            className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </a>
        )}
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-95 flex flex-col items-center justify-center z-40 space-y-6 text-lg">
          <a className="hover:text-gray-300" href="/">
            Home
          </a>
          <a className="hover:text-gray-300" href="/rides">
            Explore Cars
          </a>
          <a className="hover:text-gray-300" href="/about">
            About
          </a>
          <a className="hover:text-gray-300" href="/order">
            Order
          </a>
          <a className="hover:text-gray-300" href="/payment">
            Payments
          </a>
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
            <a
              href="/login"
              className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Login
            </a>
          )}
        </div>
      )}
    </div>
  );
}
