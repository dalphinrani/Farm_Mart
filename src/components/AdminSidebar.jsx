import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/adminSidebar.css";

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <h2>FarmMart</h2>
        <p>Admin Panel</p>
      </div>

      <ul className="sidebar-menu">
        <li>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/admin/products">Products</Link>
        </li>

        <li>
          <Link to="/admin/add-product">Add Product</Link>
        </li>

        <li>
          <Link to="/admin/categories">Categories</Link>
        </li>

        <li>
          <Link to="/admin/orders">Orders</Link>
        </li>

        <li>
          <Link to="/admin/users">Users</Link>
        </li>

        <li>
          <Link to="/admin/settings">Settings</Link>
        </li>

        <li>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;