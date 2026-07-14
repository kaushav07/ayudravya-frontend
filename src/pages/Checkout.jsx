/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MapPin, Plus, ArrowLeft, ShieldAlert } from "lucide-react";
import { useApp } from "../store/AppContext";
import { addressService } from "../services/addressService";
import { checkoutService } from "../services/checkoutService";
import { paymentService } from "../services/paymentService";
import { AddressCard } from "../components/AddressCard";
import { AddressForm } from "../components/AddressForm";
import { PrescriptionUpload } from "../components/PrescriptionUpload";
import { CheckoutSummary } from "../components/CheckoutSummary";
import { Loader } from "../components/Loader";
import { ErrorMessage } from "../components/ErrorMessage";
import { Button } from "../components/Button";

export const Checkout = () => {
  const { user, cart, refreshCart, loadingCart } = useApp();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [uploadedRxId, setUploadedRxId] = useState(null);
  const [validation, setValidation] = useState(null);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [loadingValidation, setLoadingValidation] = useState(false);
  const [submittingOrder, setSubmittingOrder] = useState(false);
  const [error, setError] = useState(null);
  const [addressFormError, setAddressFormError] = useState(null);

  // Redirect to login if unauthorized
  useEffect(() => {
    if (!user) {
      navigate("/login?redirect=checkout");
    }
  }, [user, navigate]);

  // Load user addresses
  const loadAddresses = async () => {
    try {
      setLoadingAddresses(true);
      const list = await addressService.getAddresses();
      setAddresses(list);
      // Auto-select default or first address
      const defaultAddr = list.find((a) => a.is_default);
      if (defaultAddr) {
        setSelectedAddressId(defaultAddr.id);
      } else if (list.length > 0) {
        setSelectedAddressId(list[0].id);
      }
    } catch (e) {
      console.warn("Failed to load user addresses:", e);
    } finally {
      setLoadingAddresses(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadAddresses();
    }
  }, [user]);

  // Run checkout validation when address changes or cart changes
  useEffect(() => {
    const validate = async () => {
      if (!selectedAddressId || !cart || cart.items.length === 0) return;
      try {
        setLoadingValidation(true);
        setError(null);
        const res = await checkoutService.validateCheckout(selectedAddressId);
        setValidation(res);
      } catch (err) {
        setError(
          err.message ||
            "Checkout validation failed. Please check your delivery parameters.",
        );
      } finally {
        setLoadingValidation(false);
      }
    };
    validate();
  }, [selectedAddressId, cart]);

  const handleAddNewAddress = async (addressData) => {
    try {
      setAddressFormError(null);
      const newAddr = await addressService.createAddress(addressData);
      setAddresses((prev) => [...prev, newAddr]);
      setSelectedAddressId(newAddr.id);
      setShowAddressForm(false);
    } catch (err) {
      setAddressFormError(
        err.message || "Failed to save address. Please check input parameters.",
      );
    }
  };

  const handlePlaceOrder = async () => {
    setError(null);
    if (!selectedAddressId) {
      setError("A secure delivery destination address is required.");
      return;
    }

    if (cart?.requires_prescription && !uploadedRxId) {
      setError(
        "A doctor's prescription is strictly required to checkout Somnus Sleep Gels.",
      );
      return;
    }

    try {
      setSubmittingOrder(true);
      // 1. Create order on backend
      const order = await checkoutService.createOrder(
        selectedAddressId,
        uploadedRxId || undefined,
      );
      // 2. Create payment record
      const paymentResponse = await paymentService.createPayment(order.id);
      // 3. Verify payment on backend
      const verificationResponse = await paymentService.verifyPayment(
        order.id,
        paymentResponse.id,
      );
      if (verificationResponse.success) {
        await refreshCart();
        navigate("/payment/success", {
          state: { order: verificationResponse.order },
        });
      } else {
        navigate("/payment/failure", { state: { orderId: order.id } });
      }
    } catch (err) {
      setError(
        err.message ||
          "An unexpected error occurred during secure order submission.",
      );
      setSubmittingOrder(false);
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container py-5 text-start">
        <Link
          to="/products"
          className="btn btn-premium-outline mb-4 small d-inline-flex align-items-center gap-1.5"
        >
          <ArrowLeft size={14} />
          <span>Back to Catalog</span>
        </Link>
        <ErrorMessage
          title="Empty Cart checkout"
          message="You have no items in your cart to checkout."
        />
      </div>
    );
  }

  return (
    <div
      className="container py-5 fade-in-up text-start"
      id="checkout-page-root"
    >
      {/* Title */}
      <div className="border-bottom pb-3 mb-4 d-flex align-items-center justify-content-between">
        <div>
          <h1 className="h2 fw-bold text-dark display-font mb-1">
            Secure Apothecary Checkout
          </h1>
          <p className="text-muted small mb-0">
            Fill out your clinical parameters and delivery details below.
          </p>
        </div>
        <Link
          to="/cart"
          className="text-secondary text-decoration-none hover-text-success small d-flex align-items-center gap-1.5 font-mono"
        >
          <ArrowLeft size={14} />
          <span>View Bag</span>
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger border-0 p-3.5 mb-4 rounded-3 d-flex gap-2.5 align-items-start">
          <ShieldAlert size={20} className="text-danger mt-0.5" />
          <div className="small fw-semibold">{error}</div>
        </div>
      )}

      <div className="row g-4">
        {/* Checkout Inputs */}
        <div className="col-12 col-lg-8">
          <div className="d-flex flex-column gap-4">
            {/* 1. Address Selection */}
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="h5 fw-bold text-dark display-font mb-0 d-flex align-items-center gap-2">
                  <MapPin size={18} className="text-success" />
                  <span>1. Delivery Destination</span>
                </h3>
                {!showAddressForm && (
                  <button
                    type="button"
                    onClick={() => setShowAddressForm(true)}
                    className="btn btn-sm btn-outline-success d-inline-flex align-items-center gap-1 px-3 py-1.5 rounded-3 text-success border-light-subtle"
                    style={{ fontSize: "0.8rem" }}
                  >
                    <Plus size={14} />
                    <span>Add New</span>
                  </button>
                )}
              </div>

              {showAddressForm ? (
                <div className="mb-2">
                  {addressFormError && (
                    <div className="alert alert-danger p-2 small border-0 mb-3">
                      {addressFormError}
                    </div>
                  )}
                  <AddressForm
                    onSubmit={handleAddNewAddress}
                    onCancel={() => setShowAddressForm(false)}
                  />
                </div>
              ) : loadingAddresses ? (
                <Loader message="Accessing delivery databases..." />
              ) : addresses.length === 0 ? (
                <div className="text-center py-4 bg-light rounded-4 border border-dashed border-light-subtle">
                  <p className="text-muted small mb-3">
                    No delivery address registered on your profile yet.
                  </p>
                  <Button
                    variant="outline"
                    className="btn-sm"
                    onClick={() => setShowAddressForm(true)}
                  >
                    Register First Address
                  </Button>
                </div>
              ) : (
                <div className="row g-3">
                  {addresses.map((address) => (
                    <div className="col-12 col-md-6" key={address.id}>
                      <AddressCard
                        address={address}
                        selected={selectedAddressId === address.id}
                        onSelect={() => setSelectedAddressId(address.id)}
                        showActions={false}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Prescription Attachment (conditional) */}
            {cart.requires_prescription && (
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                <h3 className="h5 fw-bold text-dark display-font mb-2">
                  2. Prescription Validation Required
                </h3>
                <p className="text-muted small mb-4">
                  Somnus Sleep formulation is medically restricted. Attach a
                  photo, scan, or PDF of your registered medical prescription
                  below.
                </p>
                <PrescriptionUpload
                  onUploadSuccess={(rxId) => setUploadedRxId(rxId)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Checkout Summary Calculations */}
        <div className="col-12 col-lg-4">
          {loadingValidation || !validation ? (
            <div className="card border-0 shadow-sm p-4 rounded-4 bg-white text-center">
              <Loader message="Calculating tax and shipping routes..." />
            </div>
          ) : (
            <CheckoutSummary
              summary={validation}
              loading={submittingOrder}
              onPlaceOrder={handlePlaceOrder}
              disabled={
                !selectedAddressId ||
                (cart.requires_prescription && !uploadedRxId)
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};
