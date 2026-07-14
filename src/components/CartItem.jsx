/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { QuantitySelector } from "./QuantitySelector";
import { RxBadge } from "./RxBadge";

export const CartItem = ({ item, onQtyChange, onRemove, disabled = false }) => {
  const { product, quantity, price } = item;
  const itemTotal = price * quantity;

  return (
    <div
      className="card border-0 border-bottom rounded-0 py-3 bg-white"
      id={`cart-item-${item.id}`}
    >
      <div className="card-body p-0">
        <div className="row g-3 align-items-center">
          {/* Product Thumbnail */}
          <div className="col-3 col-md-2">
            <div className="ratio ratio-1x1 bg-light border rounded-3 overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-100 h-100 object-fit-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="col-9 col-md-5">
            <span
              className="text-uppercase text-muted font-mono"
              style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}
            >
              {product.manufacturer}
            </span>
            <h5 className="h6 mb-1 display-font text-truncate">
              <Link
                to={`/product/${product.slug}`}
                className="text-dark text-decoration-none hover-text-success"
              >
                {product.name}
              </Link>
            </h5>
            <p
              className="text-muted small mb-1.5 text-truncate"
              style={{ maxWidth: "300px" }}
            >
              <strong>Formula:</strong> {product.composition}
            </p>
            <div className="d-flex align-items-center gap-2">
              <span className="text-muted font-mono small">
                {product.pack_size}
              </span>
              <RxBadge required={product.requires_prescription} size="sm" />
            </div>
          </div>

          {/* Quantity Select and Prices */}
          <div className="col-12 col-md-5 d-flex align-items-center justify-content-between justify-content-md-end gap-md-4 mt-3 mt-md-0">
            {/* Quantity Controls */}
            <QuantitySelector
              quantity={quantity}
              maxQuantity={product.stock_qty || 10}
              onChange={onQtyChange}
              disabled={disabled}
            />

            {/* Calculations and Remove */}
            <div className="text-end d-flex align-items-center gap-3">
              <div className="d-flex flex-column">
                <span
                  className="fw-bold text-dark font-mono"
                  style={{ fontSize: "1rem" }}
                >
                  ${itemTotal.toFixed(2)}
                </span>
                <span
                  className="text-muted font-mono"
                  style={{ fontSize: "0.75rem" }}
                >
                  (${price.toFixed(2)} each)
                </span>
              </div>

              <button
                type="button"
                className="btn btn-sm btn-outline-danger p-2 border-0 rounded-circle"
                onClick={onRemove}
                disabled={disabled}
                title="Remove item"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
