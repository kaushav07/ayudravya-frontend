/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  AlertOctagon,
  RefreshCw,
  ShoppingCart,
  HelpCircle,
} from "lucide-react";

export const PaymentFailure = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <div
      className="container py-5 d-flex justify-content-center align-items-center fade-in-up text-start"
      style={{ minHeight: "80vh" }}
      id="payment-failure-root"
    >
      <div
        className="card border-0 shadow-sm rounded-4 overflow-hidden w-100 bg-white"
        style={{ maxWidth: "480px" }}
      >
        <div className="card-body p-4 p-md-5 text-center">
          {/* Failure Ring */}
          <div
            className="rounded-circle bg-danger bg-opacity-10 text-danger d-flex align-items-center justify-content-center mx-auto mb-4"
            style={{ width: "80px", height: "80px" }}
          >
            <AlertOctagon size={44} />
          </div>

          <h1 className="h3 display-font fw-bold text-danger mb-2">
            Transaction Declined / Failed
          </h1>
          <p
            className="text-muted small mb-4 lh-base"
            style={{ fontSize: "0.9rem" }}
          >
            We were unable to verify your payment from your banking institution.
            The order record is saved but remains unpaid. No funds were
            captured.
          </p>

          {/* Details Block */}
          {orderId && (
            <div className="bg-light rounded-4 border p-3 text-start mb-4 text-dark font-mono small d-flex justify-content-between align-items-center">
              <span className="text-secondary">Apothecary Reference ID:</span>
              <span className="fw-bold text-dark">{orderId}</span>
            </div>
          )}

          <div
            className="alert alert-warning border-0 p-3 rounded-3 d-flex gap-2.5 mb-4 text-start"
            style={{ fontSize: "0.8rem" }}
          >
            <HelpCircle size={16} className="text-warning mt-0.5" />
            <div className="text-muted">
              <strong>Need Assistance?</strong> If you suspect this was a
              network timeout or signature verification failure, you can retry
              the transaction safely or contact billing support.
            </div>
          </div>

          {/* Action links */}
          <div className="d-flex flex-column gap-2">
            <Link
              to="/checkout"
              className="btn btn-premium py-2.5 d-flex align-items-center justify-content-center gap-2"
            >
              <RefreshCw size={15} />
              <span>Retry Payment</span>
            </Link>
            <Link
              to="/cart"
              className="btn btn-premium-outline py-2.5 d-flex align-items-center justify-content-center gap-2"
            >
              <ShoppingCart size={15} />
              <span>Back to Shopping Bag</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
