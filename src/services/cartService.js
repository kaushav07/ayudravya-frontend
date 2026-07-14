/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { apiRequest } from "./api";

export const cartService = {
  async getCart() {
    return apiRequest("/cart", {
      method: "GET",
    });
  },

  async addToCart(productId, quantity) {
    return apiRequest("/cart/items", {
      method: "POST",
      body: JSON.stringify({ product_id: productId, quantity }),
    });
  },

  async updateCartItem(itemId, quantity) {
    return apiRequest(`/cart/items/${itemId}`, {
      method: "PATCH",
      body: JSON.stringify({ quantity }),
    });
  },

  async removeCartItem(itemId) {
    return apiRequest(`/cart/items/${itemId}`, {
      method: "DELETE",
    });
  },

  async clearCart() {
    return apiRequest("/cart", {
      method: "DELETE",
    });
  },
};
