import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../styles/checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    payment: "Cash on Delivery",
  });

  useEffect(() => {
  const isLoggedIn =
    localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    alert("Please login first");
    navigate("/login");
    return;
  }

  const user = JSON.parse(
  localStorage.getItem("user")
);

const userEmail = user?.email;

const cart =
  JSON.parse(
    localStorage.getItem(`cart_${userEmail}`)
  ) || [];

  setCartItems(cart);
}, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const total = cartItems.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const handleSubmit = (e) => {
  e.preventDefault();

  const isLoggedIn =
    localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    alert("Please login first");
    navigate("/login");
    return;
  }

  const user = JSON.parse(
  localStorage.getItem("user")
);

const userEmail = user?.email;

const cart =
  JSON.parse(
    localStorage.getItem(`cart_${userEmail}`)
  ) || [];
    if (cart.length === 0) {
  alert("Your cart is empty");
  navigate("/cart");
  return;
}
  const orders =
  JSON.parse(
    localStorage.getItem(`orders_${userEmail}`)
  ) || [];

  const newOrder = {
    id: Date.now(),
    items: cart,
    total: cart.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    ),
    date: new Date().toLocaleDateString(),
    status: "Pending",
  };

  orders.push(newOrder);

  localStorage.setItem(
  `orders_${userEmail}`,
  JSON.stringify(orders)
);

window.dispatchEvent(
  new Event("ordersUpdated")
);

localStorage.removeItem(
  `cart_${userEmail}`
);

  window.dispatchEvent(
    new Event("cartUpdated")
  );

  alert("🎉 Order Placed Successfully!");

  navigate("/order-success");
};

  return (
    <>
      <Navbar />

      <div className="checkout-page">

        {/* Left Side */}
        <div className="checkout-left">

          <h1>Delivery Details</h1>

          <form
            onSubmit={handleSubmit}
            className="checkout-form"
          >
            <label>Full Name</label>

            <input
              type="text"
              name="fullname"
              placeholder="Enter your full name"
              value={formData.fullname}
              onChange={handleChange}
              required
            />

            <div className="row">
              <div>
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Phone Number</label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <label>Delivery Address</label>

            <textarea
              name="address"
              placeholder="Enter your complete address"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <div className="row">
              <div>
                <label>City</label>

                <input
                  type="text"
                  name="city"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Pincode</label>

                <input
                  type="text"
                  name="pincode"
                  placeholder="Enter pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <h2 className="payment-title">
              Payment Method
            </h2>

            <div className="payment-option">
              <label>
                
                  
                
                Cash on Delivery
              </label>
            </div>

            

            <button
              type="submit"
              className="place-order-btn"
            >
              Place Order
            </button>

          </form>
        </div>

        {/* Right Side */}
        <div className="checkout-right">

          <h1>Order Summary</h1>

          {cartItems.map((item) => (
            <div
              className="summary-item"
              key={item.id}
            >
              <img
                src={item.image}
                alt={item.name}
              />

              <div className="summary-details">
                <h3>{item.name}</h3>

                <p>
                  Qty: {item.quantity}
                </p>
              </div>

              <h3>
                ₹
                {item.price *
                  item.quantity}
              </h3>
            </div>
          ))}

          <hr />

          <div className="summary-total">
            <span>Total</span>

            <strong>₹{total}</strong>
          </div>

          <button
            className="back-btn"
            onClick={() =>
              navigate("/cart")
            }
          >
            ← Back to Cart
          </button>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Checkout;