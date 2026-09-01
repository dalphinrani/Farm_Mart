import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../styles/wishlist.css";

function Wishlist() {
  const navigate = useNavigate();
  const user = JSON.parse(
  localStorage.getItem("user")
);

const userEmail = user?.email;

  const [wishlistItems, setWishlistItems] =
    useState([]);

  useEffect(() => {
  if (!userEmail) return;

  const wishlist =
    JSON.parse(
      localStorage.getItem(
        `wishlist_${userEmail}`
      )
    ) || [];

  setWishlistItems(wishlist);
}, [userEmail]);
  useEffect(() => {
  const isLoggedIn =
    localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    alert("Please login first");
    navigate("/login");
  }
}, [navigate]);

  const addToCart = (product) => {
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

  const removeFromWishlist = (id) => {
    const updatedWishlist =
      wishlistItems.filter(
        (item) => item.id !== id
      );

    localStorage.setItem(
  `wishlist_${userEmail}`,
  JSON.stringify(updatedWishlist)
);

    setWishlistItems(updatedWishlist);
  };

  return (
    <>
      <Navbar />

      <div className="wishlist-container">
        <h1>My Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <h2>No products in wishlist</h2>
        ) : (
          wishlistItems.map((item) => (
            <div
              key={item.id}
              className="wishlist-item"
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <div>
                <h3>{item.name}</h3>

                <p>
                  ₹{item.price}
                </p>

                <p>
                  ⭐ {item.rating || 4.8}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <button
                  onClick={() =>
                    addToCart(item)
                  }
                >
                  Add To Cart
                </button>

                <button
                  onClick={() =>
                    removeFromWishlist(
                      item.id
                    )
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <Footer />
    </>
  );
}

export default Wishlist;