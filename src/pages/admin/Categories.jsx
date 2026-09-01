import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import "../../styles/categories.css";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        const categoryData = Object.values(
          data.reduce((acc, product) => {
            if (!acc[product.category]) {
              acc[product.category] = {
                name: product.category,
                count: 0,
              };
            }

            acc[product.category].count++;

            return acc;
          }, {})
        );

        setCategories(categoryData);
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (categoryName) => {
    const newName = prompt(
      "Enter new category name:",
      categoryName
    );

    if (!newName || newName.trim() === "") return;

    const updatedCategories = categories.map(
      (category) =>
        category.name === categoryName
          ? {
              ...category,
              name: newName,
            }
          : category
    );

    setCategories(updatedCategories);

    alert(
      "Category name updated locally."
    );
  };

  const handleDelete = (categoryName) => {
    const confirmDelete = window.confirm(
      `Delete ${categoryName} category?`
    );

    if (!confirmDelete) return;

    const updatedCategories =
      categories.filter(
        (category) =>
          category.name !== categoryName
      );

    setCategories(updatedCategories);
  };

  return (
    <div className="categories-layout">
      <AdminSidebar />

      <div className="categories-content">
        <h1>Categories</h1>

        <table className="categories-table">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Total Products</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map(
              (category, index) => (
                <tr key={index}>
                  <td>{category.name}</td>

                  <td>{category.count}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() =>
                        handleEdit(
                          category.name
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(
                          category.name
                        )
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Categories;