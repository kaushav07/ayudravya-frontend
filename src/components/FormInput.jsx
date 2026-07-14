/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export const FormInput = ({ label, error, className = "", id, ...props }) => {
  const inputId = id || `input_${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="mb-3 text-start" id={`form-group-${inputId}`}>
      <label
        htmlFor={inputId}
        className="form-label text-dark fw-medium small mb-1.5"
        style={{ letterSpacing: "0.01em" }}
      >
        {label}
      </label>
      <input
        id={inputId}
        className={`form-control py-2.5 px-3 rounded-2 ${error ? "is-invalid" : ""} ${className}`}
        {...props}
      />

      {error && (
        <div className="invalid-feedback small mt-1 fw-medium">{error}</div>
      )}
    </div>
  );
};
