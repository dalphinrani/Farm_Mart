import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../styles/help.css";

function HelpSupport() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="help-hero">
        <h1>Help & Support</h1>

        <p>
          Need assistance with orders, payments,
          delivery or your account? Our support
          team is always ready to help.
        </p>
      </section>

      {/* Quick Help */}
      <section className="help-grid-section">
        <h2>How Can We Help You?</h2>

        <div className="help-grid">
          <div className="help-card">
            <div className="help-icon">📦</div>

            <h3>Track Orders</h3>

            <p>
              Check the status of your recent
              orders and delivery updates.
            </p>
          </div>

          <div className="help-card">
            <div className="help-icon">💳</div>

            <h3>Payment Issues</h3>

            <p>
              Get assistance with payment
              failures, refunds and transactions.
            </p>
          </div>

          <div className="help-card">
            <div className="help-icon">🔄</div>

            <h3>Returns & Refunds</h3>

            <p>
              Easy support for returns,
              cancellations and refund requests.
            </p>
          </div>

          <div className="help-card">
            <div className="help-icon">👤</div>

            <h3>Account Support</h3>

            <p>
              Help with login issues, passwords
              and account management.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-card">
          <h3>📌 How can I place an order?</h3>
          <p>
            Browse products, add them to your cart
            and complete checkout securely.
          </p>
        </div>

        <div className="faq-card">
          <h3>📌 How can I track my order?</h3>
          <p>
            Visit the My Orders page to check
            your order status and delivery updates.
          </p>
        </div>

        <div className="faq-card">
          <h3>📌 Can I cancel my order?</h3>
          <p>
            Orders can be cancelled before
            they are shipped.
          </p>
        </div>

        <div className="faq-card">
          <h3>📌 What payment methods are accepted?</h3>
          <p>
            UPI, Debit Card, Credit Card
            and Cash on Delivery.
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section className="support-stats">
        <div className="stat-box">
          <h2>10K+</h2>
          <p>Happy Farmers</p>
        </div>

        <div className="stat-box">
          <h2>25K+</h2>
          <p>Orders Delivered</p>
        </div>

        <div className="stat-box">
          <h2>99%</h2>
          <p>Customer Satisfaction</p>
        </div>

        <div className="stat-box">
          <h2>24/7</h2>
          <p>Support Available</p>
        </div>
      </section>

      {/* Contact */}
      <section className="contact-section">
        <h2>Contact Our Support Team</h2>

        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-icon">📞</div>

            <h3>Call Us</h3>

            <p>+91 9876543210</p>
          </div>

          <div className="contact-card">
            <div className="contact-icon">📧</div>

            <h3>Email Support</h3>

            <p>support@farmmart.com</p>
          </div>

          <div className="contact-card">
            <div className="contact-icon">💬</div>

            <h3>Live Chat</h3>

            <p>Available 24/7</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      

      <Footer />
    </>
  );
}

export default HelpSupport;