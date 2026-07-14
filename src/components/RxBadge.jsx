/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { FileText, CheckCircle } from "lucide-react";

export const RxBadge = ({ required, size = "md" }) => {
  const padding = size === "sm" ? "py-1 px-2" : "py-1.5 px-2.5";
  const fontSize = size === "sm" ? "0.7rem" : "0.75rem";

  if (required) {
    return (
      <span
        className={`badge-rx d-inline-flex align-items-center gap-1.5 ${padding}`}
        style={{ fontSize, letterSpacing: "0.04em" }}
        id="rx-badge-required"
      >
        <FileText size={size === "sm" ? 12 : 14} />
        Prescription Required
      </span>
    );
  }

  return (
    <span
      className={`badge-otc d-inline-flex align-items-center gap-1.5 ${padding}`}
      style={{ fontSize, letterSpacing: "0.04em" }}
      id="rx-badge-otc"
    >
      <CheckCircle size={size === "sm" ? 12 : 14} />
      OTC Supplement
    </span>
  );
};
