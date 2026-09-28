import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CategoryProductCard from "../../components/CategoryProductCard";
import "../../styles/categoryProducts.css";

function CategoryProducts() {
  const { name } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://farm-mart-backend-ukda.onrender.com/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const shuffleProducts = (array) => {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [shuffled[i], shuffled[j]] = [
        shuffled[j],
        shuffled[i],
      ];
    }

    return shuffled;
  };

  const selectedCategory = name
    ? decodeURIComponent(name)
    : null;

  const filteredProducts = selectedCategory
  ? products.filter(
      (product) =>
        product.category &&
        product.category
          .trim()
          .toLowerCase() ===
        selectedCategory
          .trim()
          .toLowerCase()
    )
  : shuffleProducts(products);
console.log("Selected Category:", selectedCategory);
console.log("Products:", products);
console.log("Filtered Products:", filteredProducts);
  return (
    
    <>
      <Navbar />

      <div className="category-products">
        <h1>
          {selectedCategory
            ? selectedCategory
            : "All Products"}
        </h1>

        {loading ? (
          <div className="no-products">
            <h2>Loading products...</h2>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <CategoryProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="no-products">
            <h2>No products found</h2>
            <p>
              There are no products available at the
              moment.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default CategoryProducts;
