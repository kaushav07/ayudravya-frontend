/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { RxBadge } from "./RxBadge";
import { PriceDisplay } from "./PriceDisplay";
import { StockBadge } from "./StockBadge";
import { useApp } from "../store/AppContext";
import { Button } from "./Button";

export const ProductCard = ({ product }) => {
  const { addToCart, loadingCart } = useApp();

  const handleQuickAdd = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await addToCart(product.id, 1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="card premium-card h-100 shadow-sm border-0 d-flex flex-column"
      id={`product-card-${product.slug}`}
    >
      {/* Product Image & Badges */}
      <div
        className="position-relative overflow-hidden bg-light"
        style={{ paddingBottom: "100%" }}
      >
        <Link to={`/product/${product.slug}`} className="d-block">
          <img
            src={product.images[0]}
            alt={product.name}
            className="position-absolute w-100 h-100 object-fit-cover transition-transform"
            style={{
              top: 0,
              left: 0,
              transition: "transform 0.5s ease",
            }}
            referrerPolicy="no-referrer"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          />
        </Link>
        <div
          className="position-absolute top-3 start-3 d-flex flex-column gap-2"
          style={{ zIndex: 2 }}
        >
          <RxBadge required={product.requires_prescription} size="sm" />
        </div>
      </div>

      {/* Product Content */}
      <div className="card-body p-4 d-flex flex-column flex-grow-1">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <span
            className="text-uppercase text-muted font-mono small fw-semibold"
            style={{ letterSpacing: "0.05em" }}
          >
            {product.manufacturer}
          </span>
          <StockBadge status={product.stock_status} qty={product.stock_qty} />
        </div>

        <h4 className="card-title h5 display-font mb-2">
          <Link
            to={`/product/${product.slug}`}
            className="text-dark text-decoration-none hover-text-success"
          >
            {product.name}
          </Link>
        </h4>

        <p
          className="text-secondary small mb-3 flex-grow-1"
          style={{
            display: "-webkit-box",
            WebKitLineClamp: 2,
            WebKitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          <strong>Formula:</strong> {product.composition}
        </p>

        <div className="border-top pt-3 mt-auto d-flex align-items-center justify-content-between">
          <div>
            <PriceDisplay
              price={product.price}
              compareAtPrice={product.compare_at_price}
              size="sm"
            />
            <span className="text-muted small font-mono">
              {product.pack_size}
            </span>
          </div>

          <div className="d-flex gap-2">
            <Link
              to={`/product/${product.slug}`}
              className="btn btn-outline-secondary p-2.5 rounded-circle d-flex align-items-center justify-content-center"
              title="View Details"
            >
              <ArrowRight size={16} />
            </Link>
            <Button
              variant="premium"
              onClick={handleQuickAdd}
              disabled={loadingCart || product.stock_status === "Out of Stock"}
              className="p-2.5 rounded-circle d-flex align-items-center justify-content-center"
              title="Add to Cart"
            >
              <ShoppingCart size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
