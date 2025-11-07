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

Nexora-Assignment/
├── backend/
│   ├── server.js                  # Express server entry point
│   ├── routes/                    # API route definitions
│   │   ├── products.js            # Handles product listing endpoints
│   │   ├── cart.js                # Handles cart CRUD operations
│   │   └── checkout.js            # Handles checkout and order endpoints
│   ├── controllers/               # Business logic for each route
│   │   ├── product.controller.js
│   │   ├── cart.controller.js
│   │   └── checkout.controller.js
│   ├── data/                      # Mock in-memory data
│   │   ├── products.js
│   │   ├── cartStore.js
│   │   └── ordersStore.js
│   ├── utils/                     # Helper functions (formatting, etc.)
│   └── package.json               # Backend dependencies and scripts
│
└── frontend/
    ├── index.html                 # Entry HTML file
    ├── vite.config.js             # Vite configuration
    └── src/
        ├── App.jsx                # Root application component
        ├── main.jsx               # React app bootstrap
        ├── components/            # Reusable UI and logic components
        │   ├── Navbar.jsx
        │   ├── products/
        │   │   ├── ProductCard.jsx
        │   │   └── ProductGrid.jsx
        │   ├── cart/
        │   │   └── CartItem.jsx
        │   └── ui/                # Buttons, modals, inputs, etc.
        ├── context/               # React context providers
        │   └── CartContext.jsx
        ├── hooks/                 # Custom hooks
        │   └── useCartContext.js
        ├── pages/                 # App pages and routes
        │   ├── Home.jsx
        │   ├── Cart.jsx
        │   └── Checkout.jsx
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

