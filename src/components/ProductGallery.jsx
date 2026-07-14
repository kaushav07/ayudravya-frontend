/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";

export const ProductGallery = ({ images, productName }) => {
  const [activeImage, setActiveImage] = useState(
    images[0] || "https://picsum.photos/600/600",
  );

  return (
    <div className="d-flex flex-column gap-3" id="product-gallery">
      {/* Main Image Viewport */}
      <div
        className="border bg-white rounded-4 overflow-hidden position-relative shadow-sm"
        style={{ paddingBottom: "100%", width: "100%" }}
      >
        <img
          src={activeImage}
          alt={`${productName} primary`}
          className="position-absolute w-100 h-100 object-fit-cover"
          style={{ top: 0, left: 0 }}
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Thumbnail Selection Rows */}
      {images.length > 1 && (
        <div className="row g-2" id="gallery-thumbnails">
          {images.map((image, index) => {
            const isActive = activeImage === image;
            return (
              <div className="col-3" key={index}>
                <button
                  type="button"
                  className={`btn p-0 border rounded-3 overflow-hidden w-100 ratio ratio-1x1 transition ${
                    isActive
                      ? "border-success border-2 shadow-sm"
                      : "border-light hover-border-success"
                  }`}
                  onClick={() => setActiveImage(image)}
                  style={{
                    boxShadow: isActive
                      ? "0 0 0 3px rgba(13, 92, 58, 0.2)"
                      : "none",
                    transition: "all 0.2s ease",
                  }}
                  aria-label={`View image ${index + 1}`}
                >
                  <img
                    src={image}
                    alt={`${productName} thumbnail ${index + 1}`}
                    className="w-100 h-100 object-fit-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
