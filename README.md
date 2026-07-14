# Ayudravya

Ayudravya is a modern React.js ecommerce frontend project for men’s wellness and weight loss products. The project is built using React + Vite and focuses on a clean, premium, responsive user interface.

This project is frontend-only. It does not include backend, database, API server, payment verification, or server-side logic.

## Project Overview

Ayudravya is designed as a premium ecommerce website where users can browse wellness products, view product details, add products to cart, and experience a clean shopping interface.

The current frontend includes pages and components such as:

* Home page
* Product listing page
* Product detail page
* Login page UI
* Product slider/carousel
* Navbar
* Banner sections
* Product cards
* Responsive layouts

## Tech Stack

* React.js
* Vite
* JavaScript
* HTML5
* CSS3
* Bootstrap
* Swiper.js
* React Router DOM

## Features

* Modern responsive UI
* Premium product sections
* Product image slider using Swiper.js
* Product detail page
* Login page UI
* Navbar with dropdown support
* Dummy product data support
* Clean folder structure
* Mobile-friendly design

## Project Setup

### 1. Clone or open the project

```bash
cd ayudravya
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

The project will usually run at:

```bash
http://localhost:3000
```

## Required Packages

Install these packages if they are not already installed:

```bash
npm install react-router-dom bootstrap swiper
```

## Bootstrap Setup

In `src/main.jsx`, make sure Bootstrap is imported:

```jsx
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
```

## Swiper Setup

For carousel or product slider components, import Swiper CSS and modules like this:

```jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
```

## Suggested Folder Structure

```text
src/
  assets/
  components/
    Navbar.jsx
    Banner.jsx
    Carousel.jsx
    Sectiontwo.jsx
    Sectionthree.jsx
  data/
    index.js
  pages/
    Home.jsx
    Product.jsx
    ProductDetail.jsx
    Login.jsx
  styles/
  App.jsx
  main.jsx
```

## Dummy Product Data Example

```js
const products = [
  {
    id: 1,
    name: "Apex Hair Support",
    image: "/images/apex-hair.png",
  },
  {
    id: 2,
    name: "Aura Daily Wellness",
    image: "/images/auradaily.png",
  },
  {
    id: 3,
    name: "Fortify Beard Support",
    image: "/images/fortify-beard.png",
  },
  {
    id: 4,
    name: "Somnus Rest Support",
    image: "/images/somnusrest.png",
  },
  {
    id: 5,
    name: "Lean Fit Weight Support",
    image: "/images/weightloss.png",
  },
];

export default products;
```

## Image Location

Place product images inside the `public/images` folder:

```text
public/
  images/
    apex-hair.png
    auradaily.png
    fortify-beard.png
    somnusrest.png
    weightloss.png
```

Then use images like this:

```jsx
<img src="/images/auradaily.png" alt="Aura Daily Wellness" />
```

## Available Scripts

### Start development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Important Notes

This project is strictly frontend-only.

Do not add or modify:

* Backend files
* Database files
* API endpoints
* Server logic
* Payment verification logic
* Database migrations
* Authentication backend logic

All backend/API integration can be added later through a separate service layer.

## Wellness Disclaimer

Products shown in this project are for frontend demonstration purposes only.

These products are not intended to diagnose, treat, cure, or prevent any disease. Results may vary. Consult a healthcare professional before use.

## Project Status

Current status: Frontend development in progress.

Planned frontend improvements:

* Cart UI
* Checkout UI
* Account page
* Order page UI
* Product filtering
* Product search
* API integration through frontend services
* Better responsive testing

## Author

Ayudravya Frontend Project
