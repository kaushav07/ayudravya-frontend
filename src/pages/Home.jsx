/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  FileText,
  ShoppingBag,
  ShieldCheck,
  HeartPulse,
  Sliders,
} from "lucide-react";
import { productService } from "../services/productService";
import { ProductCard } from "../components/ProductCard";
import { Loader } from "../components/Loader";
import Carousel from "../components/Carousel";
import ProductSlider from "../components/ProductSlider";

const CUSTOMER_REVIEWS=[
      {
        id:1,
        name:"ABC",
        rating:"*****",
        location:"Delhi",
        review:"Good collection of healthcare products. The cart process is smooth and product details are easy to understand.",
      },
      {
        id:2,
        name:"ABC",
        Rating:"5 Star",
        location:"Delhi",
        review:"Good collection of healthcare products. The cart process is smooth and product details are easy to understand.",
      },
      {
        id:3,
        name:"ABC",
        rating:"5 Star",
        location:"Delhi",
        review:"Good collection of healthcare products. The cart process is smooth and product details are easy to understand.",
      },
      {
        id:4,
        name:"ABC",
        rating:"5 Star",
        location:"Delhi",
        review:"Good collection of healthcare products. The cart process is smooth and product details are easy to understand.",
      },
    ];

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await productService.getProducts();
        setProducts(response.items);
      } catch (e) {
        console.warn("Error loading featured products:", e);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="fade-in-up" id="home-page-root">
      {/* Premium Hero Section */}
      <section
        className="py-5 position-relative text-white overflow-hidden d-flex align-items-center"
        style={{
          background:
            "linear-gradient(135deg, var(--dark-bg) 0%, #1c3226 100%)",
        }}
      >
        <Carousel />
      </section>
      {/* product animation */}
      <div className="">
        <ProductSlider />
      </div>


      {/* How Ordering Works Section 
       <section className="py-5 bg-white border-bottom">
        <div className="container text-start py-3">
          <div className="text-center mb-5">
            <span
              className="text-success font-mono text-uppercase fw-semibold tracking-wider small d-block mb-1.5"
              style={{ color: "var(--primary-color)" }}
            >
              Apothecary Pipeline
            </span>
            <h2 className="fw-bold display-font text-dark mb-2">
              How Placing Your Order Works
            </h2>
            <p
              className="text-muted small mx-auto"
              style={{ maxWidth: "420px" }}
            >
              We've designed a secure, 4-step pharmacy workflow to deliver
              specialized supplements to your door.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-12 col-sm-6 col-md-3">
              <div className="p-4 border rounded-0 bg-white text-center h-100">
                <div
                  className="bg-light d-flex align-items-center justify-content-center mx-auto mb-3 text-success font-mono fw-bold"
                  style={{
                    width: "44px",
                    height: "44px",
                    color: "var(--primary-color)",
                    fontSize: "0.9rem",
                  }}
                >
                  01
                </div>
                <h5 className="fw-semibold text-dark small mb-2 display-font">
                  Choose Formula
                </h5>
                <p className="text-muted small mb-0">
                  Select from our daily multivitamin, sleep support, or premium
                  men's wellness formulas.
                </p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3">
              <div className="p-4 border rounded-0 bg-white text-center h-100">
                <div
                  className="bg-light d-flex align-items-center justify-content-center mx-auto mb-3 text-success font-mono fw-bold"
                  style={{
                    width: "44px",
                    height: "44px",
                    color: "var(--primary-color)",
                    fontSize: "0.9rem",
                  }}
                >
                  02
                </div>
                <h5 className="fw-semibold text-dark small mb-2 display-font">
                  Add to Bag
                </h5>
                <p className="text-muted small mb-0">
                  Specify quantity and add products directly to your virtual
                  bag.
                </p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3">
              <div className="p-4 border rounded-0 bg-white text-center h-100">
                <div
                  className="bg-light d-flex align-items-center justify-content-center mx-auto mb-3 text-success font-mono fw-bold"
                  style={{
                    width: "44px",
                    height: "44px",
                    color: "var(--primary-color)",
                    fontSize: "0.9rem",
                  }}
                >
                  03
                </div>
                <h5 className="fw-semibold text-dark small mb-2 display-font">
                  Upload Doctor Rx
                </h5>
                <p className="text-muted small mb-0">
                  Attach files securely if prescription is required for sleep
                  gels.
                </p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3">
              <div className="p-4 border rounded-0 bg-white text-center h-100">
                <div
                  className="bg-light d-flex align-items-center justify-content-center mx-auto mb-3 text-success font-mono fw-bold"
                  style={{
                    width: "44px",
                    height: "44px",
                    color: "var(--primary-color)",
                    fontSize: "0.9rem",
                  }}
                >
                  04
                </div>
                <h5 className="fw-semibold text-dark small mb-2 display-font">
                  Secure Transit
                </h5>
                <p className="text-muted small mb-0">
                  Verify payment. Our dispatch ships under regulated
                  cold-chains.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      */}

    {/*About Section */}
    <section className="about-ayudravya-section py-5" id="about">
        <div className="container1">
          <div className="about-ayudravya-wrapper">
            <div className="row align-items-center g-5">
              <div className="col-lg-7">
                <div className="about-content">
                  <span className="about-small-label">
                    About Ayudravya
                  </span>
                  
                  <h2 className="about-main-heading">
                    Your trusted destination for healthcare, wellness, and daily care
                    essentials
                 </h2>
                 
                 <p className="about-main-text">
                  Ayudravya is an online healthcare and wellness store designed to
                  make essential health products easy to discover, compare, and
                  purchase from one reliable platform. We bring together wellness
                  supplements, skincare products, vitamins, personal care essentials,
                  fitness nutrition, and everyday healthcare items.
                </p>
                
                <p className="about-main-text">
                  Our focus is to offer a clean shopping experience with clear
                  product details, transparent pricing, easy category browsing, and a
                  smooth cart flow so customers can shop with confidence.
                </p>
                
                <div className="about-highlight-row">
                  <div className="about-highlight-box">
                    <i className="bi bi-shield-check"></i>
                    <span>Trusted Products</span>
                  </div>
                  
                  <div className="about-highlight-box">
                    <i className="bi bi-bag-check"></i>
                    <span>Easy Shopping</span>
                  </div>
                  
                  <div className="about-highlight-box">
                    <i className="bi bi-heart-pulse"></i>
                    <span>Wellness Focused</span>
                  </div>
                  
                </div>
                
                <div className="about-action-row">
                  <Link to="/products" className="btn about-shop-btn">
                  Explore Products
                  </Link>
                  
                  <Link to="/about" className="btn about-learn-btn">
                  Learn More
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col-lg-5">
              <div className="about-premium-card">
                <div className="about-card-icon">
                  <i className="bi bi-capsule"></i>
                </div>
                
                <h4>
                  Why choose Ayudravya?
                </h4>
                
                <p>
                  A simple, trustworthy, and wellness-focused shopping experience
                  built for modern healthcare needs.
                </p>
                
                <ul className="about-check-list">
                  <li>
                    <span>✓</span>
                    Genuine healthcare and wellness products
                  </li>
                  
                  <li>
                    <span>✓</span>
                    Easy product search and category browsing
                  </li>
                  
                  <li>
                    <span>✓</span>
                    Clear pricing, product details, and pack information
                  </li>
                  
                  <li>
                    <span>✓</span>
                    Smooth cart and checkout experience
                  </li>
                  
                  <li>
                    <span>✓</span>
                    Clean, user-friendly, and reliable platform
                  </li>
                </ul>
                
                <div className="about-card-bottom">
                  <div>
                    <strong>Ayudravya</strong>
                    <small>Healthcare made simple</small>
                  </div>
                  
                  <i className="bi bi-arrow-right-circle"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Prominent Product Display Section */}
      <section className="py-5" style={{ backgroundColor: "#fdfcfb" }}>
        <div className="container py-3">
          <div className="text-center mb-5">
            <span
              className="text-success font-mono text-uppercase fw-semibold tracking-wider small d-block mb-1.5"
              style={{ color: "var(--primary-color)" }}
            >
              Core Formulary
            </span>
            <h2 className="fw-bold display-font text-dark mb-2">
              Our Signature Clinical Products
            </h2>
            <p
              className="text-muted small mx-auto"
              style={{ maxWidth: "420px" }}
            >
              We formulate elite targeted products to focus 100% on pristine
              molecular purity, testing, and clinical efficacy.
            </p>
          </div>

          {loading ? (
            <Loader message="Fetching featured clinical catalog..." />
          ) : (
            <div className="row g-4 justify-content-center">
              {products.map((product) => (
                <div className="col-12 col-md-6" key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/*Customer-reviews*/}

      <section className="customer-reviews-section py-5">
        <div className="container">
          <div className="reviews-wrapper">
            <div className="reviews-heading text-center">
              <span className="reviews-label">
                Customer Reviews
              </span>
              
              <h2>
                What Our Customers Say
              </h2>
              
              <p>
                Trusted by customers for genuine healthcare products, easy ordering,
                clear product details, and a smooth wellness shopping experience.
              </p>
            </div>
            
            <div className="row g-4 justify-content-center">
              {CUSTOMER_REVIEWS.map((review) => (
                <div className="col-md-6 col-lg-3" key={review.id}>
                  <article className="review-card h-100">
                    <div className="review-quote">
                      “
                    </div>
                    
                    <div className="review-rating">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <span
                        key={index}
                        className={index < review.rating ? "star-filled" : "star-empty"} style={{color:"#FF9529"}}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    
                    <p className="review-text">
                      “{review.review}”
                    </p>
                    
                    <div className="review-user">
                      <div className="review-avatar">
                        {review.name.charAt(0)}
                      </div>
                      
                      <div>
                        <h6>
                          {review.name}
                        </h6>
                        
                        <small>
                          {review.location}
                        </small>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Clinical Certifications */}
      <section className="py-5 bg-white border-top border-bottom">
        <div className="container">
          <div className="row align-items-center g-5 text-start">
            <div className="col-12 col-md-6">
              <h3 className="fw-bold display-font text-dark mb-3">
                Our Core Purity Commitment
              </h3>
              <p className="text-secondary lh-lg small mb-3">
                Ayudravya was founded with a single mission: to
                eliminate the marketing noise surrounding supplements and
                deliver absolute clinical precision.
              </p>
              <p className="text-secondary lh-lg small mb-4">
                We manufacture under strict cGMP environments, publish detailed
                batch laboratory reports, and verify every doctor prescription
                with our team of clinical staff before fulfillment.
              </p>
              <div className="d-flex align-items-center gap-4 text-dark font-mono small fw-bold">
                <div className="d-flex align-items-center gap-1.5">
                  <ShieldCheck size={18} className="text-success" />
                  <span>100% Bioavailable</span>
                </div>
                <div className="d-flex align-items-center gap-1.5">
                  <HeartPulse size={18} className="text-success" />
                  <span>Clinician Recommended</span>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div
                className="card border-0 bg-light p-4 rounded-4"
                style={{
                  borderLeft: "4px solid var(--primary-color) !important",
                }}
              >
                <FileText
                  className="text-success mb-3"
                  size={32}
                  style={{ color: "var(--primary-color)" }}
                />
                <h4 className="h5 fw-bold text-dark display-font mb-2">
                  Prescription Dispatch Notice
                </h4>
                <p className="text-muted small lh-lg mb-0">
                  Sleep-induction formulas containing pharmaceutical GABA,
                  5-HTP, and melatonin are heavily regulated. To ensure patient
                  safety, SomnusRest softgel orders will remain on hold until a
                  registered doctor's prescription is uploaded and reviewed by
                  our clinical panel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


