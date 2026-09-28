import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
function CategoryProductCard({ product }) {
  const navigate = useNavigate();

  const [isWishlisted, setIsWishlisted] =
    useState(false);

  useEffect(() => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const userEmail = user?.email;

  const wishlist =
    JSON.parse(
      localStorage.getItem(
        `wishlist_${userEmail}`
      )
    ) || [];

  const exists = wishlist.find(
    (item) => item.id === product.id
  );

  setIsWishlisted(!!exists);
}, [product.id]);

  const addToCart = (e) => {
  e.preventDefault();

  const isLoggedIn =
    localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    alert("Please login first");
    window.location.href = "/Login";
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

  const toggleWishlist = (e) => {
  e.preventDefault();

  const isLoggedIn =
    localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    alert("Please login first");
    window.location.href = "/Login";
    return;
  }

  const user = JSON.parse(
  localStorage.getItem("user")
);

const userEmail = user?.email;

let wishlist =
  JSON.parse(
    localStorage.getItem(
      `wishlist_${userEmail}`
    )
  ) || [];

    const exists = wishlist.find(
      (item) => item.id === product.id
    );

    if (exists) {
      wishlist = wishlist.filter(
        (item) => item.id !== product.id
      );

      setIsWishlisted(false);
    } else {
      wishlist.push(product);

      setIsWishlisted(true);
    }

    localStorage.setItem(
  `wishlist_${userEmail}`,
  JSON.stringify(wishlist)
);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div
        style={{
          width: "260px",
          background: "#fff",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.08)",
          transition: "0.3s",
          height: "340px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            position: "relative",
          }}
        >
          <div
            style={{
              padding: "10px 10px 0 10px",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "12px",
                border:
                  "1px solid #e5e7eb",
              }}
            />
          </div>

          <span
            style={{
              position: "absolute",
              top: "18px",
              left: "18px",
              background: "#fff",
              padding: "6px 12px",
              borderRadius: "30px",
              fontSize: "12px",
              fontWeight: "600",
              color: "#355e3b",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            {product.category}
          </span>

          <button
  onClick={toggleWishlist}
  style={{
    position: "absolute",
    top: "18px",
    right: "18px",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "none",
    background: "#fff",
    cursor: "pointer",
    fontSize: "24px",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: isWishlisted ? "#ff3b5c" : "#999",
  }}
>
  {isWishlisted ? "♥" : "♡"}
</button>
        </div>

        <div
          style={{
            padding: "8px 15px 15px 15px",
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            flex: 1,
          }}
        >
          <div>
            <h3
              style={{
                margin: "0 0 4px",
                color: "#26452f",
                fontSize: "15px",
                fontWeight: "600",
                lineHeight: "1.3",
              }}
            >
              {product.name}
            </h3>

            <p
              style={{
                margin: 0,
                color: "#666",
                fontSize: "13px",
              }}
            >
              ⭐ {product.rating || 4.8}
            </p>
          </div>

          <div
            style={{
              textAlign: "right",
              minWidth: "120px",
            }}
          >
            <h4
              style={{
                color: "#2e7d32",
                margin: "0 0 8px",
                fontSize: "18px",
              }}
            >
              ₹{product.price}
            </h4>

            <button
              onClick={addToCart}
              style={{
                width: "110px",
                height: "38px",
                background: "#46734a",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "13px",
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CategoryProductCard;
