import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../styles/productDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
  }, [id]);

  const increaseQty = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
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

    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push({
        ...product,
        quantity,
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

  const buyNow = () => {
  const isLoggedIn =
    localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    alert("Please login first");
    navigate("/login");
    return;
  }

  const cart = [
      {
        ...product,
        quantity,
      },
    ];

    const user = JSON.parse(
  localStorage.getItem("user")
);

const userEmail = user?.email;

localStorage.setItem(
  `cart_${userEmail}`,
  JSON.stringify(cart)
);

    navigate("/checkout");
  };

  if (!product) {
    return (
      <>
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: "50px" }}>
          Loading...
        </h2>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="product-details-page">

        <Link
          to="/products"
          className="back-link"
        >
          ← Back to Products
        </Link>

        <div className="product-details-card">

          <div className="product-image-section">
            <img
              src={product.image}
              alt={product.name}
            />
          </div>

          <div className="product-content">

            <p className="product-category">
              {product.category}
            </p>

            <h1>{product.name}</h1>

            <div className="product-rating">
              ⭐ {product.rating || 4.8}
            </div>

            <h2 className="product-price">
              ₹{product.price}
            </h2>

            <p className="product-description">
              {product.description}
            </p>

            <div className="quantity-section">
              <span>Quantity</span>

              <div className="quantity-box">
                <button onClick={decreaseQty}>
                  −
                </button>

                <span>{quantity}</span>

                <button onClick={increaseQty}>
                  +
                </button>
              </div>
            </div>

            <div className="product-buttons">

              <button
                className="add-cart-btn"
                onClick={addToCart}
              >
                🛒 Add To Cart
              </button>

              <button
                className="buy-now-btn"
                onClick={buyNow}
              >
                ⚡ Buy Now
              </button>

            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductDetails;