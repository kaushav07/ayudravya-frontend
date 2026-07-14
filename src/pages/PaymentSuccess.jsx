/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useLocation, Link, Navigate } from "react-router-dom";
import {
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";

export const PaymentSuccess = () => {
  const location = useLocation();
  const order = location.state?.order;

  // Safe redirect if loaded directly without active checkout session
  if (!order) {
    return <Navigate to="/" replace />;
  }

  const dateFormatted = new Date(order.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className="container py-5 d-flex justify-content-center align-items-center fade-in-up text-start"
      style={{ minHeight: "80vh" }}
      id="payment-success-root"
    >
      <div
        className="card border-0 shadow-sm rounded-4 overflow-hidden w-100 bg-white"
        style={{ maxWidth: "520px" }}
      >
        <div className="card-body p-4 p-md-5 text-center">
          {/* Success Ring */}
          <div
            className="rounded-circle bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center mx-auto mb-4"
            style={{
              width: "80px",
              height: "80px",
              color: "var(--primary-color) !important",
            }}
          >
            <CheckCircle size={44} />
          </div>

          <h1
            className="h3 display-font fw-bold text-success mb-2"
            style={{ color: "var(--primary-color)" }}
          >
            Payment Approved & Verified
          </h1>
          <p
            className="text-muted small mb-4 lh-base"
            style={{ fontSize: "0.92rem" }}
          >
            Thank you! Your clinical supplement transaction has been processed
            securely. Your order details are registered below.
          </p>

          {/* Receipt details block */}
          <div className="bg-light rounded-4 border p-4 text-start mb-4 text-dark font-mono small">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">Order Invoice No:</span>
              <span className="fw-bold text-dark">{order.order_number}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">Payment Verified On:</span>
              <span className="text-dark">{dateFormatted}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">Dispatch Destination:</span>
              <span
                className="text-dark text-truncate"
                style={{ maxWidth: "200px" }}
              >
                {order.shipping_address.full_name}
              </span>
            </div>
            <hr className="my-2 text-muted" />
            <div
              className="d-flex justify-content-between align-items-center mb-0 text-dark font-sans"
              style={{ fontSize: "0.95rem" }}
            >
              <span className="fw-bold">Total Settled Amount:</span>
              <span
                className="fw-bold font-mono text-dark"
                style={{ fontSize: "1.25rem" }}
              >
                ${order.grand_total.toFixed(2)}
              </span>
            </div>
          </div>

          <div
            className="alert alert-info border-0 p-3 rounded-3 d-flex gap-2 mb-4 text-start"
            style={{ fontSize: "0.8rem" }}
          >
            <ShieldCheck size={16} className="text-info mt-0.5" />
            <div>
              <strong>Audit Active:</strong> If your cart contained sleep
              softgels, fulfillment will be dispatched immediately following
              registered prescription validation by our licensed clinical team.
            </div>
          </div>

          {/* Navigation CTAs */}
          <div className="d-flex flex-column gap-2">
            <Link
              to={`/orders/${order.id}`}
              className="btn btn-premium py-2.5 d-flex align-items-center justify-content-center gap-2"
            >
              <span>View Invoice Receipt</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/products"
              className="btn btn-premium-outline py-2.5 d-flex align-items-center justify-content-center gap-2"
            >
              <ShoppingBag size={15} />
              <span>Continue Apothecary Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
