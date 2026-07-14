/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Receipt,
  ChevronRight,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";

export const OrderCard = ({ order }) => {
  const getStatusStyle = () => {
    switch (order.status) {
      case "PAID":
      case "DELIVERED":
        return {
          bg: "#eaf5ea",
          color: "#1e6b1e",
          icon: <CheckCircle size={14} />,
        };
      case "SHIPPED":
        return { bg: "#e6f0fa", color: "#1a5fa6", icon: <Clock size={14} /> };
      case "CANCELLED":
        return {
          bg: "#fbebeb",
          color: "#bd1c1c",
          icon: <AlertTriangle size={14} />,
        };
      default:
        return { bg: "#fff9eb", color: "#b37400", icon: <Clock size={14} /> };
    }
  };

  const status = getStatusStyle();
  const dateFormatted = new Date(order.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className="card rounded-4 border border-light-subtle bg-white shadow-sm hover-shadow transition p-4 mb-3"
      id={`order-card-${order.id}`}
    >
      <div className="card-body p-0">
        <div className="row g-3 align-items-center">
          {/* Order Identity & Date */}
          <div className="col-12 col-md-4">
            <span
              className="font-mono text-muted text-uppercase small"
              style={{ letterSpacing: "0.05em" }}
            >
              Order No.
            </span>
            <h4 className="h6 fw-bold text-dark display-font mb-1.5">
              {order.order_number}
            </h4>
            <div className="d-flex align-items-center gap-1.5 text-secondary small">
              <Calendar size={13} />
              <span>{dateFormatted}</span>
            </div>
          </div>

          {/* Status badge */}
          <div className="col-6 col-md-3">
            <span
              className="font-mono text-muted text-uppercase small d-block mb-1"
              style={{ letterSpacing: "0.05em" }}
            >
              Status
            </span>
            <span
              className="d-inline-flex align-items-center gap-1.5 px-3 py-1 rounded-pill small fw-medium"
              style={{
                backgroundColor: status.bg,
                color: status.color,
                fontSize: "0.78rem",
              }}
            >
              {status.icon}
              {order.status}
            </span>
          </div>

          {/* Total Amount */}
          <div className="col-6 col-md-3">
            <span
              className="font-mono text-muted text-uppercase small d-block mb-1"
              style={{ letterSpacing: "0.05em" }}
            >
              Total Paid
            </span>
            <div className="d-flex align-items-center gap-1.5 font-mono fw-bold text-dark h5 mb-0">
              <Receipt size={15} className="text-muted" />
              <span>${order.grand_total.toFixed(2)}</span>
            </div>
          </div>

          {/* Detail Trigger */}
          <div className="col-12 col-md-2 text-md-end mt-3 mt-md-0">
            <Link
              to={`/orders/${order.id}`}
              className="btn btn-outline-success btn-sm d-inline-flex align-items-center gap-1 px-3 py-2 rounded-3 border-light-subtle font-medium text-success"
              style={{
                fontSize: "0.82rem",
                borderColor: "var(--border-color)",
                color: "var(--primary-color) !important",
              }}
            >
              <span>View Invoice</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
