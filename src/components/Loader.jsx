/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export const Loader = ({
  fullPage = false,
  message = "Loading premium wellness products...",
}) => {
  if (fullPage) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center vh-100 bg-white fade-in-up"
        id="loader-fullpage"
      >
        <div
          className="spinner-border text-success mb-3"
          role="status"
          style={{
            width: "3rem",
            height: "3rem",
            color: "var(--primary-color)",
          }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <p
          className="text-muted display-font"
          style={{ fontSize: "1.1rem", letterSpacing: "0.02em" }}
        >
          {message}
        </p>
      </div>
    );
  }

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center p-5 text-center"
      id="loader-inline"
    >
      <div
        className="spinner-border text-success mb-2"
        role="status"
        style={{ color: "var(--primary-color)" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="text-muted small">{message}</p>
    </div>
  );
};
