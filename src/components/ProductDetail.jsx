/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  ShieldAlert,
  BookOpen,
  Truck,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import { ProductGallery } from "./ProductGallery";
import { RxBadge } from "./RxBadge";
import { StockBadge } from "./StockBadge";
import { PriceDisplay } from "./PriceDisplay";
import { QuantitySelector } from "./QuantitySelector";
import { AddToCartButton } from "./AddToCartButton";
import { ProductCard } from "./ProductCard";
import { useNavigate } from "react-router-dom";

export const ProductDetail = ({
  product,
  relatedProducts,
  onAddToCart,
  loadingCart,
}) => {
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  const handleAdd = async () => {
    await onAddToCart(qty);
  };

  const handleBuyNow = async () => {
    await onAddToCart(qty);
    navigate("/cart");
  };

  return (
    <div
      className="container py-4 fade-in-up"
      id={`product-detail-view-${product.slug}`}
    >
      <div className="row g-5">
        {/* Left Column: Product Image Gallery */}
        <div className="col-12 col-lg-6">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Right Column: Information & Actions */}
        <div className="col-12 col-lg-6 text-start">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
            <span
              className="text-uppercase text-muted font-mono fw-bold small"
              style={{ letterSpacing: "0.08em" }}
            >
              {product.manufacturer}
            </span>
            <StockBadge status={product.stock_status} qty={product.stock_qty} />
          </div>

          <h1 className="h2 fw-bold text-dark display-font mb-2 lh-sm">
            {product.name}
          </h1>
          <p className="text-secondary mb-4 small italic">{product.subtitle}</p>

          <div className="border-bottom pb-4 mb-4">
            <RxBadge required={product.requires_prescription} size="md" />
          </div>

          {/* Pricing Row */}
          <div className="mb-4 bg-light p-3 rounded-3 border">
            <span className="text-muted small font-mono d-block mb-1">
              Exclusive Online Price
            </span>
            <PriceDisplay
              price={product.price}
              compareAtPrice={product.compare_at_price}
              size="lg"
            />
            <span className="text-muted small font-mono mt-1.5 d-block">
              Pack Size: {product.pack_size}
            </span>
          </div>

          {/* Clinical Formula Details */}
          <div className="card border-light-subtle rounded-3 p-3.5 mb-4 bg-white shadow-xs">
            <h5 className="h6 fw-bold text-dark display-font mb-2 d-flex align-items-center gap-2">
              <Sparkles size={14} className="text-success" />
              <span>Pharmaceutical Profile</span>
            </h5>
            <div className="row g-2 small">
              <div className="col-6">
                <span
                  className="text-muted d-block font-mono"
                  style={{ fontSize: "0.72rem" }}
                >
                  Composition Formula
                </span>
                <span className="text-dark fw-medium">
                  {product.composition}
                </span>
              </div>
              <div className="col-6">
                <span
                  className="text-muted d-block font-mono"
                  style={{ fontSize: "0.72rem" }}
                >
                  Dosage Form
                </span>
                <span className="text-dark fw-medium">
                  {product.dosage_form}
                </span>
              </div>
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="border-top pt-4 mb-4">
            {product.stock_status !== "Out of Stock" ? (
              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-center gap-3">
                  <span className="text-muted small fw-medium">
                    Order Quantity:
                  </span>
                  <QuantitySelector
                    quantity={qty}
                    maxQuantity={product.stock_qty || 10}
                    onChange={(val) => setQty(val)}
                  />
                </div>

                <div className="row g-2 mt-1">
                  <div className="col-6">
                    <AddToCartButton
                      onClick={handleAdd}
                      loading={loadingCart}
                      outOfStock={product.stock_status === "Out of Stock"}
                      className="w-100 py-3 font-medium small btn-premium"
                    />
                  </div>
                  <div className="col-6">
                    <button
                      type="button"
                      onClick={handleBuyNow}
                      disabled={
                        loadingCart || product.stock_status === "Out of Stock"
                      }
                      className="btn btn-premium-accent w-100 py-3 font-semibold d-inline-flex align-items-center justify-content-center gap-2"
                    >
                      <ShoppingBag size={18} />
                      <span>Buy Now</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="alert alert-danger border-0 p-3 mb-0 rounded-3">
                This item is currently out of stock. Contact customer support to
                reserve your prescription.
              </div>
            )}
          </div>

          {/* Secure details badges */}
          <div className="d-flex flex-wrap gap-4 text-secondary small pt-2">
            <div className="d-flex align-items-center gap-1.5">
              <Truck size={14} className="text-success" />
              <span>Climate-controlled logistics</span>
            </div>
            <div className="d-flex align-items-center gap-1.5">
              <BookOpen size={14} className="text-success" />
              <span>Pharmacist certified batch</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Safety Tabs */}
      <div className="row mt-5">
        <div className="col-12 col-lg-8 text-start">
          {/* Detailed Description */}
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
            <h3 className="h5 fw-bold text-dark border-bottom pb-2.5 mb-3 display-font">
              Product Profile & Description
            </h3>
            <p
              className="text-secondary lh-lg mb-0"
              style={{ fontSize: "0.95rem" }}
            >
              {product.description}
            </p>
          </div>

          {/* Safety Warning */}
          {product.safety_info && (
            <div
              className="card border-0 shadow-sm rounded-4 p-4 bg-white"
              style={{ borderLeft: "4px solid #dc3545 !important" }}
            >
              <div className="d-flex gap-3">
                <div className="text-danger mt-1">
                  <ShieldAlert size={24} />
                </div>
                <div>
                  <h3 className="h5 fw-bold text-dark display-font mb-2">
                    Safety & Usage Information
                  </h3>
                  <p className="text-muted small lh-lg mb-0">
                    {product.safety_info}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-5 text-start" id="related-products-section">
          <h3 className="h4 fw-bold text-dark display-font mb-4">
            Complementary Products
          </h3>
          <div className="row g-4">
            {relatedProducts.map((relProd) => (
              <div className="col-12 col-md-6" key={relProd.id}>
                <ProductCard product={relProd} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
