/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./store/AppContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

// Pages
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Account } from "./pages/Account";
import { Addresses } from "./pages/Addresses";
import { Orders } from "./pages/Orders";
import { OrderDetail } from "./pages/OrderDetail";
import { PaymentSuccess } from "./pages/PaymentSuccess";
import { PaymentFailure } from "./pages/PaymentFailure";
import ForgotPassword from "./pages/ForgotPassword";
import OTPComponent from "./pages/OTPComponent";

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100 bg-light">
          {/* Main Navigation Header */}
          <Navbar />

          {/* Core Content Body */}
          <main className="flex-grow-1" style={{ minHeight: "65vh" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:slug" element={<ProductDetailPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/account" element={<Account />} />
              <Route path="/account/addresses" element={<Addresses />} />
              <Route path="/orders" element={<Orders />} />
              <Route path='/forgot-password' element={<ForgotPassword/>}/>
              <Route path='/forgot-password/otp' element={<OTPComponent/>}/>
              <Route path="/orders/:id" element={<OrderDetail />} />
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route path="/payment/failure" element={<PaymentFailure />} />
              {/* Fallback to catalogue */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>

          {/* Brand Footer */}
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}
