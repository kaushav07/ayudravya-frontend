/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { apiRequest } from "./api";

export const orderService = {
  async getOrders() {
    return apiRequest("/orders", {
      method: "GET",
    });
  },

  async getOrderById(id) {
    return apiRequest(`/orders/${id}`, {
      method: "GET",
    });
  },

  async cancelOrder(id) {
    return apiRequest(`/orders/${id}/cancel`, {
      method: "POST",
    });
  },
};
