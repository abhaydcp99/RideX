import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/authUtils"; // Adjust the path if needed

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!emailRegex.test(credentials.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!passwordRegex.test(credentials.password)) {
      newErrors.password =
        "Invalid password (min 6 characters, include number)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const result = await login(credentials.email, credentials.password);
      if (result.success) {
        alert("Login successful!");
        navigate("/");
      } else {
        alert(result.message || "Invalid email or password");
      }
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.ridex}>
          Ride<span style={{ color: "#f59e0b" }}>X</span>
        </h2>
        <p style={styles.subtitle}>Welcome Back! Login to Continue</p>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
          style={styles.input}
        />
        {errors.email && <p style={styles.error}>{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          style={styles.input}
        />
        {errors.password && <p style={styles.error}>{errors.password}</p>}

        <button type="submit" style={styles.button}>
          Login
        </button>

        <p style={styles.linkText}>
          Don’t have an account?{" "}
          <a href="/register" style={styles.link}>
            Register
          </a>
        </p>
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

export default Login;
