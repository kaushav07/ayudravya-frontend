/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  User as UserIcon,
  Menu,
  X,
  ClipboardList,
  LogOut,
} from "lucide-react";
import { useApp } from "../store/AppContext";

export const Navbar = () => {
  const { user, cart, logout } = useApp();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const cartCount =
    cart?.items.reduce((total, item) => total + item.quantity, 0) || 0;

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-white border-bottom sticky-top py-3"
      id="main-navigation"
    >
      <div className="container">
        {/* Brand */}
        <Link
          className="navbar-brand d-flex align-items-center text-dark text-decoration-none"
          to="/"
        >
          <span
            className="font-serif italic tracking-tight"
            style={{
              color: "var(--primary-color)",
              fontSize: "1.75rem",
              fontWeight: 600,
            }}
          >
            Ayudravya
          </span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0 p-1"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="navbar-content"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          {isOpen ? (
            <X size={24} className="text-dark" />
          ) : (
            <Menu size={24} className="text-dark" />
          )}
        </button>

        {/* Links */}
        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbar-content"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4 gap-2 gap-lg-1">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link px-3 py-1.5 fw-medium small rounded-2 ${isActive ? "bg-light text-success" : "text-secondary hover:text-dark"}`
                }
                end
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `nav-link px-3 py-1.5 fw-medium small rounded-2 ${isActive ? "bg-light text-success" : "text-secondary hover:text-dark"}`
                }
              >
                Shop Products
              </NavLink>
            </li>
            {user && (
              <li className="nav-item">
                <NavLink
                  to="/orders"
                  className={({ isActive }) =>
                    `nav-link px-3 py-1.5 fw-medium small rounded-2 ${isActive ? "bg-light text-success" : "text-secondary hover:text-dark"}`
                  }
                >
                  My Orders
                </NavLink>
              </li>
            )}
          </ul>

          {/* Actions */}
          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="position-relative text-dark p-2 rounded-circle hover-bg-light"
              aria-label="Shopping Cart"
            >
              <ShoppingBag
                size={21}
                className="text-secondary hover:text-dark"
              />
              {cartCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                  style={{
                    backgroundColor: "var(--primary-color)",
                    fontSize: "0.65rem",
                    padding: "3px 6px",
                    border: "2px solid white",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth section */}
            {user ? (
              <div className="dropdown d-inline-block">
                <button
                  className="btn btn-light dropdown-toggle d-flex align-items-center gap-2 px-3 py-2 border rounded-pill"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={() => navigate("/account")}
                >
                  <UserIcon size={16} className="text-success" />
                  <span className="small fw-medium text-dark">
                    {user.full_name.split(" ")[0]}
                  </span>
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end shadow border-0 mt-2 p-2 rounded-3"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <Link
                      className="dropdown-item rounded-2 py-2 d-flex align-items-center gap-2"
                      to="/account"
                    >
                      <UserIcon size={14} /> Account Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item rounded-2 py-2 d-flex align-items-center gap-2"
                      to="/orders"
                    >
                      <ClipboardList size={14} /> My Orders
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger rounded-2 py-2 d-flex align-items-center gap-2"
                      onClick={handleLogout}
                    >
                      <LogOut size={14} /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Link
                  to="/login"
                  className="btn btn-link text-decoration-none text-secondary fw-medium small px-3"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="btn btn-premium px-3.5 py-2 small"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
