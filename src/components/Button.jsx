/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export const Button = ({
  children,
  variant = "premium",
  loading = false,
  loadingText = "Processing...",
  className = "",
  disabled,
  ...props
}) => {
  let btnClass = "btn-premium";
  if (variant === "outline") {
    btnClass = "btn-premium-outline";
  } else if (variant === "accent") {
    btnClass = "btn-premium-accent";
  } else if (variant === "danger") {
    btnClass = "btn btn-outline-danger";
  }

  return (
    <button
      className={`btn ${btnClass} d-inline-flex align-items-center justify-content-center gap-2 ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
