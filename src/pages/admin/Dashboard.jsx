import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import "../../styles/dashboard.css";

function Dashboard() {
  const [recentOrders, setRecentOrders] =
    useState([]);

  const [totalUsers, setTotalUsers] =
    useState(0);

  const [totalOrders, setTotalOrders] =
    useState(0);

  const [totalProducts, setTotalProducts] =
    useState(0);

  const [totalCategories, setTotalCategories] =
    useState(0);

  useEffect(() => {
    const loadDashboard = async () => {
      let allOrders = [];

      Object.keys(localStorage).forEach(
        (key) => {
          if (key.startsWith("orders_")) {
            const userOrders =
              JSON.parse(
                localStorage.getItem(key)
              ) || [];

            allOrders = [
              ...allOrders,
              ...userOrders,
            ];
          }
        }
      );

      setRecentOrders(
        [...allOrders]
          .reverse()
          .slice(0, 5)
      );

      setTotalOrders(
        allOrders.length
      );

      try {
        // USERS
        const usersRes = await fetch(
          "http://localhost:3000/users"
        );

        const users =
          await usersRes.json();

        setTotalUsers(users.length);

        // PRODUCTS
        const productsRes =
          await fetch(
            "http://localhost:3000/products"
          );

        const products =
          await productsRes.json();

        setTotalProducts(
          products.length
        );

        const categories = [
          ...new Set(
            products.map(
              (product) =>
                product.category
            )
          ),
        ];

        setTotalCategories(
          categories.length
        );
      } catch (error) {
        console.log(error);
      }
    };

    loadDashboard();

    window.addEventListener(
      "ordersUpdated",
      loadDashboard
    );

    return () => {
      window.removeEventListener(
        "ordersUpdated",
        loadDashboard
      );
    };
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: "👥",
    },
    {
      title: "Total Products",
      value: totalProducts,
      icon: "🥬",
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: "📦",
    },
    {
      title: "Categories",
      value: totalCategories,
      icon: "📂",
    },
  ];

  return (
    <div className="dashboard-layout">
      <AdminSidebar />

      <div className="dashboard-content">
        <h1>Dashboard</h1>

        <p className="welcome-text">
          Welcome back! Here's an overview
          of your Farm Mart store.
        </p>

        <div className="stats-container">
          {stats.map(
            (item, index) => (
              <div
                key={index}
                className="stat-card"
              >
                <div className="stat-icon">
                  {item.icon}
                </div>

                <div>
                  <h4>{item.title}</h4>

                  <h2>{item.value}</h2>
                </div>
              </div>
            )
          )}
        </div>

        <div className="dashboard-grid">

          <div className="recent-orders">
            <div className="section-header">
              <h2>Recent Orders</h2>
            </div>

            {recentOrders.length ===
            0 ? (
              <p>No Orders Found</p>
            ) : (
              recentOrders.map(
                (order) => (
                  <div
                    key={order.id}
                    className="order-item"
                  >
                    <div>
                      <h4>
                        FM{order.id}
                      </h4>

                      <p>
                        {order.items
                          ?.map(
                            (item) =>
                              item.name
                          )
                          .join(", ")}
                      </p>
                    </div>

                    <div>
                      ₹{order.total}
                    </div>
                  </div>
                )
              )
            )}
          </div>

          <div className="order-overview">
            <div className="section-header">
              <h2>Order Overview</h2>
            </div>

            <div className="overview-row">
              <span>Pending</span>

              <span>
                {
                  recentOrders.filter(
                    (o) =>
                      o.status ===
                      "Pending"
                  ).length
                }
              </span>
            </div>

            <div className="overview-row">
              <span>Confirmed</span>

              <span>
                {
                  recentOrders.filter(
                    (o) =>
                      o.status ===
                      "Confirmed"
                  ).length
                }
              </span>
            </div>

            <div className="overview-row">
              <span>Shipped</span>

              <span>
                {
                  recentOrders.filter(
                    (o) =>
                      o.status ===
                      "Shipped"
                  ).length
                }
              </span>
            </div>

            <div className="overview-row">
              <span>Delivered</span>

              <span>
                {
                  recentOrders.filter(
                    (o) =>
                      o.status ===
                      "Delivered"
                  ).length
                }
              </span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;