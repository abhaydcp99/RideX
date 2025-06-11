import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../utils/authUtils";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[a-zA-Z\s]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const mobileRegex = /^[6-9]\d{9}$/;

    if (!nameRegex.test(formData.fullName)) {
      newErrors.fullName = "Full name must be at least 3 characters.";
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must contain letters and numbers (min 6 chars).";
    }

    if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit Indian mobile number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const result = await register(
        formData.fullName,
        formData.email,
        formData.password,
        formData.mobile
      );
      
      if (result.success) {
        alert("Registration successful! Please login to continue.");
        navigate("/login");
      } else {
        alert(result.message || "Registration failed. Please try again.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.ridex}>
          Ride<span style={{ color: "#f59e0b" }}>X</span>
        </h2>
        <p style={styles.subtitle}>Create Your Account</p>

        {["fullName", "email", "password", "mobile"].map((field) => (
          <div key={field}>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              placeholder={
                field === "fullName"
                  ? "Full Name"
                  : field.charAt(0).toUpperCase() + field.slice(1)
              }
              value={formData[field]}
              onChange={handleChange}
              style={styles.input}
            />
            {errors[field] && <p style={styles.error}>{errors[field]}</p>}
          </div>
        ))}

        <button type="submit" style={styles.button}>
          Register
        </button>
        <p style={styles.linkText}>
          Already have an account?{" "}
          <a href="/login" style={styles.link}>
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#eef2ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Segoe UI, sans-serif",
    paddingTop: "80px", // space for navbar
  },
  form: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "20px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    width: "360px",
    textAlign: "center",
  },
  ridex: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    color: "#4f46e5",
  },
  subtitle: {
    color: "#6b7280",
    fontSize: "1rem",
    marginBottom: "1.5rem",
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
  },
  linkText: {
    marginTop: "1rem",
    fontSize: "0.9rem",
  },
  link: {
    color: "#4f46e5",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Register;
