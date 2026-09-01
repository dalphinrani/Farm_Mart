import React, { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import "../../styles/editProduct.css";

function EditProduct() {
  const [product, setProduct] = useState({
    name: "Fresh Tomatoes",
    category: "Vegetables",
    price: 40,
    stock: 120,
    description: "Farm Fresh Tomatoes"
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Product Updated");
  };

  return (
    <div className="edit-layout">
      <AdminSidebar />

      <div className="edit-content">
        <h1>Edit Product</h1>

        <form onSubmit={handleSubmit} className="edit-form">

          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
          />

          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
          />

          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
          />

          <button type="submit">
            Update Product
          </button>

        </form>
      </div>
    </div>
  );
}

export default EditProduct;