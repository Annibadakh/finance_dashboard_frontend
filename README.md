# 📊 PayFlow - Finance Management Dashboard

A modern, responsive, and feature-rich Fintech web application built with **React** and **Tailwind CSS**. This project serves as a comprehensive frontend architecture demonstration, featuring role-based access control, advanced data visualization, global state management, and reusable generic components.

Because this project focuses purely on frontend engineering, it utilizes a sophisticated **Context-based pseudo-backend** to simulate a single source of truth, API delays, and CRUD operations without needing a real server.

---

## 🚀 Key Functionalities

- **🔐 Authentication & Role-Based Access Control (RBAC):**
  - **Admin:** Full access to Create, Edit, and Delete transactions.
  - **Viewer:** Read-only access to lists and charts. Protected routes and hidden UI elements prevent unauthorized actions.
- **📈 Dashboard Overview:** Summary cards (Total Balance, Income, Expenses) with dynamic Recharts (Area/Donut) tracking cashflow and spending breakdowns.
- **📊 Advanced Analytics:** Deep dive reports with custom Start Date, End Date, and Category filters updating Comparison Bar Charts and Cumulative Balance Line Charts in real-time.
- **💳 Transaction Management:** View, sort, filter, and search transactions. CRUD operations are handled seamlessly via a sleek sliding Drawer interface.
- **🌗 Dark Mode:** Fully persistent dark/light theme utilizing Tailwind's `class` strategy and `localStorage`.

---

## 🛠 Tech Stack

- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS (with custom keyframe animations)
- **Routing:** React Router DOM v6
- **State Management:** React Context API & Custom Hooks
- **Data Visualization:** Recharts
- **Form Validation:** Yup
- **Date Manipulation:** date-fns
- **Icons:** React Icons (Feather & Remix icons)

---

## 📂 Directory Structure

A modular, feature-first directory architecture is used to ensure high scalability:

```text
src/
├── api/
│   └── apiHandler.js                 # Wrapper for mock API calls & delay simulation
│
├── components/                       # 🧩 Reusable UI Components
│   ├── Button.jsx
│   ├── Drawer.jsx
│   ├── LabelInput.jsx
│   ├── SelectField.jsx
│   ├── DatePickerField.jsx
│   ├── Loader.jsx
│   ├── Pagination.jsx
│   └── Table.jsx
│
├── context/                          # 🧠 Global State Management
│   ├── AuthContext.jsx
│   ├── ThemeContext.jsx
│   └── TransactionContext.jsx
│
├── routes/
│   └── AppRoutes.jsx                 # Centralized routing config
│
├── service/                          # 🌐 Global Services
│   ├── authService.js                # Logout / auth helpers
│   └── navigationService.js          # Programmatic navigation
│
├── pages/                            # 📄 Feature Modules
│   ├── analytics/
│   │   ├── components/
│   │   │   ├── BalanceChart.jsx
│   │   │   └── ComparisonChart.jsx
│   │   ├── analytics.service.js
│   │   ├── useAnalytics.jsx
│   │   └── View.jsx
│   │
│   ├── auth/
│   │   ├── Login.jsx
│   │   ├── login.service.js
│   │   └── useLogin.js
│   │
│   ├── dashboard/
│   │   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── dashboard.service.js
│   │   ├── useDashboard.jsx
│   │   └── index.jsx
│   │
│   ├── transaction/
│   │   ├── Create.jsx
│   │   ├── Edit.jsx
│   │   ├── List.jsx
│   │   ├── index.jsx
│   │   └── transaction.service.js
│   │
│   ├── layout/
│   │   ├── AppLayout.jsx
│   │   ├── Header.jsx
│   │   └── Sidebar.jsx
│   │
│   └── NotFound.jsx
```

---

## 🧠 Core Architectural Concepts

### 1. The Single Source of Truth (Transaction Context)

Since there is no real backend, all modules (`dashboard`, `analytics`, `transactions`) read from a single **Transaction Context**. When a user adds a transaction via the Drawer, the global state updates. Navigating back to the Dashboard or Analytics page instantly reflects the new data on the charts without page reloads.

### 2. API Handler (`apiHandler.js`)

A Higher-Order Function that wraps our simulated service calls. It standardizes the response format (`{ status, data: { message, data } }`), simulates network latency (`setTimeout`), and catches mocked HTTP 400/500 errors to ensure the frontend logic precisely mirrors real-world Axios integrations.

### 3. Promise-Based Delete Modal (`ConfirmModalContext`)

Instead of duplicating `isOpen` states across multiple pages, the delete confirmation is globalized. Any component can simply call:

```javascript
const isConfirmed = await confirm({ title: "Delete?", desc: "Are you sure?" });
if (isConfirmed) handleDelete();
```

### 4. Custom Hooks (`useCreate`, `useTransactions`, `useAnalytics`)

UI components are kept clean by extracting all business logic, form handling, and data fetching into custom hooks. The component only renders JSX, while the hook manages `loading`, `error`, and `data` states.

---

## 🧩 Generic Components

To ensure UI consistency, all forms and lists use highly flexible generic components:

- **`Table`**: Accepts a `columns` array. Supports accessors, boolean `sortable` flags, and custom `render: (row) => <JSX />` functions.
- **`Drawer`**: Overlays the main layout and locks background scrolling. Allows users to view/edit transactions without losing their place in the list or paginated table.
- **`Pagination`**: Automatically calculates ellipsis `...` for large datasets (e.g., `1 2 ... 5 6 7 ... 10`).
- **Inputs**: Custom wrappers around standard inputs, `react-select`, and `react-datepicker` to ensure unified error states, focus rings, and dark mode compatibility.

---

## 🛡 Validations & UX Enhancements

- **Yup Validation**: Used in conjunction with form submission to ensure data integrity (e.g., positive amounts, required fields, valid email structures) before reaching the pseudo-backend.
- **Toast Notifications**: Provides instant, unobtrusive user feedback (Success/Error messages) upon completing actions like login, creating, or deleting a transaction.
- **Page Not Found (404)**: A beautifully designed fallback route that catches invalid URLs and redirects users safely back to the dashboard.
- **Animations**: Tailwind keyframes are heavily utilized (`animate-fade-in`, `animate-slide-up-fade`) for modal entrances, drawer sliding, and chart loading.

---

## 🏃‍♂️ How to Run Locally

1. **Clone the repository:**

```bash
git clone <repository-url>
cd finance-dashboard
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the development server:**

```bash
npm run dev
```

4. **Login Credentials:**
   _(Use the mock credentials defined in your `login.service.js` to access the Admin vs Viewer roles)_

- **Admin:** `admin@payflow.com` / `password123`
- **Viewer:** `viewer@payflow.com` / `password123`

---

_Designed and engineered by @Annibadakh with modern React patterns for optimal performance and maintainability._
