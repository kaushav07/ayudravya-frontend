/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { MapPin, Phone, Trash2, Edit2, Check } from "lucide-react";

export const AddressCard = ({
  address,
  selected = false,
  onSelect,
  onEdit,
  onDelete,
  showActions = true,
}) => {
  return (
    <div
      className={`card rounded-4 border-2 transition h-100 ${
        selected ? "border-success" : "border-light-subtle"
      }`}
      style={{
        cursor: onSelect ? "pointer" : "default",
        boxShadow: selected ? "0 8px 24px rgba(13, 92, 58, 0.05)" : "none",
        backgroundColor: "#ffffff",
        transition: "all 0.2s ease-in-out",
      }}
      onClick={onSelect}
      id={`address-card-${address.id}`}
    >
      <div className="card-body p-4 d-flex flex-column h-100 position-relative">
        {selected && (
          <span
            className="position-absolute top-3 end-3 rounded-circle text-white d-flex align-items-center justify-content-center"
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "var(--primary-color)",
            }}
          >
            <Check size={12} strokeWidth={3} />
          </span>
        )}

        <div className="d-flex align-items-center gap-2 mb-3">
          <MapPin
            size={18}
            className="text-success"
            style={{ color: "var(--primary-color)" }}
          />
          <h5 className="h6 fw-semibold text-dark mb-0 display-font">
            {address.full_name}
          </h5>
          {address.is_default && (
            <span
              className="badge rounded-pill bg-light text-success font-mono border text-uppercase small px-2 py-0.5"
              style={{ fontSize: "0.65rem" }}
            >
              Default
            </span>
          )}
        </div>

        {/* Address text blocks */}
        <div className="text-secondary small d-flex flex-column gap-1 flex-grow-1 mb-4 lh-base">
          <div>{address.address_line1}</div>
          {address.address_line2 && <div>{address.address_line2}</div>}
          <div>
            {address.city}, {address.state} — {address.postal_code}
          </div>
          <div>{address.country}</div>
          <div className="d-flex align-items-center gap-1.5 mt-2 text-dark">
            <Phone size={13} className="text-muted" />
            <span className="font-mono">{address.phone}</span>
          </div>
        </div>

        {showActions && (onEdit || onDelete) && (
          <div
            className="border-top pt-3 d-flex gap-2 justify-content-end mt-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {onEdit && (
              <button
                type="button"
                onClick={onEdit}
                className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-1 px-3 py-1.5 rounded-3"
                style={{ fontSize: "0.8rem" }}
              >
                <Edit2 size={13} />
                <span>Edit</span>
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                onClick={onDelete}
                className="btn btn-sm btn-outline-danger d-inline-flex align-items-center gap-1 px-3 py-1.5 rounded-3"
                style={{ fontSize: "0.8rem" }}
              >
                <Trash2 size={13} />
                <span>Delete</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
