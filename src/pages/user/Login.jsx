import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://farm-mart-backend-ukda.onrender.com/users?email=${loginData.email}&password=${loginData.password}`
      );

      const data = await response.json();

      if (data.length === 0) {
        alert("Invalid Email or Password");
        return;
      }

      const user = data[0];

      if (user.role === "admin") {
        localStorage.setItem(
          "admin",
          JSON.stringify(user)
        );

        localStorage.setItem(
          "isLoggedIn",
          "true"
        );

        alert("Admin Login Successful");

        navigate("/admin");
      } else {
        localStorage.setItem(
          "user",
          JSON.stringify(user)
        );

        localStorage.setItem(
          "isLoggedIn",
          "true"
        );

        alert("Login Successful");

        navigate("/");
      }
    } catch (error) {
      console.error(error);

      alert("Login Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="login-container">
        <div className="login-card">

          <div className="login-logo">
            🌱
          </div>

          <h1>Welcome Back</h1>

          <p className="login-subtitle">
            Login to your Farm Mart account.
          </p>

          <form
            onSubmit={handleSubmit}
            className="login-form"
          >

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={loginData.email}
              onChange={handleChange}
              required
            />

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={handleChange}
              required
            />

            <button type="submit">
              Login
            </button>

          </form>

          <p className="login-footer-text">
            Don't have an account?{" "}
            <span
              onClick={() =>
                navigate("/register")
              }
            >
              Create Account
            </span>
          </p>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;
