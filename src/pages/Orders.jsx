/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ClipboardList, ArrowLeft } from "lucide-react";
import { orderService } from "../services/orderService";
import { OrderCard } from "../components/OrderCard";
import { useApp } from "../store/AppContext";
import { Loader } from "../components/Loader";
import { ErrorMessage } from "../components/ErrorMessage";
import { EmptyState } from "../components/EmptyState";

export const Orders = () => {
  const { user, loadingUser } = useApp();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loadingUser && !user) {
      navigate("/login?redirect=orders");
    }
  }, [user, loadingUser, navigate]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const list = await orderService.getOrders();
      setOrders(list);
    } catch (err) {
      setError(err.message || "Failed to load historical invoice records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user]);

  if (loadingUser) {
    return <Loader message="Accessing secure sessions..." fullPage />;
  }

  return (
    <div className="container py-5 fade-in-up text-start" id="orders-page-root">
      {/* Back Link */}
      <div className="mb-3">
        <Link
          to="/account"
          className="text-secondary text-decoration-none hover-text-success small d-inline-flex align-items-center gap-1.5 font-mono"
        >
          <ArrowLeft size={13} />
          <span>My Profile Portal</span>
        </Link>
      </div>

      <div className="border-bottom pb-3 mb-4">
        <h1 className="h2 fw-bold text-dark display-font d-flex align-items-center gap-2">
          <ClipboardList size={22} className="text-success" />
          <span>Prescription Order History</span>
        </h1>
        <p className="text-muted small mb-0 font-mono">
          Track active laboratory shipments, approvals, and secure digital
          invoices.
        </p>
      </div>

      {error && (
        <div className="mb-4">
          <ErrorMessage message={error} />
        </div>
      )}

      {loading ? (
        <Loader message="Decrypting clinical invoice logs..." />
      ) : orders.length === 0 ? (
        <EmptyState
          title="No historical orders"
          description="Your medical dispatch log is empty. You haven't placed any wellness or sleep-support orders on this profile yet."
          actionText="Explore Clinician Catalog"
          actionLink="/products"
        />
      ) : (
        <div className="d-flex flex-column gap-1 mt-2">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};
