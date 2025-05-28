/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage"; // changed from Header
import Footer from "./components/Footer";
import Features from "./components/Features"; // changed from Getstarted
import Blog from "./components/Blog";
import Login from "./components/Login";
import MyBookings from "./components/MyBookings";
import Rides from "./components/Rides";
import ExploreCars from "./pages/ExploreCars"; // changed from FeaturedCars
import About from "./pages/About";
import Signup from "./pages/Signup";

import { isAuthenticated } from "./utils/authUtils";

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/bookings"
          element={
            <PrivateRoute>
              <MyBookings />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <>
              <Homepage />
              <div className="text-center my-8"></div>
              <Features />
            </>
          }
        />
        <Route path="/rides" element={<Rides />} />
        <Route path="/cars" element={<ExploreCars />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </Router>
  );
}
