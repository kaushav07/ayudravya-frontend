/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import axios from "axios";

// Retrieve the base API URL from environment variables, fallback to current origin if not provided
const BASE_URL =
  (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "") + "/api/v1";

// Key for auth token
const TOKEN_KEY = "auth_token";

const INITIAL_PRODUCTS = [
  {
    id: "p1",
    name: "AuraDaily Essentials Multivitamin",
    slug: "auradaily-multivitamin",
    subtitle:
      "High-potency daily formulation for immunity, daily energy, and cellular vitality.",
    composition:
      "Vitamin A, C, D3, E, K2, B-Complex, Zinc, Magnesium, CoQ10, Ashwagandha Extract",
    manufacturer: "Aura Wellness Labs",
    dosage_form: "Vegan Capsules",
    pack_size: "60 Capsules (30-day supply)",
    requires_prescription: false,
    price: 49.0,
    compare_at_price: 65.0,
    stock_status: "In Stock",
    stock_qty: 42,
    description:
      "Elevate your everyday wellness with AuraDaily Essentials. Our master-crafted formula contains bioavailable vitamins, essential trace minerals, and adaptogenic Ashwagandha to support sustained energy, cognitive focus, and strong immune defense. Non-GMO, gluten-free, and formulated in a state-of-the-art clinical facility.",
    safety_info:
      "Take 2 capsules daily in the morning with food. Consult your physician before use if you are pregnant, nursing, or taking medications. Keep out of reach of children.",
    images: ["/images/auradaily.png"],
    category_slug: "daily-wellness",
  },
  {
    id: "p2",
    name: "SomnusRest Advanced Sleep Support",
    slug: "somnusrest-sleep-support",
    subtitle:
      "Clinically formulated calming blend to induce deep, restorative REM sleep cycles.",
    composition:
      "Melatonin (3mg), L-Theanine, GABA, 5-HTP, Valerian Root, Chamomile & Lavender Extract",
    manufacturer: "Somnus Neuro-Pharma",
    dosage_form: "Liquid Gel Capsules",
    pack_size: "30 Softgels (30-day supply)",
    requires_prescription: true,
    price: 59.0,
    compare_at_price: 75.0,
    stock_status: "In Stock",
    stock_qty: 18,
    description:
      "Reclaim your nights and wake up fully refreshed with SomnusRest. This advanced formulation combines natural sleep-inducing neurotransmitters with organic, high-potency herbal extracts to help you fall asleep faster, stay asleep longer, and improve overall sleep architecture. Requires a registered practitioner's prescription.",
    safety_info:
      "Take 1 softgel 30-40 minutes before bedtime. Do not drive or operate machinery after consumption. Prescribed for adult use only. Do not combine with alcohol or other sedatives.",
    images: ["/images/somnusrest.png"],
    category_slug: "sleep-support",
  },
  {
    id: "p3",
    name: "Apex Hair Regrowth Treatment",
    slug: "apex-hair-regrowth",
    subtitle:
      "Prescription-strength topical solution for reversing hair loss and revitalizing follicles.",
    composition: "Minoxidil 5% w/v, Finasteride 0.1% w/v, Procapil 3%, Biotin",
    manufacturer: "Apex Clinical Labs",
    dosage_form: "Topical Solution",
    pack_size: "60ml Bottle (30-day supply)",
    requires_prescription: true,
    price: 69.0,
    compare_at_price: 89.0,
    stock_status: "In Stock",
    stock_qty: 25,
    description:
      "Stop hair thinning and actively regrow hair at the crown and hairline. Apex Hair Regrowth Treatment combines the dual clinically-proven power of Minoxidil and Finasteride to block DHT locally and stimulate blood flow to follicles. Requires a registered doctor's prescription upload.",
    safety_info:
      "Apply 1 ml twice daily directly onto clean scalp in the hair loss area. For external use only. Wash hands after use. Avoid contact with eyes. Keep out of reach of women and children.",
    images: ["/images/apex-hair.png"],
    category_slug: "mens-wellness",
  },
  {
    id: "p4",
    name: "VigorMax Stamina & Test Support",
    slug: "vigormax-testosterone-support",
    subtitle:
      "Premium clinical adaptogenic blend for male stamina, vitality, and hormonal balance.",
    composition:
      "KSM-66 Ashwagandha (600mg), Fenugreek Extract (500mg), Purified Shilajit, Tribulus Terrestris, Zinc, Magnesium",
    manufacturer: "VigorMax Labs",
    dosage_form: "Vegan Capsules",
    pack_size: "90 Capsules (30-day supply)",
    requires_prescription: false,
    price: 49.0,
    compare_at_price: 65.0,
    stock_status: "In Stock",
    stock_qty: 50,
    description:
      "Formulated to elevate your physical performance, reduce stress-induced fatigue, and naturally support healthy testosterone levels. VigorMax features premium KSM-66 Ashwagandha, mineral-rich Shilajit, and essential zinc to help you build muscle, sustain energy, and thrive.",
    safety_info:
      "Take 3 capsules daily, preferably with a meal or as directed by your healthcare professional. Do not exceed the recommended daily dose.",
    images: ["/images/vigormax.png"],
    category_slug: "mens-wellness",
  },
  {
    id: "p5",
    name: "ProstaShield Advanced Care",
    slug: "prostashield-advanced-care",
    subtitle:
      "Clinician-formulated prostate support to maintain healthy urinary flow and comfort.",
    composition:
      "Saw Palmetto Berry Extract, Pumpkin Seed Extract, Pygeum Bark, Beta-Sitosterol, Lycopene",
    manufacturer: "ProstaShield Pharma",
    dosage_form: "Liquid Softgels",
    pack_size: "60 Softgels (30-day supply)",
    requires_prescription: false,
    price: 54.0,
    compare_at_price: 70.0,
    stock_status: "In Stock",
    stock_qty: 30,
    description:
      "Maintain your confidence and sleep through the night. ProstaShield Advanced Care contains high-quality plant sterols and standardized saw palmetto extract to support prostate size, function, and normal bladder habits for men over 40.",
    safety_info:
      "Take 2 softgels daily with water. Consult a healthcare practitioner if you have pre-existing medical conditions or are taking prescription medications.",
    images: ["/images/prostashield.png"],
    category_slug: "mens-wellness",
  },
  {
    id: "p6",
    name: "Fortify Beard Activation Serum",
    slug: "fortify-beard-activation-serum",
    subtitle:
      "Advanced follicular booster for dense, healthy facial hair growth.",
    composition:
      "Redensyl 3%, Capixyl 2%, Jojoba Oil, Argan Oil, Rosemary Oil, Vitamin E",
    manufacturer: "Aura Wellness Labs",
    dosage_form: "Follicular Serum",
    pack_size: "30ml Dropper Bottle",
    requires_prescription: false,
    price: 39.0,
    compare_at_price: 49.0,
    stock_status: "In Stock",
    stock_qty: 40,
    description:
      "Grow a thicker, fuller beard and eliminate itchiness. Fortify Beard Activation Serum contains award-winning Redensyl and Capixyl to wake up inactive hair follicles, combined with premium argan and jojoba oils to condition facial hair and nourish underlying skin.",
    safety_info:
      "Apply a few drops twice daily onto clean facial skin where beard growth is desired. Massage gently. Do not rinse for at least 4 hours.",
    images: ["/images/fortify-beard.png"],
    category_slug: "mens-wellness",
  },
];

