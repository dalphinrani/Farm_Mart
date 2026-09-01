import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/adminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (
  email === "admin@farmmart.com" &&
  password === "admin@123"
) {
  localStorage.setItem(
    "adminToken",
    "loggedin"
  );

  navigate("/admin/dashboard");
} else {
  alert("Invalid admin email or password");
}
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-wrapper">

        {/* Left Side - Farm Mart Branding */}
        <div className="admin-login-brand">
          <div className="brand-icon">🌱</div>

          <h1>Farm Mart</h1>

          <h2>Admin Portal</h2>

          <p>
            Manage your farm products, orders, customers and
            categories from one place.
          </p>

          <div className="farm-features">
            <div>
              <span>🌾</span>
              <p>Manage Products</p>
            </div>

            <div>
              <span>📦</span>
              <p>Manage Orders</p>
            </div>

            <div>
              <span>👥</span>
              <p>Manage Customers</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="admin-login-card">

          <div className="admin-login-header">
            <div className="admin-lock">🔐</div>

            <h2>Welcome Back</h2>

            <p>Sign in to your admin account</p>
          </div>

          <form onSubmit={handleLogin}>

            <div className="admin-input-group">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="admin-input-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="admin-login-button"
            >
              Login to Dashboard
            </button>

          </form>

          <div className="admin-login-footer">
            <p>🌱 Farm Mart Admin Panel</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminLogin;