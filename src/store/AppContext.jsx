/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";
import { cartService } from "../services/cartService";

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [cart, setCart] = useState(null);
  const [loadingCart, setLoadingCart] = useState(false);
  const [error, setError] = useState(null);

  const refreshUser = async () => {
    try {
      setLoadingUser(true);
      const currentUser = await authService.getMe();
      setUser(currentUser);
    } catch (e) {
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  const refreshCart = async () => {
    try {
      setLoadingCart(true);
      const currentCart = await cartService.getCart();
      setCart(currentCart);
    } catch (e) {
      console.warn("Error fetching cart:", e);
    } finally {
      setLoadingCart(false);
    }
  };

  const login = async (email, password) => {
    setError(null);
    try {
      const loggedUser = await authService.login({ email, password });
      setUser(loggedUser);
      await refreshCart();
    } catch (e) {
      setError(e.message || "Login failed. Please check your credentials.");
      throw e;
    }
  };

  const register = async (data) => {
    setError(null);
    try {
      const registeredUser = await authService.register(data);
      setUser(registeredUser);
      await refreshCart();
    } catch (e) {
      setError(e.message || "Registration failed. Please check your inputs.");
      throw e;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (e) {
      console.warn("Logout endpoint failed:", e);
    } finally {
      setUser(null);
      setCart(null);
      localStorage.removeItem("auth_token");
    }
  };

  const addToCart = async (productId, quantity) => {
    setError(null);
    try {
      setLoadingCart(true);
      const updatedCart = await cartService.addToCart(productId, quantity);
      setCart(updatedCart);
    } catch (e) {
      setError(e.message || "Failed to add item to cart.");
      throw e;
    } finally {
      setLoadingCart(false);
    }
  };

  const updateCartQty = async (itemId, quantity) => {
    setError(null);
    try {
      setLoadingCart(true);
      const updatedCart = await cartService.updateCartItem(itemId, quantity);
      setCart(updatedCart);
    } catch (e) {
      setError(e.message || "Failed to update item quantity.");
      throw e;
    } finally {
      setLoadingCart(false);
    }
  };

  const removeCartItem = async (itemId) => {
    setError(null);
    try {
      setLoadingCart(true);
      const updatedCart = await cartService.removeCartItem(itemId);
      setCart(updatedCart);
    } catch (e) {
      setError(e.message || "Failed to remove item from cart.");
      throw e;
    } finally {
      setLoadingCart(false);
    }
  };

  const clearCart = async () => {
    setError(null);
    try {
      setLoadingCart(true);
      const updatedCart = await cartService.clearCart();
      setCart(updatedCart);
    } catch (e) {
      setError(e.message || "Failed to clear cart.");
      throw e;
    } finally {
      setLoadingCart(false);
    }
  };

  const clearError = () => setError(null);

  // Initialize Auth & Cart states
  useEffect(() => {
    const initializeApp = async () => {
      await refreshUser();
      await refreshCart();
    };
    initializeApp();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        loadingUser,
        cart,
        loadingCart,
        error,
        login,
        register,
        logout,
        refreshUser,
        refreshCart,
        addToCart,
        updateCartQty,
        removeCartItem,
        clearCart,
        clearError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