const INITIAL_CATEGORIES = [
  {
    id: "c1",
    name: "Daily Wellness",
    slug: "daily-wellness",
    description: "Essential supplements for vibrant daily living.",
  },
  {
    id: "c2",
    name: "Sleep & Relaxation",
    slug: "sleep-support",
    description: "Formulations designed to support restful sleep and calm.",
  },
  {
    id: "c3",
    name: "Men's Wellness",
    slug: "mens-wellness",
    description:
      "Targeted formulations for male vitality, performance, hair, and prostate health.",
  },
];

const INITIAL_BANNERS = [
  {
    id: "b1",
    title: "Science-Backed Pharmaceutical Wellness",
    subtitle:
      "Premium targeted care solutions formulated by clinicians for optimal daily vitality and deep nighttime recovery.",
    image_url: "https://picsum.photos/seed/medicalspa/1600/900",
    link: "/products",
  },
];

const INITIAL_ADDRESSES = [
  {
    id: "addr1",
    full_name: "Jane Doe",
    phone: "+1 555-0199",
    address_line1: "128 Medical Plaza Suite 4B",
    address_line2: "Avenue of Sciences",
    city: "San Francisco",
    state: "California",
    postal_code: "94107",
    country: "United States",
    is_default: true,
  },
];

function getMockDb() {
  const data = localStorage.getItem("premium_shop_mock_db");
  if (data) {
    try {
      const db = JSON.parse(data);
      // Auto-migration: update products and categories if catalog has changed
      if (
        !db.products ||
        db.products.length !== INITIAL_PRODUCTS.length ||
        !db.categories ||
        db.categories.length !== INITIAL_CATEGORIES.length
      ) {
        db.products = INITIAL_PRODUCTS;
        db.categories = INITIAL_CATEGORIES;
        saveMockDb(db);
      }
      return db;
    } catch (e) {
      // parse failed, use default
    }
  }

  const defaultDb = {
    user: null,
    products: INITIAL_PRODUCTS,
    categories: INITIAL_CATEGORIES,
    cart: {
      id: "cart_main",
      items: [],
      subtotal: 0,
      total: 0,
      requires_prescription: false,
    },
    addresses: INITIAL_ADDRESSES,
    orders: [],
    prescriptions: [],
    banners: INITIAL_BANNERS,
  };
  saveMockDb(defaultDb);
  return defaultDb;
}

