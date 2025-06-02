// pages/Orders.jsx
import { useNavigate } from "react-router-dom";

const Orders = ({ order }) => {
  const navigate = useNavigate();

  const orderData = order || {
    carName: "BMW 3",
    price: 15000,
    date: new Date().toLocaleDateString(),
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
            <strong>Car:</strong> {orderData.carName}
          </p>
          <p>
            <strong>Price:</strong> ₹{orderData.price}
          </p>
          <p>
            <strong>Date:</strong> {orderData.date}
          </p>
        </div>
        <button
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "0.8rem 2rem",
            fontSize: "1rem",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Orders;
