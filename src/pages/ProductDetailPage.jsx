/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { productService } from "../services/productService";
import { ProductDetail } from "../components/ProductDetail";
import { Loader } from "../components/Loader";
import { ErrorMessage } from "../components/ErrorMessage";
import { useApp } from "../store/AppContext";

export const ProductDetailPage = () => {
  const { slug } = useParams();
  const { addToCart, loadingCart } = useApp();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProductData = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        setError(null);
        // Fetch product and related products
        const prod = await productService.getProductBySlug(slug);
        setProduct(prod);
        try {
          const related = await productService.getRelatedProducts(slug);
          setRelatedProducts(related);
        } catch (e) {
          console.warn(
            "Failed to load related products, utilizing empty state.",
            e,
          );
          setRelatedProducts([]);
        }
      } catch (err) {
        setError(
          err.message || "The requested clinical formula does not exist.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadProductData();
  }, [slug]);

  const handleAddToCart = async (quantity) => {
    if (!product) return;
    try {
      await addToCart(product.id, quantity);
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  };

  if (loading) {
    return <Loader message="Analyzing formulation components..." fullPage />;
  }

  if (error || !product) {
    return (
      <div className="container py-5 text-start">
        <Link
          to="/products"
          className="btn btn-premium-outline mb-4 small d-inline-flex align-items-center gap-1.5"
        >
          <ArrowLeft size={14} />
          <span>Back to Clinical Catalog</span>
        </Link>
        <ErrorMessage message={error || "Product not found"} />
      </div>
    );
  }

  return (
    <div className="py-3 text-start" id="product-detail-page-wrapper">
      <div className="container pb-3">
        {/* Back Link */}
        <Link
          to="/products"
          className="text-secondary text-decoration-none hover-text-success small d-inline-flex align-items-center gap-1.5 font-mono"
        >
          <ArrowLeft size={13} />
          <span>Back to Catalog</span>
        </Link>
      </div>

      <ProductDetail
        product={product}
        relatedProducts={relatedProducts}
        onAddToCart={handleAddToCart}
        loadingCart={loadingCart}
      />
    </div>
  );
};
