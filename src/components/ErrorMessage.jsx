/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { AlertCircle } from "lucide-react";

export const ErrorMessage = ({
  title = "Something went wrong",
  message,
  onRetry,
}) => {
  return (
    <div
      className="card border-danger bg-light-subtle p-4 rounded-3 text-center my-4 max-w-lg mx-auto"
      id="error-component"
      style={{ maxWidth: "480px" }}
    >
      <div className="card-body">
        <AlertCircle className="text-danger mb-3" size={40} />
        <h5 className="card-title text-dark fw-semibold mb-2">{title}</h5>
        <p
          className="card-text text-secondary mb-4"
          style={{ fontSize: "0.95rem" }}
        >
          {message}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn btn-premium d-inline-flex align-items-center justify-content-center gap-2"
          >
            Retry Request
          </button>
        )}
      </div>
    </div>
  );
};
