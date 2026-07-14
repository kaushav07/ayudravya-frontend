/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { PackageOpen } from "lucide-react";
import { Link } from "react-router-dom";

export const EmptyState = ({
  icon = <PackageOpen size={48} className="text-muted mb-3" />,
  title,
  description,
  actionText,
  actionLink,
}) => {
  return (
    <div
      className="text-center p-5 border rounded-4 bg-white shadow-sm my-4"
      id="empty-state"
    >
      <div className="mb-2 d-inline-flex justify-content-center align-items-center">
        {icon}
      </div>
      <h4 className="fw-semibold text-dark display-font mb-2">{title}</h4>
      <p
        className="text-muted mx-auto mb-4"
        style={{ maxWidth: "400px", fontSize: "0.95rem" }}
      >
        {description}
      </p>
      {actionText && actionLink && (
        <Link to={actionLink} className="btn btn-premium px-4 py-2">
          {actionText}
        </Link>
      )}
    </div>
  );
};
