# 🏢 Mini ERP — Inventory & Sales Management System

একটি সম্পূর্ণ Full-Stack ERP সিস্টেম যা ছোট ও মাঝারি ব্যবসার জন্য তৈরি। এই সিস্টেমে পণ্য ব্যবস্থাপনা, গ্রাহক তথ্য সংরক্ষণ, বিক্রয় ব্যবস্থাপনা এবং ইনভয়েস তৈরির সুবিধা রয়েছে।

---

## 🖥️ Tech Stack

### Frontend
| Technology | Version |
|---|---|
| Next.js | 16.x (App Router) |
| React | 19.x |
| Axios | Latest |
| Lucide React | (Icons) |
| SweetAlert2 | (Alerts) |
| CSS (Vanilla) | — |

### Backend
| Technology | Version |
|---|---|
| Node.js | v22.x |
| TypeScript | 6.x |
| Express.js | 4.x |
| Mongoose | Latest |
| MongoDB Atlas | Cloud |
| JWT | Auth |
| Multer | File Upload |
| ts-node-dev | Dev Server |

---

## 📁 Project Structure

এই প্রজেক্টে দুটি আলাদা রিপোজিটরি আছে:

```
Mini-ERP/
├── Mini-ERP-Inventory-Sales-Management-System/       # Frontend (Next.js)
└── Mini-ERP-Inventory-Sales-Management-System-server/ # Backend (Express + TypeScript)
```

### Frontend Structure
```
src/
├── app/
│   ├── page.js                    # Login Page
│   └── dashboard/
│       ├── layout.js              # Dashboard Layout (Auth Guard)
│       ├── page.js                # Dashboard Overview
│       ├── products/              # Products Module
│       │   ├── page.js            # Product List
│       │   ├── add/page.js        # Add Product
│       │   └── edit/[id]/page.js  # Edit Product
│       ├── customers/             # Customers Module
│       │   ├── page.js            # Customer List
│       │   ├── add/page.js        # Add Customer
│       │   └── edit/[id]/page.js  # Edit Customer
│       ├── sales/page.js          # Create Sale
│       └── sales-history/         # Sales History
│           ├── page.js            # Sales List
│           └── [id]/page.js       # Invoice Details
├── components/
│   ├── layout/
│   │   ├── Sidebar.js             # Role-based Sidebar
│   │   └── Header.js              # Header with User Info
│   ├── dashboard/
│   │   ├── StatCard.js            # Stats Card
│   │   ├── SalesChart.js          # Sales Chart
│   │   ├── LowStockTable.js       # Low Stock Widget
│   │   └── RecentSalesTable.js    # Recent Sales Widget
│   └── RoleGuard.js               # Role-based Route Protection
├── context/
│   └── AuthContext.js             # Global Auth State
└── lib/
    └── api.js                     # Axios Instance + Interceptors
```

### Backend Structure
```
src/
├── app.ts                         # Express App Setup
├── server.ts                      # Entry Point
├── middlewares/
│   ├── auth.ts                    # JWT Auth Middleware
│   └── upload.ts                  # Multer File Upload
└── modules/
    ├── auth/                      # Auth Module
    ├── products/                  # Products Module
    ├── customers/                 # Customers Module
    ├── sales/                     # Sales Module
    └── dashboard/                 # Dashboard Stats Module
```

---

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based Login System
- Role-based Access Control (RBAC)
- Token auto-expire and redirect on `401`

### 👥 User Roles
| Module | Admin | Manager | Employee |
|--------|-------|---------|----------|
| Dashboard | ✅ | ✅ | ✅ |
| Products (দেখা) | ✅ | ✅ | ✅ |
| Product Add/Edit/Delete | ✅ | ✅ | ❌ |
| Customers | ✅ | ✅ | ❌ |
| Create Sale | ✅ | ✅ | ✅ |
| Sales History | ✅ | ✅ | ✅ |

### 📦 Products Module
- পণ্য তালিকা (Search + Pagination)
- পণ্য যোগ করুন (Image Upload সহ)
- পণ্য সম্পাদনা করুন
- পণ্য মুছুন (Confirm Dialog)
- Low Stock Status দেখুন

### 👤 Customers Module
- গ্রাহক তালিকা (Search + Pagination)
- গ্রাহক যোগ করুন
- গ্রাহক তথ্য সম্পাদনা করুন
- গ্রাহক মুছুন

### 🛒 Sales Module
- একাধিক পণ্য সহ বিক্রয় তৈরি করুন
- Automatic Stock Deduction
- Walk-in বা নির্দিষ্ট গ্রাহক নির্বাচন
- Grand Total Auto-calculation
- Auto Invoice Number Generation (INV-001, INV-002...)

### 🧾 Invoice / Sale Details
- Professional Invoice Layout
- Print Invoice সুবিধা
- Customer Details, Item List, Grand Total

### 📊 Dashboard
- Total Products, Customers, Sales Count এবং Revenue
- Last 7 Days Sales Chart
- Low Stock Products সতর্কতা
- Recent Sales টেবিল

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas Account

---

### 1. Backend Setup

```bash
# Repository clone করুন
cd Mini-ERP-Inventory-Sales-Management-System-server

# Dependencies install করুন
npm install

# .env ফাইল তৈরি করুন
```

`.env` ফাইলে নিচের তথ্য দিন:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/minierp?appName=Cluster0
JWT_SECRET=your_jwt_secret_here
```

```bash
# Database Seed (Default Users তৈরি করুন)
npx ts-node seed.ts

# Backend চালু করুন
npm run dev
```

Backend চলবে: `http://localhost:5000`

---

### 2. Frontend Setup

```bash
# Repository clone করুন
cd Mini-ERP-Inventory-Sales-Management-System

# Dependencies install করুন
npm install

# .env.local ফাইল তৈরি করুন
```

`.env.local` ফাইলে নিচের তথ্য দিন:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

```bash
# Frontend চালু করুন
npm run dev
```

Frontend চলবে: `http://localhost:3000`

---

## 🔑 Default Login Credentials

Seed script চালানোর পরে নিচের অ্যাকাউন্টগুলো ব্যবহার করুন:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@minierp.com | 123456 |
| Manager | manager@minierp.com | 123456 |
| Employee | employee@minierp.com | 123456 |

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User Login |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | সব পণ্য দেখুন |
| POST | `/api/products` | নতুন পণ্য যোগ করুন |
| PATCH | `/api/products/:id` | পণ্য আপডেট করুন |
| DELETE | `/api/products/:id` | পণ্য মুছুন |

### Customers
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/customers` | সব গ্রাহক দেখুন |
| POST | `/api/customers` | নতুন গ্রাহক যোগ করুন |
| PATCH | `/api/customers/:id` | গ্রাহক আপডেট করুন |
| DELETE | `/api/customers/:id` | গ্রাহক মুছুন |

### Sales
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/sales` | সব বিক্রয় দেখুন |
| POST | `/api/sales` | নতুন বিক্রয় তৈরি করুন |
| GET | `/api/sales/:id` | নির্দিষ্ট Invoice দেখুন |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard` | Dashboard Statistics |

---

## 📸 Screenshots

> Dashboard Overview, Products List, Create Sale, Invoice Page — সব Module সম্পূর্ণ Responsive।

---

## 🛡️ Security

- সব protected route-এ JWT token যাচাই করা হয়
- Role-based middleware দিয়ে unauthorized access ব্লক করা হয়
- Frontend-এ `RoleGuard` component দিয়ে UI-level protection
- Token expire হলে automatically Login পেজে redirect

---

## 📄 License

This project is for educational purposes.

---

**Developed with ❤️ using Next.js & Express.js**
