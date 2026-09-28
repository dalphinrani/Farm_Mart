import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import "../../styles/products.css";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://farm-mart-backend-ukda.onrender.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(
        `https://farm-mart-backend-ukda.onrender.com/products/${id}`,
        {
          method: "DELETE",
        }
      );

      setProducts(
        products.filter(
          (product) => product.id !== id
        )
      );

      alert("Product deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="products-layout">
      <AdminSidebar />

      <div className="products-content">
        <div className="products-header">
          <h1>Products Management</h1>

          <Link to="/admin/add-product">
            <button className="add-btn">
              Add Product
            </button>
          </Link>
        </div>

        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                  }}
                >
                  No Products Found
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-thumb"
                    />
                  </td>

                  <td>{product.name}</td>

                  <td>{product.category}</td>

                  <td>₹{product.price}</td>

                  <td>{product.stock}</td>

                  <td>
                    <Link
                      to={`/admin/edit-product/${product.id}`}
                    >
                      <button className="edit-btn">
                        Edit
                      </button>
                    </Link>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(product.id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
