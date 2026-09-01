import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../styles/home.css";

function Home() {
  const categories = [
    {
      name: "Seeds",
      displayName: "🌱 Seeds",
      image:
        "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=500",
    },
    {
      name: "Fertilizers",
      displayName: "🌾 Fertilizers",
      image:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500",
    },
    {
      name: "Pesticides",
      displayName: "🧪 Pesticides",
      image:
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500",
    },
    {
      name: "Farming Equipment",
      displayName: "🚜 Farming Equipment",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500",
    },
    {
      name: "Irrigation",
      displayName: "💧 Irrigation",
      image:
        "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500",
    },
    {
      name: "Harvesting & Storage",
      displayName: "🌾 Harvesting & Storage",
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=500",
    },
    {
      name: "Nursery & Plants",
      displayName: "🌻 Nursery & Plants",
      image:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500",
    },
    {
      name: "Livestock Care",
      displayName: "🐄 Livestock Care",
      image:
        "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=500",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1>Welcome To FarmMart</h1>

          <p>
            Your One-Stop Agricultural Marketplace for Farmers
          </p>

          <Link to="/products">
            <button className="shop-btn">
              Explore Products
            </button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2>Agricultural Categories</h2>

        <div className="categories-grid">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/category/${encodeURIComponent(category.name)}`}
              className="category-link"
            >
              <div className="category-card">
                <img
                  src={category.image}
                  alt={category.name}
                />

                <h3>{category.displayName}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>Why Choose FarmMart?</h2>

        <div className="about-grid">
          <div className="about-card">
            <h3>Quality Products</h3>

            <p>
              Trusted agricultural products from verified suppliers.
            </p>
          </div>

          <div className="about-card">
            <h3>Best Prices</h3>

            <p>
              Affordable pricing without unnecessary middlemen.
            </p>
          </div>

          <div className="about-card">
            <h3>Fast Delivery</h3>

            <p>
              Quick and secure delivery across the country.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;