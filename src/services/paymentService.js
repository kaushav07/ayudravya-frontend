/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { apiRequest } from "./api";

export const paymentService = {
  async createPayment(orderId) {
    return apiRequest("/payments/create", {
      method: "POST",
      body: JSON.stringify({ order_id: orderId }),
    });
  },

  async verifyPayment(orderId, paymentId, signature) {
    return apiRequest("/payments/verify", {
      method: "POST",
      body: JSON.stringify({
        order_id: orderId,
        payment_id: paymentId,
        signature,
      }),
    });
  },
};
