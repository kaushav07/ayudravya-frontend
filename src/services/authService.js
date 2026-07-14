/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { apiRequest } from "./api";

export const authService = {
  async register(data) {
    return apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async login(data) {
    return apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async getMe() {
    return apiRequest("/auth/me", {
      method: "GET",
    });
  },

  async logout() {
    return apiRequest("/auth/logout", {
      method: "POST",
    });
  },

  async forgotPassword(email) {
    return apiRequest("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  async resetPassword(data) {
    return apiRequest("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
