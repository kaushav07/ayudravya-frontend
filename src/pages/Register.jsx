/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ShieldCheck, UserPlus, AlertCircle } from "lucide-react";
import { useApp } from "../store/AppContext";
import { FormInput } from "../components/FormInput";
import { Button } from "../components/Button";

export const Register = () => {
  const { user, register, error, clearError } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get("redirect") || "/";

  useEffect(() => {
    if (user) {
      navigate(redirectPath);
    }
  }, [user, navigate, redirectPath]);

  useEffect(() => {
    return () => {
      clearError();
    };
  }, []);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setValidationError(null);
    clearError();

    // Standard client side validation
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setValidationError(
        "Full name, email address, and password are required.",
      );
      return;
    }

    if (password.length < 6) {
      setValidationError("Your password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setValidationError("Passwords do not match. Please verify your typing.");
      return;
    }

    try {
      setFormLoading(true);
      await register({
        email,
        full_name: fullName,
        password,
        phone: phone || undefined,
      });
    } catch (err) {
      console.warn("Registration failure:", err);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div
      className="container py-5 d-flex justify-content-center align-items-center fade-in-up text-start"
      style={{ minHeight: "80vh" }}
      id="register-page-root"
    >
      <div
        className="card border-0 shadow-sm rounded-4 overflow-hidden w-100 bg-white"
        style={{ maxWidth: "480px" }}
      >
        <div className="card-body p-4 p-md-5">
          <div className="text-center mb-4">
            <h1
              className="h3 display-font fw-bold text-success"
              style={{ color: "var(--primary-color)" }}
            >
              Ayudravya
            </h1>
            <p className="text-muted small">
              Register your premium wellness account
            </p>
          </div>

          {(validationError || error) && (
            <div className="alert alert-danger border-0 p-3 rounded-3 d-flex gap-2.5 small mb-4">
              <AlertCircle size={18} className="text-danger mt-0.5" />
              <div>{validationError || error}</div>
            </div>
          )}

          <form onSubmit={handleRegisterSubmit}>
            <FormInput
              label="Full Name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Jane Doe"
              disabled={formLoading}
              required
            />

            <FormInput
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane.doe@example.com"
              disabled={formLoading}
              required
            />

            <FormInput
              label="Phone Number (Optional)"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 555-0199"
              disabled={formLoading}
            />

            <FormInput
              label="Password (min 6 characters)"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={formLoading}
              required
            />

            <FormInput
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              disabled={formLoading}
              required
            />

            <Button
              type="submit"
              loading={formLoading}
              loadingText="Creating security profile..."
              className="w-100 py-2.5 mb-3"
            >
              <UserPlus size={16} />
              <span>Create Account</span>
            </Button>
          </form>

          <div className="text-center mt-4 pt-2 border-top">
            <span className="text-secondary small">
              Already have an account?{" "}
            </span>
            <Link
              to={`/login?redirect=${encodeURIComponent(redirectPath)}`}
              style={{ color: "var(--primary-color)" }}
              className="small text-decoration-none fw-bold hover-underline"
            >
              Sign In Here
            </Link>
          </div>

          <div
            className="d-flex align-items-center justify-content-center gap-1.5 text-muted mt-4 small border-top pt-3 font-mono"
            style={{ fontSize: "0.72rem" }}
          >
            <ShieldCheck size={13} className="text-success" />
            <span>GDPR-Compliant Encrypted Storage</span>
          </div>
        </div>
      </div>
    </div>
  );
};
