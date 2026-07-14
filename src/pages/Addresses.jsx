/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MapPin, Plus, ArrowLeft } from "lucide-react";
import { addressService } from "../services/addressService";
import { AddressCard } from "../components/AddressCard";
import { AddressForm } from "../components/AddressForm";
import { useApp } from "../store/AppContext";
import { Loader } from "../components/Loader";
import { ErrorMessage } from "../components/ErrorMessage";

export const Addresses = () => {
  const { user, loadingUser } = useApp();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Editing address state
  const [editingAddress, setEditingAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Authenticate user
  useEffect(() => {
    if (!loadingUser && !user) {
      navigate("/login?redirect=account/addresses");
    }
  }, [user, loadingUser, navigate]);

  const loadAddresses = async () => {
    try {
      setLoading(true);
      setError(null);
      const list = await addressService.getAddresses();
      setAddresses(list);
    } catch (err) {
      setError(err.message || "Failed to retrieve delivery records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadAddresses();
    }
  }, [user]);

  const handleCreateOrUpdate = async (addressData) => {
    try {
      setFormLoading(true);
      setError(null);
      if (editingAddress) {
        // Update
        const updated = await addressService.updateAddress(
          editingAddress.id,
          addressData,
        );
        setAddresses((prev) =>
          prev.map((a) => (a.id === updated.id ? updated : a)),
        );
      } else {
        // Create
        const created = await addressService.createAddress(addressData);
        setAddresses((prev) => [...prev, created]);
      }
      setShowForm(false);
      setEditingAddress(null);
    } catch (err) {
      setError(err.message || "Failed to register delivery details.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm("Are you sure you want to delete this delivery address?")
    )
      return;
    try {
      setLoading(true);
      await addressService.deleteAddress(id);
      setAddresses((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete address.");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (address) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingAddress(null);
  };

  if (loadingUser) {
    return <Loader message="Analyzing user session..." fullPage />;
  }

  return (
    <div
      className="container py-5 fade-in-up text-start"
      id="addresses-page-root"
    >
      {/* Back to Account Link */}
      <div className="mb-3">
        <Link
          to="/account"
          className="text-secondary text-decoration-none hover-text-success small d-inline-flex align-items-center gap-1.5 font-mono"
        >
          <ArrowLeft size={13} />
          <span>My Profile Portal</span>
        </Link>
      </div>

      <div className="border-bottom pb-3 mb-4 d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div>
          <h1 className="h2 fw-bold text-dark display-font mb-1 d-flex align-items-center gap-2">
            <MapPin size={22} className="text-success" />
            <span>Delivery Destination Records</span>
          </h1>
          <p className="text-muted small mb-0">
            Register and manage shipping addresses for seamless pharmaceutical
            dispatches.
          </p>
        </div>

        {!showForm && (
          <button
            onClick={() => {
              setShowForm(true);
              setEditingAddress(null);
            }}
            className="btn btn-premium d-inline-flex align-items-center gap-2 px-3 py-2 small"
          >
            <Plus size={16} />
            <span>Add Address</span>
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4">
          <ErrorMessage message={error} />
        </div>
      )}

      {showForm ? (
        <div className="max-w-2xl mx-auto" style={{ maxWidth: "640px" }}>
          <AddressForm
            initialAddress={editingAddress || undefined}
            onSubmit={handleCreateOrUpdate}
            onCancel={cancelForm}
            loading={formLoading}
          />
        </div>
      ) : loading ? (
        <Loader message="Loading certified addresses..." />
      ) : addresses.length === 0 ? (
        <div className="text-center p-5 border rounded-4 bg-white shadow-sm my-4">
          <MapPin size={40} className="text-muted mb-3" />
          <h4 className="fw-semibold text-dark mb-1 display-font">
            No Addresses Registered
          </h4>
          <p className="text-muted small">
            You haven't added any shipping addresses to your profile yet.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-premium mt-3 px-4"
          >
            Create Your First Address
          </button>
        </div>
      ) : (
        <div className="row g-4 mt-1">
          {addresses.map((address) => (
            <div className="col-12 col-md-6" key={address.id}>
              <AddressCard
                address={address}
                onEdit={() => startEdit(address)}
                onDelete={() => handleDelete(address.id)}
                showActions={true}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
