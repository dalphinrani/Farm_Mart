import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../styles/cart.css";

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const user = JSON.parse(
  localStorage.getItem("user")
);

const userEmail = user?.email;

  useEffect(() => {
  const storedCart =
    JSON.parse(
      localStorage.getItem(`cart_${userEmail}`)
    ) || [];

  setCartItems(storedCart);
}, [userEmail]);

useEffect(() => {
  const isLoggedIn =
    localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    alert("Please login first");
    navigate("/login");
  }
}, [navigate]);

  const updateQuantity = (id, type) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        if (
          type === "decrease" &&
          item.quantity > 1
        ) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }

        if (type === "increase") {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
      }

      return item;
    });

    setCartItems(updatedCart);

    localStorage.setItem(
  `cart_${userEmail}`,
  JSON.stringify(updatedCart)
);
    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(
      (item) => item.id !== id
    );

    setCartItems(updatedCart);

    localStorage.setItem(
  `cart_${userEmail}`,
  JSON.stringify(updatedCart)
);

    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };

  const clearCart = () => {
    setCartItems([]);

    localStorage.removeItem(
  `cart_${userEmail}`
);

    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };

  const total = cartItems.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <div className="cart-page">

        {/* Left Side */}
        <div className="cart-items-section">

          <div className="cart-header">
            <h2>Your Items</h2>

            <button
              className="clear-cart"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>

          {cartItems.length === 0 ? (
            <h3>Your cart is empty</h3>
          ) : (
            cartItems.map((item) => (
              <div
                className="cart-item"
                key={item.id}
              >
                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="item-details">
                  <h3>{item.name}</h3>

                  <p>{item.category}</p>

                  <h4>₹{item.price}</h4>
                </div>

                <div className="quantity-box">

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        "decrease"
                      )
                    }
                  >
                    -
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        "increase"
                      )
                    }
                  >
                    +
                  </button>

                </div>

                <h3 className="item-total">
                  ₹
                  {item.price *
                    item.quantity}
                </h3>

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeItem(item.id)
                  }
                >
                  Remove
                </button>

              </div>
            ))
          )}
        </div>

        {/* Right Side */}
        <div className="summary-section">

          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items</span>

            <span>
              {cartItems.reduce(
                (sum, item) =>
                  sum + item.quantity,
                0
              )}
            </span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>

            <span>Free</span>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>

            <strong>₹{total}</strong>
          </div>

          <button
            className="checkout-btn"
            onClick={() => {
  const isLoggedIn =
    localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    alert("Please login first");
    navigate("/login");
    return;
  }

  navigate("/checkout");
}}
          >
            Proceed To Checkout
          </button>

          <button
            className="continue-btn"
            onClick={() =>
              navigate("/products")
            }
          >
            Continue Shopping
          </button>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Cart;