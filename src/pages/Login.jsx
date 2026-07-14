/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ShieldCheck, LogIn, AlertCircle } from "lucide-react";
import { useApp } from "../store/AppContext";
import { FormInput } from "../components/FormInput";
import { Button } from "../components/Button";

export const Login = () => {
  const { user, login, error, clearError } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [validationError, setValidationError] = useState(null);

  // Parse redirect parameter
  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get("redirect") || "/";

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(redirectPath);
    }
  }, [user, navigate, redirectPath]);

  // Clear context errors on unmount
  useEffect(() => {
    return () => {
      clearError();
    };
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setValidationError(null);
    clearError();

    if (!email.trim() || !password.trim()) {
      setValidationError(
        "Please input both your registered email and password.",
      );
      return;
    }

    try {
      setFormLoading(true);
      await login(email, password);
      // Success triggers user state, which fires redirect in useEffect
    } catch (err) {
      console.warn("Login failure:", err);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div
      className="container py-5 d-flex justify-content-center align-items-center fade-in-up text-start"
      style={{ minHeight: "80vh" }}
      id="login-page-root"
    >
      <div
        className="card border-0 shadow-sm rounded-4 overflow-hidden w-100 bg-white"
        style={{ maxWidth: "440px" }}
      >
        <div className="card-body p-4 p-md-5">
          {/* Logo brand */}
          <div className="text-center mb-4">
            <h1
              className="h3 display-font fw-bold text-success"
              style={{ color: "var(--primary-color)" }}
            >
              Ayudravya
            </h1>
            <p className="text-muted small">
              Sign in to your clinical apothecary portal
            </p>
          </div>

          {/* Error notifications */}
          {(validationError || error) && (
            <div className="alert alert-danger border-0 p-3 rounded-3 d-flex gap-2.5 small mb-4">
              <AlertCircle size={18} className="text-danger mt-0.5" />
              <div>{validationError || error}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLoginSubmit}>
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
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={formLoading}
              required
            />

            <div className="text-end mb-4">
              <Link
                to="/forgot-password"
                style={{ color: "var(--primary-color)" }}
                className="small text-decoration-none hover-underline font-semibold"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              loading={formLoading}
              loadingText="Accessing security portal..."
              className="w-100 py-2.5 mb-3"
            >
              <LogIn size={16} />
              <span>Sign In Securely</span>
            </Button>
          </form>

          {/* Sign up links */}
          <div className="text-center mt-4 pt-2 border-top">
            <span className="text-secondary small">First time visiting? </span>
            <Link
              to={`/register?redirect=${encodeURIComponent(redirectPath)}`}
              style={{ color: "var(--primary-color)" }}
              className="small text-decoration-none fw-bold hover-underline"
            >
              Create an Account
            </Link>
          </div>

          {/* Trust badge */}
          <div
            className="d-flex align-items-center justify-content-center gap-1.5 text-muted mt-4 small border-top pt-3 font-mono"
            style={{ fontSize: "0.72rem" }}
          >
            <ShieldCheck size={13} className="text-success" />
            <span>SSL-Encrypted Identity Portal</span>
          </div>
        </div>
      </div>
    </div>
  );
};
