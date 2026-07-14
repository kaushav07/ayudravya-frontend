/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { apiRequest } from "./api";

export const prescriptionService = {
  async uploadPrescription(files) {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    return apiRequest("/prescriptions", {
      method: "POST",
      body: formData,
    });
  },

  async getPrescriptions() {
    return apiRequest("/prescriptions", {
      method: "GET",
    });
  },

  async getPrescriptionById(id) {
    return apiRequest(`/prescriptions/${id}`, {
      method: "GET",
    });
  },
};
