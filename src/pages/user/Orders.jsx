import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../styles/ordersUser.css";

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = () => {
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

      const savedOrders =
        JSON.parse(
          localStorage.getItem(
            `orders_${userEmail}`
          )
        ) || [];

      setOrders(savedOrders);
    };

    loadOrders();

    window.addEventListener(
      "ordersUpdated",
      loadOrders
    );

    return () => {
      window.removeEventListener(
        "ordersUpdated",
        loadOrders
      );
    };
  }, [navigate]);

  return (
    <>
      <Navbar />

      <div className="orders-user-container">
        <h1>My Orders</h1>

        {orders.length === 0 ? (
          <h2>No Orders Found</h2>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Products</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    FM{order.id}
                  </td>

                  <td>
                    {order.items
                      ?.map(
                        (item) => item.name
                      )
                      .join(", ")}
                  </td>

                  <td>
                    ₹{order.total}
                  </td>

                  <td>
                    {order.date}
                  </td>

                  <td>
                    <span
                      className={`status ${order.status.toLowerCase()}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Orders;