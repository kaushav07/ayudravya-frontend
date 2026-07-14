/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ShieldCheck, ArrowRight, FileWarning } from "lucide-react";
import { Link } from "react-router-dom";

export const CartSummary = ({ cart, onCheckoutClick }) => {
  const { subtotal, requires_prescription } = cart;

  return (
    <div
      className="card border-0 shadow-sm p-4 rounded-4 bg-white"
      id="cart-summary-component"
    >
      <h3 className="h5 fw-bold text-dark display-font border-bottom pb-3 mb-3">
        Order Summary
      </h3>

      <div className="d-flex flex-column gap-3 mb-4">
        {/* Subtotal */}
        <div className="d-flex justify-content-between align-items-center">
          <span className="text-secondary small">Cart Subtotal</span>
          <span
            className="fw-semibold text-dark font-mono"
            style={{ fontSize: "1.1rem" }}
          >
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {/* Prescription Notice */}
        {requires_prescription && (
          <div
            className="alert alert-warning border-0 p-3 rounded-3 d-flex gap-2.5 mb-0"
            style={{ backgroundColor: "#fffcf5" }}
          >
            <FileWarning size={18} className="text-warning mt-0.5" />
            <div>
              <h6 className="fw-bold text-dark small mb-1">
                Prescription Required
              </h6>
              <p
                className="text-muted mb-0"
                style={{ fontSize: "0.78rem", lineHeight: "1.4" }}
              >
                Contains Rx items. You will need to upload a valid doctor
                prescription (PNG, JPG, PDF) during checkout.
              </p>
            </div>
          </div>
        )}

        {/* Free Shipping Progress */}
        <div className="bg-light p-3 rounded-3">
          <div className="d-flex justify-content-between text-dark small fw-medium mb-1.5">
            <span style={{ fontSize: "0.8rem" }}>
              {subtotal >= 100
                ? "You qualify for Free Delivery!"
                : "Add $100 for Free Delivery"}
            </span>
            <span className="font-mono" style={{ fontSize: "0.8rem" }}>
              ${subtotal.toFixed(2)} / $100
            </span>
          </div>
          <div
            className="progress"
            style={{ height: "6px", backgroundColor: "#e5e3df" }}
          >
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: `${Math.min((subtotal / 100) * 100, 100)}%`,
                backgroundColor: "var(--primary-color)",
              }}
              aria-valuenow={subtotal}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      </div>

      {/* Checkout Actions */}
      {onCheckoutClick ? (
        <button
          onClick={onCheckoutClick}
          className="btn btn-premium w-100 py-3 d-flex align-items-center justify-content-center gap-2 mb-3"
          style={{ fontSize: "0.95rem" }}
        >
          <span>Proceed to Checkout</span>
          <ArrowRight size={16} />
        </button>
      ) : (
        <Link
          to="/checkout"
          className="btn btn-premium w-100 py-3 d-flex align-items-center justify-content-center gap-2 mb-3 text-decoration-none"
          style={{ fontSize: "0.95rem" }}
        >
          <span>Proceed to Checkout</span>
          <ArrowRight size={16} />
        </Link>
      )}

      {/* Safety info badge */}
      <div className="d-flex align-items-center justify-content-center gap-1.5 text-muted small mt-2">
        <ShieldCheck size={14} className="text-success" />
        <span style={{ fontSize: "0.78rem" }}>Secure Checkout Guaranteed</span>
      </div>
    </div>
  );
};
