import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const user =
  JSON.parse(localStorage.getItem("user")) ||
  JSON.parse(localStorage.getItem("admin"));

  // Temporary value for testing
  // Later we'll connect this to your actual cart data
 

const userEmail = user?.email;

const cart =
  JSON.parse(
    localStorage.getItem(
      `cart_${userEmail}`
    )
  ) || [];

const cartCount = cart.reduce(
  (total, item) =>
    total + (item.quantity || 1),
  0
);

  const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("admin");
  localStorage.removeItem("isLoggedIn");

  setShowProfile(false);

  alert("Logged out successfully");

  navigate("/login");
};

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const value = searchTerm.trim().toLowerCase();

      if (value === "seeds") {
        navigate("/category/Seeds");
      } else if (value === "fertilizers") {
        navigate("/category/Fertilizers");
      } else if (value === "pesticides") {
        navigate("/category/Pesticides");
      } else if (
        value === "machinery" ||
        value === "farming equipment"
      ) {
        navigate("/category/Farming%20Equipment");
      } else if (value === "irrigation") {
        navigate("/category/Irrigation");
      } else if (
        value === "plants" ||
        value === "nursery"
      ) {
        navigate("/category/Nursery%20%26%20Plants");
      } else {
        navigate(
          `/products?search=${encodeURIComponent(
            searchTerm
          )}`
        );
      }
    }
  };

  return (
    <header className="navbar">
      {/* Logo */}
      <div className="logo-section">
        <Link to="/" className="logo-link">
          <div className="logo-icon">🌿</div>

          <div className="logo-text">
            <h2>FarmMart</h2>
            <p>Agricultural Products Marketplace</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="nav-menu">
        <Link to="/">Home</Link>

        <Link to="/products">
          Products
        </Link>

        <div className="categories-dropdown">
          <button className="categories-btn">
            Categories ▼
          </button>

          <div className="categories-menu">
            <Link to="/category/Seeds">
              🌱 Seeds
            </Link>

            <Link to="/category/Fertilizers">
              🌾 Fertilizers
            </Link>

            <Link to="/category/Pesticides">
              🧪 Pesticides
            </Link>

            <Link to="/category/Farming%20Equipment">
              🚜 Machinery
            </Link>

            <Link to="/category/Irrigation">
              💧 Irrigation
            </Link>

            <Link to="/category/Nursery%20%26%20Plants">
              🌻 Plants
            </Link>
          </div>
        </div>
      </nav>

      {/* Right Side */}
      <div className="nav-icons">
        {/* Search Box */}
        <div className="search-box">
          <span className="search-icon">🔍</span>

          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            onKeyDown={handleSearch}
          />
        </div>

        {/* Cart */}
        <Link to="/cart" className="cart">
  <span className="cart-icon">🛒</span>

  {cartCount > 0 && (
    <div
      style={{
        position: "absolute",
        top: "-8px",
        right: "-10px",
        width: "20px",
        height: "20px",
        
        color: "green",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "11px",
        fontWeight: "bold",
        zIndex: 9999,
      }}
    >
      {cartCount}
    </div>
  )}
</Link>

        {/* Profile */}
<div className="profile-menu">
  <button
    className="profile-btn"
    onClick={() => setShowProfile(!showProfile)}
  >
    <span className="profile-icon">👤</span>
    
    
  </button>

  {showProfile && (
    <div className="profile-dropdown">

      {user && (
        <>
          <div className="profile-user">
            <span className="profile-user-icon">👤</span>

            <div>
              <strong>
                {user.name ||
                  `${user.firstName || ""} ${user.lastName || ""}`.trim()}
              </strong>

              <small>{user.email}</small>
            </div>
          </div>

          <div className="profile-divider"></div>
        </>
      )}

      {/* My Orders */}
      <Link
        to="/orders"
        onClick={() => setShowProfile(false)}
      >
        📦 My Orders
      </Link>

      {/* Wishlist */}
      <Link
        to="/wishlist"
        onClick={() => setShowProfile(false)}
      >
        ❤️ Wishlist
      </Link>

      {/* About */}
      <Link
        to="/about"
        onClick={() => setShowProfile(false)}
      >
        ℹ️ About
      </Link>

      

      <div className="profile-divider"></div>

      {/* Login / Logout */}
      {user ? (
        <button
          className="logout-menu-btn"
          onClick={logout}
        >
          🚪 Logout
        </button>
      ) : (
        <Link
          to="/login"
          onClick={() => setShowProfile(false)}
        >
          🔐 Login
        </Link>
      )}

      {/* Help & Support */}
      <Link
  to="/help-support"
  onClick={() => setShowProfile(false)}
>
  ❓ Help & Support
</Link>

    </div>
  )}
</div>
  </div>
    </header>
  );
}

export default Navbar;