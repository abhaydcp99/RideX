// pages/Orders.jsx
import { useNavigate, useLocation } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get booking data from location state or localStorage
  const bookingData = location.state?.bookingData ||
    JSON.parse(localStorage.getItem("currentBooking")) || {
      car: { name: "Demo Car" },
      totalAmount: 0,
      startDate: new Date(),
      endDate: new Date(),
    };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#e0f2fe",
        paddingTop: "80px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "30px",
          boxShadow: "0 12px 28px rgba(0, 0, 0, 0.12)",
          padding: "3rem",
          width: "350px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#d1fae5",
            borderRadius: "50%",
            width: "80px",
            height: "80px",
            margin: "0 auto 1.5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#22c55e"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#16a34a"
            style={{ width: "40px", height: "40px" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h1 style={{ fontSize: "2.3rem", color: "#16a34a" }}>
          Order Successful!
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#4b5563" }}>
          Thank you for your booking.
        </p>
        <div
          style={{
            textAlign: "left",
            fontSize: "1rem",
            margin: "1rem 0",
            color: "#374151",
          }}
        >
          <p>
            <strong>Car:</strong> {bookingData.car?.name}
          </p>
          <p>
            <strong>Price:</strong> ${bookingData.totalAmount}
          </p>
          <p>
            <strong>Booking Dates:</strong>{" "}
            {new Date(bookingData.startDate).toLocaleDateString()} to{" "}
            {new Date(bookingData.endDate).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              padding: "0.8rem 1.5rem",
              fontSize: "1rem",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Back to Home
          </button>
          <button
            onClick={() => navigate("/bookings")}
            style={{
              backgroundColor: "#10b981",
              color: "white",
              padding: "0.8rem 1.5rem",
              fontSize: "1rem",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
            }}
          >
            View Bookings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
