import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Footer from "./components/Footer";
import Features from "./components/Features";
import Order from "./components/Order";
import Login from "./components/Login";
import MyBookings from "./components/MyBookings";
import Rides from "./components/Rides";
import ExploreCars from "./pages/ExploreCars";
import Register from "./pages/Register";
import Payment from "./pages/Payment";
import About from "./pages/About";
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
        <Route path="/register" element={<Register />} />
        <Route
          path="/bookings"
          element={
            <PrivateRoute>
              <MyBookings />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Order />
            </PrivateRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <PrivateRoute>
              <Payment />
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
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router>
  );
}
