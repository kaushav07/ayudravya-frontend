/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export const StockBadge = ({ status, qty }) => {
  let bg = "#eaf5ea";
  let color = "#1e6b1e";
  let text = "In Stock";

  if (status === "Out of Stock" || qty === 0) {
    bg = "#fbebeb";
    color = "#bd1c1c";
    text = "Out of Stock";
  } else if (status === "Low Stock" || (qty && qty <= 20)) {
    bg = "#fff9eb";
    color = "#b37400";
    text = qty ? `Low Stock (${qty} Left)` : "Low Stock";
  } else if (qty) {
    text = `In Stock (${qty})`;
  }

  return (
    <span
      className="d-inline-flex align-items-center px-2.5 py-1 rounded-pill font-mono"
      style={{
        backgroundColor: bg,
        color: color,
        fontSize: "0.75rem",
        fontWeight: 600,
        letterSpacing: "0.02em",
        border: `1px solid rgba(${status === "Out of Stock" ? "189,28,28" : status === "Low Stock" ? "179,116,0" : "30,107,30"}, 0.15)`,
      }}
      id="stock-badge"
    >
      <span
        className="d-inline-block rounded-circle me-1.5"
        style={{
          width: "6px",
          height: "6px",
          backgroundColor: color,
        }}
      />

      {text}
    </span>
  );
};
