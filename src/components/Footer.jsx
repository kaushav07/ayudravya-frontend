/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ShieldCheck, Truck, Award, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-white border-top mt-auto py-5" id="main-footer">
      {/* Trust Badges */}
      <div className="container border-bottom pb-5 mb-5">
        <div className="row g-4 text-center justify-content-center">
          <div className="col-6 col-md-3">
            <div className="d-flex flex-column align-items-center">
              <div
                className="p-3 bg-light rounded-0 text-success mb-3"
                style={{ color: "var(--primary-color) !important" }}
              >
                <Award size={28} />
              </div>
              <h6 className="fw-semibold text-dark mb-1">Genuine Products</h6>
              <p className="text-muted small mb-0">
                100% sourced from certified pharmaceutical labs.
              </p>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="d-flex flex-column align-items-center">
              <div
                className="p-3 bg-light rounded-0 text-success mb-3"
                style={{ color: "var(--primary-color) !important" }}
              >
                <ShieldCheck size={28} />
              </div>
              <h6 className="fw-semibold text-dark mb-1">Secure Checkout</h6>
              <p className="text-muted small mb-0">
                SSL-encrypted payments and 2D validation secure protection.
              </p>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="d-flex flex-column align-items-center">
              <div
                className="p-3 bg-light rounded-0 text-success mb-3"
                style={{ color: "var(--primary-color) !important" }}
              >
                <Truck size={28} />
              </div>
              <h6 className="fw-semibold text-dark mb-1">Fast Delivery</h6>
              <p className="text-muted small mb-0">
                Temperature-controlled express transit to your door.
              </p>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="d-flex flex-column align-items-center">
              <div
                className="p-3 bg-light rounded-0 text-success mb-3"
                style={{ color: "var(--primary-color) !important" }}
              >
                <HeartHandshake size={28} />
              </div>
              <h6 className="fw-semibold text-dark mb-1">
                Pharmacist Reviewed
              </h6>
              <p className="text-muted small mb-0">
                Prescriptions manually approved by registered pharmacists.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="container">
        <div className="row g-4 justify-content-between mb-4">
          <div className="col-12 col-md-5">
            <h5
              className="text-success mb-3 display-font"
              style={{ color: "var(--primary-color)" }}
            >
              Ayudravya
            </h5>
            <p className="text-muted small lh-lg" style={{ maxWidth: "380px" }}>
              A high-end apothecary crafted for clinical superiority. We focus
              on offering premium, clinically-researched formulations targeting
              everyday metabolic health, restorative sleep, and targeted men's
              wellness.
            </p>
          </div>

          <div className="col-6 col-md-3">
            <h6
              className="text-dark fw-bold mb-3 small text-uppercase"
              style={{ letterSpacing: "0.05em" }}
            >
              Shop Items
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li>
                <Link
                  to="/product/auradaily-multivitamin"
                  className="text-muted text-decoration-none hover-text-success"
                >
                  AuraDaily Multivitamins
                </Link>
              </li>
              <li>
                <Link
                  to="/product/somnusrest-sleep-support"
                  className="text-muted text-decoration-none hover-text-success"
                >
                  SomnusRest Sleep Gels
                </Link>
              </li>
              <li>
                <Link
                  to="/product/apex-hair-regrowth"
                  className="text-muted text-decoration-none hover-text-success"
                >
                  Apex Hair Regrowth
                </Link>
              </li>
              <li>
                <Link
                  to="/product/vigormax-testosterone-support"
                  className="text-muted text-decoration-none hover-text-success"
                >
                  VigorMax Test Support
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-muted text-decoration-none hover-text-success"
                >
                  Explore Full Collection
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-3">
            <h6
              className="text-dark fw-bold mb-3 small text-uppercase"
              style={{ letterSpacing: "0.05em" }}
            >
              Customer Portal
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li>
                <Link
                  to="/account"
                  className="text-muted text-decoration-none hover-text-success"
                >
                  My Profile Settings
                </Link>
              </li>
              <li>
                <Link
                  to="/orders"
                  className="text-muted text-decoration-none hover-text-success"
                >
                  Track Past Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-muted text-decoration-none hover-text-success"
                >
                  Active Shopping Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimers */}
        <div className="border-top pt-4 text-center">
          <p
            className="text-muted lh-lg"
            style={{
              fontSize: "0.75rem",
              maxWidth: "800px",
              margin: "0 auto 20px",
            }}
          >
            Disclaimer: The statements made regarding these products have not
            been evaluated by the Food and Drug Administration. These products
            are not intended to diagnose, treat, cure or prevent any disease.
            Always seek the advice of your physician or other qualified health
            provider with any questions you may have regarding a medical
            condition.
          </p>
          <p className="text-muted small mb-0">
            &copy; {new Date().getFullYear()} Ayudravya Apothecary. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
