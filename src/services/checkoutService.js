/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { apiRequest } from "./api";

export const checkoutService = {
  async validateCheckout(addressId) {
    return apiRequest("/checkout/validate", {
      method: "POST",
      body: JSON.stringify({ address_id: addressId }),
    });
  },

  async createOrder(addressId, prescriptionId) {
    return apiRequest("/checkout/create-order", {
      method: "POST",
      body: JSON.stringify({
        address_id: addressId,
        prescription_id: prescriptionId,
      }),
    });
  },
};
