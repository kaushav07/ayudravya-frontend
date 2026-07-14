/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Plus, Minus } from "lucide-react";

export const QuantitySelector = ({
  quantity,
  maxQuantity = 10,
  onChange,
  disabled = false,
}) => {
  const handleDecrement = () => {
    if (quantity > 1) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      onChange(quantity + 1);
    }
  };

  return (
    <div
      className="d-inline-flex align-items-center border rounded-pill bg-white p-1"
      id="quantity-selector"
    >
      <button
        type="button"
        onClick={handleDecrement}
        className="btn btn-sm btn-light rounded-circle p-1.5 d-flex align-items-center justify-content-center border-0"
        disabled={disabled || quantity <= 1}
        style={{ width: "28px", height: "28px" }}
        aria-label="Decrease quantity"
      >
        <Minus size={14} className="text-dark" />
      </button>

      <span
        className="px-3 fw-semibold font-mono text-center text-dark"
        style={{ minWidth: "40px", fontSize: "0.95rem" }}
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        className="btn btn-sm btn-light rounded-circle p-1.5 d-flex align-items-center justify-content-center border-0"
        disabled={disabled || quantity >= maxQuantity}
        style={{ width: "28px", height: "28px" }}
        aria-label="Increase quantity"
      >
        <Plus size={14} className="text-dark" />
      </button>
    </div>
  );
};
