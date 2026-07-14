/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "./Button";

export const AddToCartButton = ({
  onClick,
  loading,
  outOfStock,
  className = "w-100 py-3",
}) => {
  const handleAction = async (e) => {
    e.preventDefault();
    if (!outOfStock && !loading) {
      await onClick();
    }
  };

  return (
    <Button
      variant="premium"
      onClick={handleAction}
      loading={loading}
      loadingText="Adding to apothecary bag..."
      disabled={outOfStock}
      className={className}
      id="add-to-cart-button"
    >
      <ShoppingCart size={18} />
      <span>{outOfStock ? "Unavailable (Out of Stock)" : "Add to Cart"}</span>
    </Button>
  );
};
