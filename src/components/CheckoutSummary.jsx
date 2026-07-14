/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Lock, FileWarning } from "lucide-react";

export const CheckoutSummary = ({
  summary,
  loading,
  onPlaceOrder,
  disabled = false,
}) => {
  const { subtotal, tax, shipping_charge, grand_total, requires_prescription } =
    summary;

  return (
    <div
      className="card border-0 shadow-sm p-4 rounded-4 bg-white"
      id="checkout-summary-component"
    >
      <h3 className="h5 fw-bold text-dark display-font border-bottom pb-3 mb-3">
        Payment & Checkout Summary
      </h3>

      <div className="d-flex flex-column gap-2.5 mb-4 small">
        {/* Subtotal */}
        <div className="d-flex justify-content-between align-items-center">
          <span className="text-secondary">Apothecary Subtotal</span>
          <span className="font-mono fw-medium text-dark">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {/* Shipping */}
        <div className="d-flex justify-content-between align-items-center">
          <span className="text-secondary">Clinical Secure Logistics</span>
          <span className="font-mono text-dark">
            {shipping_charge === 0 ? (
              <span className="text-success fw-semibold">FREE</span>
            ) : (
              `$${shipping_charge.toFixed(2)}`
            )}
          </span>
        </div>

        {/* Estimated Tax */}
        <div className="d-flex justify-content-between align-items-center">
          <span className="text-secondary">Estimated Sales Tax (12%)</span>
          <span className="font-mono text-dark">${tax.toFixed(2)}</span>
        </div>

        <hr className="my-2.5 text-muted" />

        {/* Grand Total */}
        <div className="d-flex justify-content-between align-items-center mb-1">
          <span className="fw-bold text-dark" style={{ fontSize: "0.95rem" }}>
            Grand Total Due
          </span>
          <span
            className="fw-bold font-mono display-font text-dark"
            style={{ fontSize: "1.4rem" }}
          >
            ${grand_total.toFixed(2)}
          </span>
        </div>
      </div>

      {requires_prescription && (
        <div
          className="alert alert-warning border-0 p-3 rounded-3 d-flex gap-2.5 mb-4"
          style={{ backgroundColor: "#fffcf5" }}
        >
          <FileWarning size={18} className="text-warning mt-0.5" />
          <p
            className="text-muted small mb-0 lh-base"
            style={{ fontSize: "0.78rem" }}
          >
            <strong>Prescription Required:</strong> This order contains Rx
            items. You must attach a prescription before placing this order.
          </p>
        </div>
      )}

      {/* Place Order CTA */}
      <button
        type="button"
        onClick={onPlaceOrder}
        disabled={disabled || loading}
        className="btn btn-premium w-100 py-3 d-flex align-items-center justify-content-center gap-2 mb-3"
        style={{ fontSize: "0.95rem" }}
      >
        {loading ? (
          <>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
            <span>Securing Order Spot...</span>
          </>
        ) : (
          <>
            <Lock size={16} />
            <span>Place Order & Pay Securely</span>
          </>
        )}
      </button>

      <div className="d-flex align-items-center justify-content-center gap-1.5 text-muted small mt-2">
        <Lock size={13} className="text-success" />
        <span style={{ fontSize: "0.75rem" }}>
          Secure transaction handled via bank-level security.
        </span>
      </div>
    </div>
  );
};
