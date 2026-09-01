import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../styles/orderSuccess.css";

function OrderSuccess() {
  return (
    <>
      <Navbar />

      <div className="success-page">
        <div className="success-card">

          <div className="success-icon">
            ✓
          </div>

          <h1>Order Placed Successfully!</h1>

          <h2>
            Thank you for shopping with FarmMart 🌱
          </h2>

          <p>
            Your order will be delivered to your address soon.
          </p>

          <div className="success-buttons">
            <Link to="/products">
              <button className="continue-btn">
                Continue Shopping
              </button>
            </Link>

            <Link to="/">
              <button className="home-btn">
                Back to Home
              </button>
            </Link>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default OrderSuccess;