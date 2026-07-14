/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../store/AppContext";
import { CartItem } from "../components/CartItem";
import { CartSummary } from "../components/CartSummary";
import { EmptyState } from "../components/EmptyState";
import { Loader } from "../components/Loader";
import { Button } from "../components/Button";

export const Cart = () => {
  const { cart, loadingCart, updateCartQty, removeCartItem, clearCart } =
    useApp();

  const handleQtyChange = async (itemId, newQty) => {
    try {
      await updateCartQty(itemId, newQty);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeCartItem(itemId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loadingCart && !cart) {
    return <Loader message="Analyzing your apothecary bag..." fullPage />;
  }

  const items = cart?.items || [];

  return (
    <div className="container py-5 fade-in-up text-start" id="cart-page-root">
      {/* Title Header */}
      <div className="border-bottom pb-3 mb-4">
        <h1 className="h2 fw-bold text-dark display-font d-flex align-items-center gap-2 mb-1">
          <ShoppingBag size={24} className="text-success" />
          <span>Shopping Bag</span>
        </h1>
        <p className="text-muted small mb-0">
          Review your chosen formulations before proceeding to checkout.
        </p>
      </div>

      {items.length === 0 ? (
        <EmptyState
          title="Your apothecary bag is empty"
          description="You have not added any clinical formulations to your selection. Return to the catalogue to find products that fit your metabolic and circadian rhythms."
          actionText="Explore Formulations"
          actionLink="/products"
        />
      ) : (
        <div className="row g-4">
          {/* Cart Items List */}
          <div className="col-12 col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-3">
              <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
                <span className="fw-semibold text-dark display-font">
                  Formulations Selection ({items.length})
                </span>
                <Button
                  variant="outline"
                  className="btn-sm border-0 text-danger hover-bg-danger-subtle font-mono small"
                  onClick={clearCart}
                >
                  Clear Bag
                </Button>
              </div>

              <div className="d-flex flex-column">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQtyChange={(qty) => handleQtyChange(item.id, qty)}
                    onRemove={() => handleRemoveItem(item.id)}
                    disabled={loadingCart}
                  />
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="mt-4">
                <Link
                  to="/products"
                  className="text-success text-decoration-none hover-text-success-dark small fw-medium d-inline-flex align-items-center gap-1.5 font-mono"
                >
                  <ArrowLeft size={14} />
                  <span>Add More Formulas</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="col-12 col-lg-4">
            <CartSummary cart={cart} />
          </div>
        </div>
      )}
    </div>
  );
};