function saveMockDb(db) {
  localStorage.setItem("premium_shop_mock_db", JSON.stringify(db));
}

// Custom request function with fallback
export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem(TOKEN_KEY);

  const axiosHeaders = {};
  if (options.headers) {
    if (options.headers instanceof Headers) {
      for (const [key, value] of options.headers.entries()) {
        axiosHeaders[key] = value;
      }
    } else {
      Object.assign(axiosHeaders, options.headers);
    }
  }
  if (token) {
    axiosHeaders["Authorization"] = `Bearer ${token}`;
  }
  if (!(options.body instanceof FormData) && !axiosHeaders["Content-Type"] && !axiosHeaders["content-type"]) {
    axiosHeaders["Content-Type"] = "application/json";
  }

  const fullUrl = `${BASE_URL}${path}`;

  try {
    // If no base URL is defined, throw directly to trigger Mock fallback
    if (!import.meta.env.VITE_API_BASE_URL) {
      throw new Error("No API base URL configured");
    }

    const method = (options.method || "GET").toLowerCase();
    let data = options.body;
    // If it's a JSON string, let Axios handle serialization by passing parsed object
    if (typeof data === "string" && (axiosHeaders["Content-Type"] === "application/json" || axiosHeaders["content-type"] === "application/json")) {
      try {
        data = JSON.parse(data);
      } catch (e) {
        // Keep it as a string if parsing fails
      }
    }

    const response = await axios({
      url: fullUrl,
      method: method,
      headers: axiosHeaders,
      data: data,
    });

    return response.data;
  } catch (error) {
    if (error.message === "No API base URL configured") {
      // Direct silent transition to mock fallback
    } else if (axios.isAxiosError(error) && error.response) {
      const errData = error.response.data;
      const parsedError = (errData && errData.error) || {
        code: "HTTP_ERROR",
        message: (errData && errData.message) || `Server responded with status ${error.response.status}`,
      };
      throw parsedError;
    } else {
      console.warn(
        `[API Client Redirecting to Stateful Fallback] ${fullUrl}:`,
        error,
      );
    }
    // Call our mock database router
    return handleMockRequest(path, options);
  }
}

