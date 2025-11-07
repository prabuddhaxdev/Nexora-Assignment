🛒 Mock E-Com Cart

Full-Stack Coding Assignment — Vibe Commerce Internship

A lightweight e-commerce shopping cart built with React + Vite + Shadcn UI (frontend) and Node + Express + MongoDB/SQLite (backend).
Implements a simple cart flow: product listing → add/remove items → checkout → receipt → dashboard.

✨ Features

🛍️ Products Grid – View and add mock items to your cart

🧺 Cart Management – Update, remove items & auto-calculate totals

💳 Mock Checkout – Enter name/email → receive receipt instantly

🧾 Order Dashboard – View recent mock orders and totals

💾 LocalStorage Persistence – Cart state saved across sessions

🪶 Modern UI – Minimal, responsive interface with Shadcn components

🧠 Tech Stack
Frontend

React + Vite

React Router DOM

Shadcn/UI + Tailwind CSS

Context API (for global cart state)

Backend

Node.js + Express

MongoDB

RESTful APIs

📁 Folder Structure
mock-ecom-cart/
├── backend/
│   ├── server.js
│   ├── routes/
│   │   ├── products.js
│   │   ├── cart.js
│   │   └── checkout.js
│   ├── models/
│   └── db/
│
└── frontend/
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── components/
        │   ├── Navbar.jsx
        │   ├── products/ProductCard.jsx
        │   ├── products/ProductGrid.jsx
        │   ├── cart/CartItem.jsx
        │   └── ui/
        ├── context/CartContext.jsx
        ├── hooks/useCartContext.js
        ├── pages/
        │   ├── Home.jsx
        │   ├── Cart.jsx
        │   ├── Checkout.jsx
        │
        └── styles/

⚙️ API Endpoints
Method	Endpoint	Description
GET	/api/products	Fetch all products
GET	/api/cart	Get all cart items
POST	/api/cart	Add item to cart
DELETE	/api/cart/:id	Remove item from cart
POST	/api/checkout	Mock checkout → returns receipt
GET	/api/orders	Retrieve mock past orders

🚀 Getting Started
1️⃣ Clone the repository
git clone https://github.com/prabuddhaxdev/Nexora-Assignment.git
cd Nexora-Assignment

2️⃣ Install dependencies
# Backend
cd server
npm install

# Frontend
cd client
npm install

3️⃣ Run the backend
npm run dev

4️⃣ Run the frontend
npm run dev


Frontend runs on http://localhost:5173

Backend runs on http://localhost:5000

