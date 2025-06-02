import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    paymentType: "card", // "card" or "upi"
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    upiId: "",
  });

  const [errors, setErrors] = useState({});

  // Regex for validation
  const cardNumberRegex = /^\d{16}$/;
  const cardNameRegex = /^[a-zA-Z\s]{3,}$/;
  const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/; // MM/YY format
  const cvvRegex = /^[0-9]{3}$/;
  const upiRegex = /^[\w.-]+@[\w.-]+$/;

  const validate = () => {
    const newErrors = {};

    if (formData.paymentType === "card") {
      if (!cardNameRegex.test(formData.cardName)) {
        newErrors.cardName = "Cardholder name must be at least 3 letters.";
      }
      if (!cardNumberRegex.test(formData.cardNumber)) {
        newErrors.cardNumber = "Card number must be 16 digits.";
      }
      if (!expiryRegex.test(formData.expiry)) {
        newErrors.expiry = "Expiry must be in MM/YY format.";
      }
      if (!cvvRegex.test(formData.cvv)) {
        newErrors.cvv = "CVV must be 3 digits.";
      }
    } else if (formData.paymentType === "upi") {
      if (!upiRegex.test(formData.upiId)) {
        newErrors.upiId = "Enter a valid UPI ID (example@bank).";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handlePaymentTypeChange = (e) => {
    setFormData({
      paymentType: e.target.value,
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
      upiId: "",
    });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Payment Successful!");
      navigate("/orders"); // Redirect to orders page after payment
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>
          Ride <span style={{ color: "#f59e0b" }}>X</span>
        </h2>

        {/* Payment Type Radio Buttons */}
        <div style={styles.radioGroup}>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              name="paymentType"
              value="card"
              checked={formData.paymentType === "card"}
              onChange={handlePaymentTypeChange}
            />{" "}
            Credit/Debit Card
          </label>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              name="paymentType"
              value="upi"
              checked={formData.paymentType === "upi"}
              onChange={handlePaymentTypeChange}
            />{" "}
            UPI
          </label>
        </div>

        {/* Conditionally render form fields */}
        {formData.paymentType === "card" ? (
          <>
            <input
              type="text"
              name="cardName"
              placeholder="Cardholder Name"
              value={formData.cardName}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.cardName && <p style={styles.error}>{errors.cardName}</p>}

            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              maxLength={16}
              value={formData.cardNumber}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.cardNumber && (
              <p style={styles.error}>{errors.cardNumber}</p>
            )}

            <input
              type="text"
              name="expiry"
              placeholder="Expiry (MM/YY)"
              maxLength={5}
              value={formData.expiry}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.expiry && <p style={styles.error}>{errors.expiry}</p>}

            <input
              type="password"
              name="cvv"
              placeholder="CVV"
              maxLength={3}
              value={formData.cvv}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.cvv && <p style={styles.error}>{errors.cvv}</p>}
          </>
        ) : (
          <>
            <input
              type="text"
              name="upiId"
              placeholder="Enter UPI ID"
              value={formData.upiId}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.upiId && <p style={styles.error}>{errors.upiId}</p>}
          </>
        )}

        <button type="submit" style={styles.button}>
          Pay Now
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f0f4ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Segoe UI, sans-serif",
  },
  form: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "20px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    width: "400px",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "1.5rem",
    color: "#4f46e5",
  },
  radioGroup: {
    marginBottom: "1rem",
    display: "flex",
    justifyContent: "space-around",
  },
  radioLabel: {
    fontSize: "1rem",
    cursor: "pointer",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "8px 0",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "1rem",
  },
  button: {
    marginTop: "1rem",
    width: "100%",
    padding: "12px",
    backgroundColor: "#4f46e5",
    color: "#fff",
    fontSize: "1rem",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
  error: {
    color: "#dc2626",
    fontSize: "0.85rem",
    marginBottom: "8px",
    textAlign: "left",
  },
};

export default Payment;
