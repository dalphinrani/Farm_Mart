import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../styles/about.css";

function About() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-overlay">
          <h1>About FarmMart</h1>

          <p>
            Empowering Farmers with Quality Products,
            Modern Technology and Sustainable Farming Solutions.
          </p>

          <Link to="/products">
            <button className="about-btn">
              Explore Products
            </button>
          </Link>
        </div>
      </section>

      {/* Who We Are */}
      <section className="about-section">
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200"
            alt="Farmer"
          />
        </div>

        <div className="about-content">
          <h2>Who We Are</h2>

          <p>
            FarmMart is a trusted agricultural marketplace
            dedicated to helping farmers access premium-quality
            seeds, fertilizers, pesticides, irrigation systems
            and farming equipment.
          </p>

          <p>
            We connect farmers with reliable suppliers,
            ensuring affordability, quality and convenience
            through a seamless online shopping experience.
          </p>

          <p>
            Our mission is to support modern agriculture by
            providing innovative products that improve crop
            productivity, sustainability and farming success.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-section">
        <h2>Why Choose FarmMart?</h2>

        <div className="why-grid">
          <div className="why-card">
            <div className="why-icon">🌱</div>

            <h3>Premium Quality Products</h3>

            <p>
              Carefully selected seeds, fertilizers and
              pesticides sourced from trusted suppliers
              to ensure better crop growth and maximum yield.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">🚜</div>

            <h3>Modern Farming Solutions</h3>

            <p>
              Access advanced farming equipment and tools
              designed to improve efficiency and reduce
              manual effort in agricultural operations.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">💧</div>

            <h3>Smart Irrigation Systems</h3>

            <p>
              Innovative irrigation solutions that help
              conserve water while maintaining healthy
              crop growth throughout the season.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">🚚</div>

            <h3>Fast & Reliable Delivery</h3>

            <p>
              Quick order processing and secure delivery
              services ensuring products reach farmers
              exactly when they are needed.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mission-section">
        <div className="mission-card">
          <h2>🎯 Our Mission</h2>

          <p>
            To empower farmers by providing quality
            agricultural products, modern farming
            technologies and reliable support that
            helps improve productivity and sustainability.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Ready To Grow With FarmMart?</h2>

        <p>
          Discover a wide range of agricultural products
          designed to support your farming journey.
        </p>

        <Link to="/products">
          <button className="about-btn">
            Shop Now
          </button>
        </Link>
      </section>

      <Footer />
    </>
  );
}

export default About;