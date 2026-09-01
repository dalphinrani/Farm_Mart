import React from "react";
import { Link } from "react-router-dom";
import "../styles/productCard.css";

function ProductCard({ product }) {
  const addToCart = (e) => {
    e.preventDefault();

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {
      alert("Please login first");
      return;
    }

    const userEmail = user.email;

    const cart =
      JSON.parse(
        localStorage.getItem(
          `cart_${userEmail}`
        )
      ) || [];

    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem(
      `cart_${userEmail}`,
      JSON.stringify(cart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );

    alert("Product added to cart!");
  };

  const addToWishlist = (e) => {
    e.preventDefault();

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {
      alert("Please login first");
      return;
    }

    const userEmail = user.email;

    const wishlist =
      JSON.parse(
        localStorage.getItem(
          `wishlist_${userEmail}`
        )
      ) || [];

    const exists = wishlist.find(
      (item) => item.id === product.id
    );

    if (exists) {
      alert("Already in wishlist");
      return;
    }

    wishlist.push(product);

    localStorage.setItem(
      `wishlist_${userEmail}`,
      JSON.stringify(wishlist)
    );

    alert("Added to wishlist ❤️");
  };

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <div className="product-info">
        <h3>{product.name}</h3>

        <p className="product-category">
          {product.category}
        </p>

        <p className="product-rating">
          ⭐ {product.rating || 4.5}
        </p>

        <p className="product-description">
          {product.description}
        </p>

        <h4 className="product-price">
          ₹{product.price}
        </h4>

        <div className="product-buttons">
          <Link
            to={`/product/${product.id}`}
          >
            <button className="view-btn">
              Details
            </button>
          </Link>

          <button
            className="cart-btn"
            onClick={addToCart}
          >
            Add To Cart
          </button>

          <button
            className="wishlist-btn"
            onClick={addToWishlist}
          >
            ❤️ Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;