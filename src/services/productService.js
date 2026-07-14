/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { apiRequest } from "./api";

export const productService = {
  async getProducts(page = 1, limit = 20) {
    return apiRequest(`/products?page=${page}&limit=${limit}`, {
      method: "GET",
    });
  },

  async getProductBySlug(slug) {
    return apiRequest(`/products/${slug}`, {
      method: "GET",
    });
  },

  async getRelatedProducts(slug) {
    return apiRequest(`/products/${slug}/related`, {
      method: "GET",
    });
  },

  async getCategories() {
    return apiRequest("/categories", {
      method: "GET",
    });
  },

  async getCategoryBySlug(slug) {
    return apiRequest(`/categories/${slug}`, {
      method: "GET",
    });
  },

  async getBanners() {
    return apiRequest("/banners", {
      method: "GET",
    });
  },
};
