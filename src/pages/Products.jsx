/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Search, Eye } from "lucide-react";
import { productService } from "../services/productService";
import { ProductCard } from "../components/ProductCard";
import { Loader } from "../components/Loader";
import { ErrorMessage } from "../components/ErrorMessage";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        setLoading(true);
        setError(null);
        const [prodRes, catRes] = await Promise.all([
          productService.getProducts(),
          productService.getCategories(),
        ]);
        setProducts(prodRes.items);
        setCategories(catRes);
      } catch (err) {
        setError(
          err.message ||
            "Failed to load apothecary products. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };
    loadCatalog();
  }, []);

  const filteredProducts = products.filter((prod) => {
    const matchesCategory =
      selectedCategory === "all" || prod.category_slug === selectedCategory;
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.composition.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div
      className="container py-5 fade-in-up text-start"
      id="products-catalog-page"
    >
      {/* Header Description */}
      <div className="border-bottom pb-4 mb-4">
        <h1 className="display-5 fw-bold display-font text-dark mb-2">
          Our Clinical Catalog
        </h1>
        <p
          className="text-secondary mb-0 max-w-2xl"
          style={{ maxWidth: "600px", fontSize: "1rem" }}
        >
          Explore our focused apothecary systems. We specialize in everyday
          metabolic vitality, sleep support, and premium targeted men's wellness
          formulations.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="row g-3 align-items-center mb-5">
        <div className="col-12 col-md-5">
          <div className="position-relative">
            <input
              type="text"
              placeholder="Search active ingredients, e.g. Ashwagandha..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control py-2.5 ps-5 rounded-0 bg-white border-light-subtle small text-dark"
              style={{ fontSize: "0.9rem" }}
            />

            <Search
              className="position-absolute text-muted"
              size={18}
              style={{
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
          </div>
        </div>

        <div className="col-12 col-md-7 d-flex flex-wrap gap-2 justify-content-md-end">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`btn btn-sm px-3 py-2 rounded-0 fw-semibold font-mono ${
              selectedCategory === "all"
                ? "bg-success text-white"
                : "bg-light text-secondary border"
            }`}
            style={{
              fontSize: "0.78rem",
              backgroundColor:
                selectedCategory === "all" ? "var(--primary-color)" : "",
              color: selectedCategory === "all" ? "#ffffff" : "",
              borderRadius: 0,
            }}
          >
            All Formulas
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`btn btn-sm px-3 py-2 rounded-0 fw-semibold font-mono ${
                selectedCategory === cat.slug
                  ? "bg-success text-white"
                  : "bg-light text-secondary border"
              }`}
              style={{
                fontSize: "0.78rem",
                backgroundColor:
                  selectedCategory === cat.slug ? "var(--primary-color)" : "",
                color: selectedCategory === cat.slug ? "#ffffff" : "",
                borderRadius: 0,
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid display */}
      {loading ? (
        <Loader message="Accessing secure medical formulations..." />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : filteredProducts.length === 0 ? (
        <div className="text-center p-5 border rounded-0 bg-white my-4">
          <Eye size={40} className="text-muted mb-3" />
          <h4 className="fw-semibold text-dark mb-1 display-font">
            No formulations found
          </h4>
          <p className="text-muted small">
            No products match your search or filter inputs. Reset your search to
            try again.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="btn btn-premium-outline mt-3 small"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="row g-4 justify-content-center">
          {filteredProducts.map((product) => (
            <div className="col-12 col-md-6" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
