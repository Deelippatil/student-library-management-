# Student Library Management System (SLMS)

A complete, high-contrast, production-grade academic library management application built with **Node.js/Express + SQLite** on the backend and **React 18 + Vite** on the frontend, designed in a distraction-free **Modern Black & White** aesthetic.

---

## 🏛 System Architecture & User Roles

The system strictly enforces two user roles with dedicated interfaces and route guards:

1. **Student**
   - **Dashboard**: High-level overview of active borrowings, overdue books, and next scheduled due dates.
   - **Catalog Search**: Real-time debounced keyword search with availability status badges.
   - **Issued Books**: Inspect currently held books and return deadlines.
   - **Reading History**: Audit trail of all completed borrowings and return timestamps.

2. **Librarian**
   - **Administrative Console**: Live statistics on inventory titles, physical copies, circulating loans, and student registrations.
   - **Catalog Management (CRUD)**: Register new book titles, update copy allocations, and safe deletion (protected by safe deletion invariants).
   - **Student Directory**: Search and inspect individual student borrowing standings and profiles.
   - **Circulation Management**: Issue books and process returns at the circulation desk.
   - **Master Circulation Logs**: Searchable and filterable history of all transactions across the institution.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18.x or higher)
- **npm** (v9.x or higher)

### 2. Start the Backend API Server
Open a terminal in the project root:
```bash
cd backend
npm start
```
The backend will automatically initialize the SQLite database at `backend/data/library.db`, seed initial records, and listen on **http://localhost:5000**.

> **Health Check**: Visit `http://localhost:5000/api/health` to confirm the backend is running.

### 3. Start the Frontend React Application
Open a second terminal in the project root:
```bash
cd frontend
npm run dev
```
The Vite development server will start on **http://localhost:3000** (or the port specified in terminal output).

---

## 🔑 Pre-Seeded Test Credentials

For quick evaluation, click the **Demo Student** or **Demo Librarian** buttons on the sign-in screen, or enter the credentials manually:

| Role | Email | Password | Identifier / Notes |
| :--- | :--- | :--- | :--- |
| **Librarian** | `librarian@library.com` | `Librarian@123` | System Administrator / Desk Manager |
| **Student** | `student@university.edu` | `Student@123` | Student ID: `STU1001` (Alex Morgan) |

*You can also register new student accounts freely using the **Register** page.*

---

## 🧪 Backend Automated Test Suite

To run the automated verification suite covering all 11 backend invariants (duplicate loan prevention, stock decrement/increment, safe deletion checks):
```bash
cd backend
node test_api.js
```

---

## 📁 Project Structure

```
Student Library Management/
├── backend/
│   ├── data/
│   │   └── library.db                # SQLite database file
│   ├── src/
│   │   ├── config/database.js        # SQLite connection pool & table setup
│   │   ├── controllers/              # Auth, Book, Circulation, Student, Librarian controllers
│   │   ├── middleware/               # JWT authentication, role guards, validation, errors
│   │   ├── routes/                   # REST API routes
│   │   ├── services/                 # Core business logic & database queries
│   │   ├── utils/                    # Password hashing, JWT tokens, sample data seed
│   │   └── server.js                 # Express application entry point
│   ├── test_api.js                   # 11-test automated verification script
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/common/        # Button, Input, Card, Table, Modal, Badges, Alert
│   │   ├── context/AuthContext.jsx   # Global session state & token persistence
│   │   ├── pages/                    # Auth, Student, Librarian, and Shared pages
│   │   ├── routes/                   # App routes & ProtectedRoute role guards
│   │   ├── services/api/             # Fetch client & domain API wrappers
│   │   ├── styles/                   # Modern Black & White CSS design tokens & reset
│   │   ├── utils/                    # Date formatters & input validators
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js                # Vite config with backend proxy
│   └── package.json
│
├── BACKEND_IMPLEMENTATION_PLAN.md
├── FRONTEND_IMPLEMENTATION_PLAN.md
├── BUSINESS_REQUIREMENTS_DOCUMENT.md
├── FUNCTIONAL_REQUIREMENTS_DOCUMENT.md
├── PRODUCT_REQUIREMENTS_DOCUMENT.md
├── TECHNICAL_REQUIREMENTS_DOCUMENT.md
├── SRD_DOCUMENT.md
└── README.md
```

