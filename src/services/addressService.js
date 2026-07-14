/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { apiRequest } from "./api";

export const addressService = {
  async getAddresses() {
    return apiRequest("/users/me/addresses", {
      method: "GET",
    });
  },

  async createAddress(address) {
    return apiRequest("/users/me/addresses", {
      method: "POST",
      body: JSON.stringify(address),
    });
  },

  async updateAddress(id, updates) {
    return apiRequest(`/users/me/addresses/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
  },

  async deleteAddress(id) {
    return apiRequest(`/users/me/addresses/${id}`, {
      method: "DELETE",
    });
  },
};