// Simple router to intercept requests and simulate the exact backend actions statefully
function handleMockRequest(path, options) {
  const db = getMockDb();
  const method = options.method ? options.method.toUpperCase() : "GET";
  const cleanPath = path.split("?")[0];

  // --- Auth Endpoints ---
  if (cleanPath === "/auth/login" && method === "POST") {
    const { email, password } = JSON.parse(options.body);
    if (!email || !password) {
      throw {
        code: "VALIDATION_ERROR",
        message: "Email and password are required",
      };
    }
    const mockUser = {
      id: "usr_mock",
      full_name: "Jane Doe",
      email,
      phone: "+1 555-0199",
    };
    db.user = mockUser;
    saveMockDb(db);
    localStorage.setItem(TOKEN_KEY, "mock_jwt_token_12345");
    return mockUser;
  }

  if (cleanPath === "/auth/register" && method === "POST") {
    const { email, full_name, password, phone } = JSON.parse(options.body);
    if (!email || !password || !full_name) {
      throw {
        code: "VALIDATION_ERROR",
        message: "Full name, email, and password are required",
      };
    }
    const mockUser = { id: "usr_mock", full_name, email, phone };
    db.user = mockUser;
    saveMockDb(db);
    localStorage.setItem(TOKEN_KEY, "mock_jwt_token_12345");
    return mockUser;
  }

  if (cleanPath === "/auth/me" && method === "GET") {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      throw { code: "UNAUTHORIZED", message: "Credentials missing" };
    }
    if (!db.user) {
      db.user = {
        id: "usr_mock",
        full_name: "Jane Doe",
        email: "jane.doe@example.com",
        phone: "+1 555-0199",
      };
      saveMockDb(db);
    }
    return db.user;
  }

  if (cleanPath === "/auth/logout" && method === "POST") {
    db.user = null;
    saveMockDb(db);
    localStorage.removeItem(TOKEN_KEY);
    return { success: true };
  }

  if (cleanPath === "/auth/forgot-password" && method === "POST") {
    return { message: "Password reset link sent successfully." };
  }

  if (cleanPath === "/auth/reset-password" && method === "POST") {
    return { message: "Password reset successfully." };
  }

  // --- Banner Endpoints ---
  if (cleanPath === "/banners" && method === "GET") {
    return db.banners;
  }

  // --- Category Endpoints ---
  if (cleanPath === "/categories" && method === "GET") {
    return db.categories;
  }

  if (cleanPath.startsWith("/categories/") && method === "GET") {
    const slug = cleanPath.split("/")[2];
    const category = db.categories.find((c) => c.slug === slug);
    if (!category) throw { code: "NOT_FOUND", message: "Category not found" };
    return category;
  }

  // --- Product Endpoints ---
  if (cleanPath === "/products" && method === "GET") {
    const response = {
      items: db.products,
      pagination: {
        page: 1,
        limit: 20,
        total: db.products.length,
        total_pages: 1,
        has_next: false,
        has_previous: false,
      },
    };
    return response;
  }

  if (cleanPath.startsWith("/products/") && method === "GET") {
    const parts = cleanPath.split("/");
    const slug = parts[2];
    const isRelated = parts[3] === "related";

    const product = db.products.find((p) => p.slug === slug);
    if (!product) throw { code: "NOT_FOUND", message: "Product not found" };

    if (isRelated) {
      // Return the other product as related
      const related = db.products.filter((p) => p.slug !== slug);
      return related;
    }

    return product;
  }

  // --- Cart Endpoints ---
  if (cleanPath === "/cart" && method === "GET") {
    return db.cart;
  }

  if (cleanPath === "/cart/items" && method === "POST") {
    const { product_id, quantity } = JSON.parse(options.body);
    const prod = db.products.find((p) => p.id === product_id);
    if (!prod) throw { code: "NOT_FOUND", message: "Product not found" };

    // Check if item already in cart
    const existingIndex = db.cart.items.findIndex(
      (item) => item.product_id === product_id,
    );
    if (existingIndex > -1) {
      db.cart.items[existingIndex].quantity += quantity;
    } else {
      db.cart.items.push({
        id: `cart_item_${Date.now()}`,
        product_id,
        product: prod,
        quantity,
        price: prod.price,
      });
    }

    recalculateCart(db.cart);
    saveMockDb(db);
    return db.cart;
  }

  if (cleanPath.startsWith("/cart/items/") && method === "PATCH") {
    const itemId = cleanPath.split("/")[3];
    const { quantity } = JSON.parse(options.body);
    const item = db.cart.items.find((i) => i.id === itemId);
    if (!item) throw { code: "NOT_FOUND", message: "Cart item not found" };

    item.quantity = quantity;
    if (item.quantity <= 0) {
      db.cart.items = db.cart.items.filter((i) => i.id !== itemId);
    }

    recalculateCart(db.cart);
    saveMockDb(db);
    return db.cart;
  }

  if (cleanPath.startsWith("/cart/items/") && method === "DELETE") {
    const itemId = cleanPath.split("/")[3];
    db.cart.items = db.cart.items.filter((i) => i.id !== itemId);
    recalculateCart(db.cart);
    saveMockDb(db);
    return db.cart;
  }

  if (cleanPath === "/cart" && method === "DELETE") {
    db.cart.items = [];
    recalculateCart(db.cart);
    saveMockDb(db);
    return db.cart;
  }

  // --- Address Endpoints ---
  if (cleanPath === "/users/me/addresses" && method === "GET") {
    return db.addresses;
  }

  if (cleanPath === "/users/me/addresses" && method === "POST") {
    const addr = JSON.parse(options.body);
    const newAddr = {
      ...addr,
      id: `addr_${Date.now()}`,
      is_default: db.addresses.length === 0 ? true : addr.is_default,
    };

    if (newAddr.is_default) {
      db.addresses.forEach((a) => (a.is_default = false));
    }
    db.addresses.push(newAddr);
    saveMockDb(db);
    return newAddr;
  }

  if (cleanPath.startsWith("/users/me/addresses/") && method === "PATCH") {
    const id = cleanPath.split("/")[4];
    const updates = JSON.parse(options.body);
    const index = db.addresses.findIndex((a) => a.id === id);
    if (index === -1) throw { code: "NOT_FOUND", message: "Address not found" };

    if (updates.is_default) {
      db.addresses.forEach((a) => (a.is_default = false));
    }

    db.addresses[index] = { ...db.addresses[index], ...updates };
    saveMockDb(db);
    return db.addresses[index];
  }

  if (cleanPath.startsWith("/users/me/addresses/") && method === "DELETE") {
    const id = cleanPath.split("/")[4];
    db.addresses = db.addresses.filter((a) => a.id !== id);
    saveMockDb(db);
    return { success: true };
  }

  // --- Prescription Endpoints ---
  if (cleanPath === "/prescriptions" && method === "POST") {
    // In FormData, files are passed. Since we're frontend-only, let's Mock-generate filenames
    const newPresc = {
      id: `rx_${Date.now()}`,
      file_names: ["prescription_uploaded_doc.jpg"],
      status: "PENDING",
      created_at: new Date().toISOString(),
    };
    db.prescriptions.push(newPresc);
    saveMockDb(db);
    return newPresc;
  }

  if (cleanPath === "/prescriptions" && method === "GET") {
    return db.prescriptions;
  }

  // --- Checkout / Validation / Orders ---
  if (cleanPath === "/checkout/validate" && method === "POST") {
    // Return order calculations from active cart items
    const subtotal = db.cart.total;
    const tax = Number((subtotal * 0.12).toFixed(2));
    const shipping = subtotal > 100 ? 0 : 15;
    const grandTotal = Number((subtotal + tax + shipping).toFixed(2));
    return {
      subtotal,
      tax,
      shipping_charge: shipping,
      grand_total: grandTotal,
      requires_prescription: db.cart.requires_prescription,
    };
  }

  if (cleanPath === "/checkout/create-order" && method === "POST") {
    const body = JSON.parse(options.body);
    const activeAddress =
      db.addresses.find((a) => a.id === body.address_id) || db.addresses[0];
    if (!activeAddress) {
      throw {
        code: "VALIDATION_ERROR",
        message: "A valid delivery address is required.",
      };
    }

    const subtotal = db.cart.total;
    const tax = Number((subtotal * 0.12).toFixed(2));
    const shipping = subtotal > 100 ? 0 : 15;
    const grandTotal = Number((subtotal + tax + shipping).toFixed(2));

    const newOrder = {
      id: `ord_${Date.now()}`,
      order_number: `AN-${Math.floor(100000 + Math.random() * 900000)}`,
      items: db.cart.items.map((item) => ({
        id: `ord_item_${Date.now()}_${Math.random()}`,
        product_name: item.product.name,
        product_slug: item.product.slug,
        quantity: item.quantity,
        price: item.price,
        item_total: item.quantity * item.price,
      })),
      shipping_address: activeAddress,
      status: "PENDING",
      subtotal,
      tax,
      shipping_charge: shipping,
      grand_total: grandTotal,
      created_at: new Date().toISOString(),
      payment_status: "PENDING",
      prescription_uploaded: db.cart.requires_prescription,
    };

    db.orders.unshift(newOrder);
    // Clear cart upon checkout
    db.cart.items = [];
    recalculateCart(db.cart);
    saveMockDb(db);

    return newOrder;
  }

  // --- Payments ---
  if (cleanPath === "/payments/create" && method === "POST") {
    const { order_id } = JSON.parse(options.body);
    const order = db.orders.find((o) => o.id === order_id);
    if (!order) throw { code: "NOT_FOUND", message: "Order not found" };

    return {
      id: `pay_${Date.now()}`,
      order_id: order.id,
      amount: order.grand_total,
      currency: "USD",
      status: "CREATED",
    };
  }

  if (cleanPath === "/payments/verify" && method === "POST") {
    const { order_id } = JSON.parse(options.body);
    const order = db.orders.find((o) => o.id === order_id);
    if (!order) throw { code: "NOT_FOUND", message: "Order not found" };

    order.payment_status = "PAID";
    order.status = "PAID";
    saveMockDb(db);
    return { success: true, order };
  }

  // --- Order Lists ---
  if (cleanPath === "/orders" && method === "GET") {
    return db.orders;
  }

  if (cleanPath.startsWith("/orders/") && method === "GET") {
    const id = cleanPath.split("/")[2];
    const order = db.orders.find((o) => o.id === id);
    if (!order) throw { code: "NOT_FOUND", message: "Order not found" };
    return order;
  }

  if (
    cleanPath.startsWith("/orders/") &&
    cleanPath.endsWith("/cancel") &&
    method === "POST"
  ) {
    const id = cleanPath.split("/")[2];
    const order = db.orders.find((o) => o.id === id);
    if (!order) throw { code: "NOT_FOUND", message: "Order not found" };
    order.status = "CANCELLED";
    saveMockDb(db);
    return order;
  }

  throw { code: "NOT_FOUND", message: "Resource not found" };
}

function recalculateCart(cart) {
  let subtotal = 0;
  let rxReq = false;
  cart.items.forEach((item) => {
    subtotal += item.price * item.quantity;
    if (item.product.requires_prescription) {
      rxReq = true;
    }
  });

  cart.subtotal = Number(subtotal.toFixed(2));
  cart.total = Number(subtotal.toFixed(2));
  cart.requires_prescription = rxReq;
}
