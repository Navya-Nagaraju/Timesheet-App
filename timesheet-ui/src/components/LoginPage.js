import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://localhost:7218/api/auth/login", {
        Email: email,
        Password: password,
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      const role = user.role?.toLowerCase();

      if (role === "manager") navigate("/manager");
      else navigate("/employee");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #004a99, #0073e6, #53a7ff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Segoe UI, Arial",
        padding: "20px",
      }}
    >
      {/* Login Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "40px 35px",
          background: "rgba(255,255,255,0.25)",
          borderRadius: "16px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
          backdropFilter: "blur(10px)",
          textAlign: "center",
        }}
      >
        <img
          src="/franklar-logo.png"
          alt="Logo"
          style={{ height: "80px", marginBottom: "15px" }}
        />

        <h2 style={{ color: "white", marginBottom: "5px" }}>FRANKLAR TECHNOLOGIES</h2>
        <p style={{ color: "#e2e8f0", marginBottom: "25px" }}>Pathway for Success</p>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "15px",
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.4)",
            background: "rgba(255,255,255,0.7)",
            fontSize: "15px",
          }}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "20px",
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.4)",
            background: "rgba(255,255,255,0.7)",
            fontSize: "15px",
          }}
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "14px",
            background: "#0066B3",
            color: "white",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
            boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
            marginBottom: "10px",
          }}
        >
          Login
        </button>

        {/* Error Message */}
        {error && <p style={{ color: "#ffcccc", marginTop: "10px" }}>{error}</p>}
      </div>
    </div>
  );
}
