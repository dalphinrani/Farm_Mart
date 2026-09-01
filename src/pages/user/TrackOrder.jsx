import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function TrackOrder() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(savedOrders);
  }, []);

  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "40px",
          minHeight: "70vh",
        }}
      >
        <h1>Track Orders</h1>

        {orders.length === 0 ? (
          <h2>No Orders Found</h2>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "10px",
                background: "#fff",
              }}
            >
              <h3>Order ID: FM{order.id}</h3>

              <p>
                <strong>Date:</strong>{" "}
                {order.date}
              </p>

              <p>
                <strong>Total:</strong> ₹
                {order.total}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    color:
                      order.status === "Delivered"
                        ? "green"
                        : order.status === "Shipped"
                        ? "orange"
                        : "blue",
                    fontWeight: "bold",
                  }}
                >
                  {order.status}
                </span>
              </p>

              <h4>Products:</h4>

              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.name} × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>

      <Footer />
    </>
  );
}

export default TrackOrder;