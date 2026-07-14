/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, MapPin, ClipboardList, LogOut, ShieldAlert } from "lucide-react";
import { useApp } from "../store/AppContext";
import { Loader } from "../components/Loader";

export const Account = () => {
  const { user, loadingUser, logout } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loadingUser && !user) {
      navigate("/login?redirect=account");
    }
  }, [user, loadingUser, navigate]);

  if (loadingUser) {
    return <Loader message="Accessing patient databases..." fullPage />;
  }

  if (!user) {
    return null; // Redirect handles it
  }

  const handleLogoutClick = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div
      className="container py-5 fade-in-up text-start"
      id="account-portal-page"
    >
      <div className="border-bottom pb-3 mb-5">
        <h1 className="h2 fw-bold text-dark display-font d-flex align-items-center gap-2.5 mb-1">
          <User size={24} className="text-success" />
          <span>Patient Account Portal</span>
        </h1>
        <p className="text-muted small mb-0">
          View profile parameters, address records, and past prescription
          invoices.
        </p>
      </div>

      <div className="row g-4">
        {/* Profile Card */}
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 text-center bg-white">
            <div
              className="rounded-circle bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center mx-auto mb-3"
              style={{
                width: "64px",
                height: "64px",
                color: "var(--primary-color) !important",
              }}
            >
              <User size={32} />
            </div>
            <h4
              className="fw-bold text-dark display-font mb-1"
              style={{ fontSize: "1.15rem" }}
            >
              {user.full_name}
            </h4>
            <p className="text-muted font-mono mb-4 small">{user.email}</p>

            <div className="border-top pt-3 d-flex flex-column gap-2 text-start small text-secondary">
              <div>
                <strong>System ID:</strong>{" "}
                <span className="font-mono">{user.id}</span>
              </div>
              {user.phone && (
                <div>
                  <strong>Mobile Phone:</strong>{" "}
                  <span className="font-mono">{user.phone}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleLogoutClick}
              className="btn btn-sm btn-outline-danger w-100 mt-4 d-inline-flex align-items-center justify-content-center gap-2 py-2 rounded-3"
            >
              <LogOut size={14} />
              <span>Sign Out of Portal</span>
            </button>
          </div>
        </div>

        {/* Action Panel links */}
        <div className="col-12 col-md-8">
          <div className="row g-3">
            {/* Addresses link card */}
            <div className="col-12 col-sm-6">
              <Link
                to="/account/addresses"
                className="card border border-light-subtle rounded-4 p-4 text-decoration-none bg-white hover-shadow transition d-flex flex-column h-100 text-start"
              >
                <MapPin
                  className="text-success mb-3"
                  size={28}
                  style={{ color: "var(--primary-color)" }}
                />
                <h3 className="h5 fw-bold text-dark display-font mb-2">
                  Delivery Addresses
                </h3>
                <p className="text-muted small mb-0 lh-base flex-grow-1">
                  Manage your verified shipping addresses, register
                  destinations, and select your default delivery point.
                </p>
                <div className="text-success small fw-semibold mt-4 d-flex align-items-center gap-1">
                  <span>Manage Address Records</span>
                  <span>&rarr;</span>
                </div>
              </Link>
            </div>

            {/* Orders link card */}
            <div className="col-12 col-sm-6">
              <Link
                to="/orders"
                className="card border border-light-subtle rounded-4 p-4 text-decoration-none bg-white hover-shadow transition d-flex flex-column h-100 text-start"
              >
                <ClipboardList
                  className="text-success mb-3"
                  size={28}
                  style={{ color: "var(--primary-color)" }}
                />
                <h3 className="h5 fw-bold text-dark display-font mb-2">
                  Prescription Invoices
                </h3>
                <p className="text-muted small mb-0 lh-base flex-grow-1">
                  Review historical product shipments, track active transits,
                  and download doctor prescription archives.
                </p>
                <div className="text-success small fw-semibold mt-4 d-flex align-items-center gap-1">
                  <span>Track Active Orders</span>
                  <span>&rarr;</span>
                </div>
              </Link>
            </div>
          </div>

          <div className="card border-0 bg-light p-4 rounded-4 mt-4">
            <div className="d-flex gap-3">
              <div className="text-success">
                <ShieldAlert
                  size={24}
                  style={{ color: "var(--primary-color)" }}
                />
              </div>
              <div>
                <h4 className="h6 fw-bold text-dark display-font mb-1.5">
                  Compliance & Safety Portal
                </h4>
                <p className="text-muted small mb-0 lh-lg">
                  Every order on Ayudravya conforms strictly to regulatory
                  patient standards. Your addresses are safely saved using
                  clinical-grade encryption protocols and will not be shared.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
