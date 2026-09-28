import React, { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import "../../styles/addProduct.css";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image:"",
    description: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newProduct = {
  ...product,
  rating: 4.5,
  reviews: 0,
};

      const response = await fetch(
        "https://farm-mart-backend-ukda.onrender.com/products",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            newProduct
          ),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to add product"
        );
      }

      alert(
        "Product Added Successfully"
      );

      setProduct({
        name: "",
        category: "",
        price: "",
        stock: "",
        description: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error adding product");
    }
  };

  return (
    <div className="add-layout">
      <AdminSidebar />

      <div className="add-content">
        <h1>Add Product</h1>

        <form
          onSubmit={handleSubmit}
          className="product-form"
        >
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={product.category}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={product.stock}
            onChange={handleChange}
            required
          />
          <input
  type="text"
  name="image"
  placeholder="Image URL"
  value={product.image}
  onChange={handleChange}
  required
/>


          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
          />

          <button type="submit">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
