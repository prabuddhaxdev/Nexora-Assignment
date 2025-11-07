# 🛒 Mock E-Com Cart — Vibe Commerce (Nexora Assignment)

> A lightweight full-stack mock e-commerce shopping cart built with **React + Vite + Shadcn UI** (frontend) and **Node + Express + MongoDB** (backend).
Implements a simple flow: **product listing → add/remove items → checkout → receipt → dashboard**.

---


## ✨ Features
- 🛍️ **Products Grid** – View and add mock items to your cart
- 🧺 **Cart Management** – Update quantities, remove items, auto-calculate totals
- 💳 **Mock Checkout** – Enter name/email → instantly receive a receipt
- 🧾 **Order Dashboard** – View recent mock orders and totals
- 💾 **LocalStorage Persistence** – Cart data saved across sessions
- 🪶 **Modern UI** – Minimal, responsive design using Shadcn UI + Tailwind

---

## 🧠 Tech Stack

### Frontend
- React + Vite
- React Router DOM
- Shadcn/UI + Tailwind CSS
- Context API (for global cart state)

### Backend
- Node.js + Express
- MongoDB
- RESTful API endpoints

---

## 📂 Repository Structure

Nexora-Assignment/
├── server/
│ ├── server.js
│ ├── routes/
│ │ ├── products.js
│ │ ├── cart.js
│ │ └── checkout.js
│ ├── controllers/
│ │ ├── product.controller.js
│ │ ├── cart.controller.js
│ │ └── checkout.controller.js
│ ├── data/
│ │ ├── products.js
│ │ ├── cartStore.js
│ │ └── ordersStore.js
│ ├── utils/
│ └── package.json
|
|
└── client/
├── index.html
├── vite.config.js
└── src/
├── App.jsx
├── main.jsx
├── components/
│ ├── Navbar.jsx
│ ├── products/
│ │ ├── ProductGrid.jsx
│ │ └── ProductCard.jsx
│ ├── cart/
│ │ └── CartItem.jsx
│ └── ui/
├── context/
│ └── CartContext.jsx
├── hooks/
│ └── useCartContext.js
├── pages/
│ ├── Home.jsx
│ ├── Cart.jsx
│ └── Checkout.jsx
└── styles/


Copy code

---

## ⚙️ API Endpoints

**Base URL:** `http://localhost:5000/api`

|     Method | Endpoint    | Description                             |
| ---------: | ----------- | --------------------------------------- |
|    **GET** | `/products` | Fetch all mock products                 |
|    **GET** | `/cart`     | Get all cart items                      |
|   **POST** | `/cart`     | Add item to cart                        |
| **DELETE** | `/cart/:id` | Remove item from cart                   |
|   **POST** | `/checkout` | Perform mock checkout → returns receipt |
|    **GET** | `/orders`   | Retrieve mock past orders               |

---
