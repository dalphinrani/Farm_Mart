import React from "react";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h3>FarmMart</h3>
          <p>
            Connecting farmers and customers through a trusted
            agricultural marketplace.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>Orders</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@farmmart.com</p>
          <p>Phone: +91 9876543210</p>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} FarmMart. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;