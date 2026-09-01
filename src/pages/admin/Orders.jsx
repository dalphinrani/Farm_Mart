import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import "../../styles/orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    let allOrders = [];

    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("orders_")) {
        const userOrders =
          JSON.parse(localStorage.getItem(key)) || [];

        const email = key.replace("orders_", "");

        userOrders.forEach((order) => {
          allOrders.push({
            ...order,
            userEmail: email,
          });
        });
      }
    });

    setOrders(allOrders.reverse());
  };

  const updateStatus = (
    orderId,
    email,
    newStatus
  ) => {
    const userOrders =
      JSON.parse(
        localStorage.getItem(`orders_${email}`)
      ) || [];

    const updatedOrders = userOrders.map(
      (order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
            }
          : order
    );

    localStorage.setItem(
      `orders_${email}`,
      JSON.stringify(updatedOrders)
    );

    loadOrders();

    window.dispatchEvent(
      new Event("ordersUpdated")
    );
  };

  return (
    <div className="orders-layout">
      <AdminSidebar />

      <div className="orders-content">
        <h1>Order Management</h1>

        {orders.length === 0 ? (
          <h2>No Orders Found</h2>
        ) : (
          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Products</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>FM{order.id}</td>

                    <td>{order.userEmail}</td>

                    <td>
                      {order.items
                        ?.map(
                          (item) => item.name
                        )
                        .join(", ")}
                    </td>

                    <td>₹{order.total}</td>

                    <td>{order.date}</td>

                    <td>
                      <select
                        value={order.status}
                        className={`status-dropdown ${order.status.toLowerCase()}`}
                        onChange={(e) =>
                          updateStatus(
                            order.id,
                            order.userEmail,
                            e.target.value
                          )
                        }
                      >
                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Confirmed">
                          Confirmed
                        </option>

                        <option value="Shipped">
                          Shipped
                        </option>

                        <option value="Delivered">
                          Delivered
                        </option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;