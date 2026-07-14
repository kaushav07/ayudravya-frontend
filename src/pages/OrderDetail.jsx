/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Clock, FileText, Ban } from "lucide-react";
import { orderService } from "../services/orderService";
import { useApp } from "../store/AppContext";
import { Loader } from "../components/Loader";
import { ErrorMessage } from "../components/ErrorMessage";
import { Button } from "../components/Button";

export const OrderDetail = () => {
  const { id } = useParams();
  const { user, loadingUser } = useApp();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  // Auth Guard
  useEffect(() => {
    if (!loadingUser && !user) {
      navigate(`/login?redirect=orders/${id}`);
    }
  }, [user, loadingUser, navigate, id]);

  const loadOrder = async () => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      const data = await orderService.getOrderById(id);
      setOrder(data);
    } catch (err) {
      setError(
        err.message ||
          "The requested order record does not exist on your profile.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && id) {
      loadOrder();
    }
  }, [user, id]);

  const handleCancelOrder = async () => {
    if (!order) return;
    if (
      !window.confirm(
        "Are you strictly sure you want to cancel this prescription order? This action cannot be undone.",
      )
    )
      return;

    try {
      setCancelling(true);
      setError(null);
      const updated = await orderService.cancelOrder(order.id);
      setOrder(updated);
    } catch (err) {
      setError(
        err.message || "Order cancellation failed. Contact pharmacist support.",
      );
    } finally {
      setCancelling(false);
    }
  };

  if (loadingUser || loading) {
    return <Loader message="Locating clinical invoice records..." fullPage />;
  }

  if (error || !order) {
    return (
      <div className="container py-5 text-start">
        <Link
          to="/orders"
          className="btn btn-premium-outline mb-4 small d-inline-flex align-items-center gap-1.5"
        >
          <ArrowLeft size={14} />
          <span>Back to My Orders</span>
        </Link>
        <ErrorMessage message={error || "Order record not found"} />
      </div>
    );
  }

  const getStatusBadge = () => {
    switch (order.status) {
      case "PAID":
      case "DELIVERED":
        return (
          <span
            className="badge rounded-pill bg-success-subtle text-success border border-success d-inline-flex align-items-center gap-1 px-3 py-1.5 font-mono text-uppercase"
            style={{ fontSize: "0.75rem", color: "#1e6b1e !important" }}
          >
            <CheckCircle2 size={13} /> Completed ({order.status})
          </span>
        );
      case "SHIPPED":
        return (
          <span
            className="badge rounded-pill bg-info-subtle text-info border border-info d-inline-flex align-items-center gap-1 px-3 py-1.5 font-mono text-uppercase"
            style={{ fontSize: "0.75rem", color: "#1a5fa6 !important" }}
          >
            <Clock size={13} /> Active Dispatch
          </span>
        );
      case "CANCELLED":
        return (
          <span
            className="badge rounded-pill bg-danger-subtle text-danger border border-danger d-inline-flex align-items-center gap-1 px-3 py-1.5 font-mono text-uppercase"
            style={{ fontSize: "0.75rem", color: "#bd1c1c !important" }}
          >
            <Ban size={13} /> Cancelled
          </span>
        );
      default:
        return (
          <span
            className="badge rounded-pill bg-warning-subtle text-warning border border-warning d-inline-flex align-items-center gap-1 px-3 py-1.5 font-mono text-uppercase"
            style={{ fontSize: "0.75rem", color: "#b37400 !important" }}
          >
            <Clock size={13} /> Reviewing ({order.status})
          </span>
        );
    }
  };

  const formattedDate = new Date(order.created_at).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className="container py-5 fade-in-up text-start"
      id="order-detail-page-root"
    >
      {/* Back link */}
      <div className="mb-3">
        <Link
          to="/orders"
          className="text-secondary text-decoration-none hover-text-success small d-inline-flex align-items-center gap-1.5 font-mono"
        >
          <ArrowLeft size={13} />
          <span>My Historical Orders</span>
        </Link>
      </div>

      {/* Invoice Banner */}
      <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white mb-4">
        <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 border-bottom pb-4 mb-4">
          <div>
            <span
              className="text-uppercase text-muted font-mono small d-block mb-1"
              style={{ letterSpacing: "0.05em" }}
            >
              Invoice Log
            </span>
            <h1 className="h3 fw-bold text-dark display-font mb-2">
              {order.order_number}
            </h1>
            <p className="text-muted small mb-0 font-mono">
              Placed on {formattedDate}
            </p>
          </div>
          <div>{getStatusBadge()}</div>
        </div>

        <div className="row g-4">
          {/* Shipping details */}
          <div className="col-12 col-md-6">
            <h3
              className="h6 text-muted font-mono text-uppercase mb-2.5"
              style={{ letterSpacing: "0.05em" }}
            >
              Delivery Destination
            </h3>
            <div className="text-dark small lh-base border p-3 rounded-3 bg-light">
              <h5 className="fw-semibold text-dark mb-1.5 small display-font">
                {order.shipping_address.full_name}
              </h5>
              <div>{order.shipping_address.address_line1}</div>
              {order.shipping_address.address_line2 && (
                <div>{order.shipping_address.address_line2}</div>
              )}
              <div>
                {order.shipping_address.city}, {order.shipping_address.state} —{" "}
                {order.shipping_address.postal_code}
              </div>
              <div
                className="mt-1.5 font-mono text-muted"
                style={{ fontSize: "0.78rem" }}
              >
                Recipient Phone: {order.shipping_address.phone}
              </div>
            </div>
          </div>

          {/* Payment breakdown */}
          <div className="col-12 col-md-6">
            <h3
              className="h6 text-muted font-mono text-uppercase mb-2.5"
              style={{ letterSpacing: "0.05em" }}
            >
              Payment Summary
            </h3>
            <div className="text-dark small border p-3 rounded-3 bg-light">
              <div className="d-flex justify-content-between align-items-center mb-1.5">
                <span className="text-secondary">Subtotal:</span>
                <span className="font-mono text-dark fw-medium">
                  ${order.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-1.5">
                <span className="text-secondary">
                  Clinical Delivery Logistics:
                </span>
                <span className="font-mono text-dark fw-medium">
                  {order.shipping_charge === 0
                    ? "FREE"
                    : `$${order.shipping_charge.toFixed(2)}`}
                </span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-secondary">Sales Tax (12%):</span>
                <span className="font-mono text-dark fw-medium">
                  ${order.tax.toFixed(2)}
                </span>
              </div>
              <hr className="my-2 text-muted" />
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold text-dark">Grand Paid Total:</span>
                <span className="fw-bold font-mono text-dark display-font h5 mb-0">
                  ${order.grand_total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Prescription Verification Status if Rx required */}
        {order.prescription_uploaded && (
          <div className="alert alert-info border-0 p-3.5 mt-4 rounded-3 d-flex gap-2.5 mb-0">
            <FileText size={18} className="text-info mt-0.5" />
            <div className="small">
              <strong>Pharmacist Audit Status:</strong> A physician prescription
              has been uploaded and linked to this invoice. A registered
              pharmacist will complete structural validation before logistics
              dispatch.
            </div>
          </div>
        )}
      </div>

      {/* Items List Card */}
      <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
        <h3 className="h5 fw-bold text-dark display-font mb-4 border-bottom pb-2">
          Invoice Products
        </h3>

        <div className="table-responsive">
          <table className="table align-middle border-0 mb-0">
            <thead>
              <tr
                className="font-mono text-uppercase small text-muted"
                style={{ letterSpacing: "0.04em" }}
              >
                <th
                  className="border-0 bg-transparent ps-0"
                  style={{ fontSize: "0.7rem" }}
                >
                  Clinical Formula Name
                </th>
                <th
                  className="border-0 bg-transparent text-center"
                  style={{ width: "120px", fontSize: "0.7rem" }}
                >
                  Quantity
                </th>
                <th
                  className="border-0 bg-transparent text-end"
                  style={{ width: "120px", fontSize: "0.7rem" }}
                >
                  Unit Price
                </th>
                <th
                  className="border-0 bg-transparent text-end pe-0"
                  style={{ width: "120px", fontSize: "0.7rem" }}
                >
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.id}>
                  <td className="border-bottom py-3 ps-0 text-dark font-medium display-font">
                    <Link
                      to={`/product/${item.product_slug}`}
                      className="text-dark text-decoration-none hover-text-success"
                    >
                      {item.product_name}
                    </Link>
                  </td>
                  <td className="border-bottom py-3 text-center font-mono text-dark fw-semibold">
                    {item.quantity}
                  </td>
                  <td className="border-bottom py-3 text-end font-mono text-dark">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="border-bottom py-3 text-end font-mono text-dark fw-bold pe-0">
                    ${item.item_total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cancellation Actions */}
      {order.status === "PENDING" && (
        <div className="text-end">
          <Button
            variant="danger"
            onClick={handleCancelOrder}
            loading={cancelling}
            loadingText="Canceling Prescription order spot..."
            className="px-4 py-2.5 small"
          >
            <Ban size={15} />
            <span>Cancel Active Order</span>
          </Button>
          <div
            className="text-muted small mt-2 font-mono"
            style={{ fontSize: "0.72rem" }}
          >
            *Orders can only be canceled while their pharmacist status is
            strictly in PENDING state.
          </div>
        </div>
      )}
    </div>
  );
};
