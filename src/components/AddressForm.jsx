/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { FormInput } from "./FormInput";
import { Button } from "./Button";

export const AddressForm = ({
  initialAddress,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [fullName, setFullName] = useState(initialAddress?.full_name || "");
  const [phone, setPhone] = useState(initialAddress?.phone || "");
  const [addressLine1, setAddressLine1] = useState(
    initialAddress?.address_line1 || "",
  );
  const [addressLine2, setAddressLine2] = useState(
    initialAddress?.address_line2 || "",
  );
  const [city, setCity] = useState(initialAddress?.city || "");
  const [state, setState] = useState(initialAddress?.state || "");
  const [postalCode, setPostalCode] = useState(
    initialAddress?.postal_code || "",
  );
  const [country, setCountry] = useState(
    initialAddress?.country || "United States",
  );
  const [isDefault, setIsDefault] = useState(
    initialAddress?.is_default || false,
  );
  const [errors, setErrors] = useState({});

  const validate = () => {
    const tempErrors = {};
    if (!fullName.trim()) tempErrors.fullName = "Recipient name is required";
    if (!phone.trim()) tempErrors.phone = "Phone number is required";
    if (!addressLine1.trim())
      tempErrors.addressLine1 = "Address line 1 is required";
    if (!city.trim()) tempErrors.city = "City is required";
    if (!state.trim()) tempErrors.state = "State is required";
    if (!postalCode.trim()) tempErrors.postalCode = "Postal code is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await onSubmit({
        full_name: fullName,
        phone,
        address_line1: addressLine1,
        address_line2: addressLine2 || undefined,
        city,
        state,
        postal_code: postalCode,
        country,
        is_default: isDefault,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card p-4 rounded-4 shadow-sm bg-white"
      id="address-form-component"
    >
      <h4 className="h5 fw-bold text-dark display-font mb-4 border-bottom pb-2">
        {initialAddress ? "Edit Delivery Address" : "Register New Address"}
      </h4>

      <div className="row">
        <div className="col-12 col-md-6">
          <FormInput
            label="Full Name / Recipient"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            error={errors.fullName}
            placeholder="Jane Doe"
          />
        </div>
        <div className="col-12 col-md-6">
          <FormInput
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={errors.phone}
            placeholder="+1 555-0100"
          />
        </div>
      </div>

      <FormInput
        label="Address Line 1"
        value={addressLine1}
        onChange={(e) => setAddressLine1(e.target.value)}
        error={errors.addressLine1}
        placeholder="123 Apothecary Way Suite C"
      />

      <FormInput
        label="Address Line 2 (Optional)"
        value={addressLine2}
        onChange={(e) => setAddressLine2(e.target.value)}
        placeholder="Floor / Room / Suite"
      />

      <div className="row">
        <div className="col-12 col-md-4">
          <FormInput
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            error={errors.city}
            placeholder="San Francisco"
          />
        </div>
        <div className="col-12 col-md-4">
          <FormInput
            label="State / Province"
            value={state}
            onChange={(e) => setState(e.target.value)}
            error={errors.state}
            placeholder="California"
          />
        </div>
        <div className="col-12 col-md-4">
          <FormInput
            label="Postal / ZIP Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            error={errors.postalCode}
            placeholder="94107"
          />
        </div>
      </div>

      <FormInput
        label="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="United States"
      />

      <div className="form-check text-start mb-4 mt-2">
        <input
          type="checkbox"
          id="is_default_address"
          className="form-check-input"
          checked={isDefault}
          onChange={(e) => setIsDefault(e.target.checked)}
        />

        <label
          htmlFor="is_default_address"
          className="form-check-label text-dark small"
        >
          Set as default delivery destination
        </label>
      </div>

      <div className="d-flex gap-3 justify-content-end">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-outline-secondary px-4 py-2.5 rounded-3 fw-medium small"
          disabled={loading}
        >
          Cancel
        </button>
        <Button
          type="submit"
          loading={loading}
          loadingText="Saving record..."
          className="px-4 py-2.5 small"
        >
          Save Address
        </Button>
      </div>
    </form>
  );
};
