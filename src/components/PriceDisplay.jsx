/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export const PriceDisplay = ({ price, compareAtPrice, size = "md" }) => {
  const isLarge = size === "lg";
  const isSmall = size === "sm";
  const priceStyle = {
    fontSize: isLarge ? "2rem" : isSmall ? "1.05rem" : "1.35rem",
    fontWeight: 700,
    color: "var(--text-dark)",
  };

  const originalPriceStyle = {
    fontSize: isLarge ? "1.15rem" : isSmall ? "0.85rem" : "0.95rem",
    textDecoration: "line-through",
    color: "var(--text-muted)",
    marginLeft: "8px",
  };

  const discountStyle = {
    fontSize: "0.75rem",
    backgroundColor: "#fff3cd",
    color: "#856404",
    padding: "3px 8px",
    borderRadius: "4px",
    fontWeight: 600,
    marginLeft: "8px",
  };

  const discountPercent = compareAtPrice
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

  return (
    <div className="d-flex align-items-center flex-wrap" id="price-display">
      <span style={priceStyle} className="display-font">
        ${price.toFixed(2)}
      </span>
      {compareAtPrice && compareAtPrice > price && (
        <>
          <span style={originalPriceStyle}>${compareAtPrice.toFixed(2)}</span>
          <span style={discountStyle} className="font-mono">
            Save {discountPercent}%
          </span>
        </>
      )}
    </div>
  );
};
