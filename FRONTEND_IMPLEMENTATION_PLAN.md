# FRONTEND IMPLEMENTATION PLAN
## Student Library Management System (SLMS)

---

## 1. Document Control

### 1.1 Document Information
| Field | Details |
| :--- | :--- |
| **Document Name** | Frontend Phase-by-Phase Implementation Plan |
| **Project Name** | Student Library Management System (SLMS) |
| **Document Version** | 1.0 (Baseline Architecture Plan) |
| **Date** | October 4, 2026 |
| **Document Status** | Approved Frontend Implementation Blueprint |
| **Source Documents** | `BUSINESS_REQUIREMENTS_DOCUMENT.md` (v1.0), `FUNCTIONAL_REQUIREMENTS_DOCUMENT.md` (v1.2), `PRODUCT_REQUIREMENTS_DOCUMENT.md` (v1.0), `TECHNICAL_REQUIREMENTS_DOCUMENT.md` (v1.0), `SRD_DOCUMENT.md` (v1.0), `BACKEND_IMPLEMENTATION_PLAN.md` (v1.0) |
| **Author / Role** | Senior Frontend Architect & Technical Project Manager |
| **Target Audience** | Frontend Developers, UI/UX Designers, QA Test Engineers, Academic Project Evaluators |

### 1.2 Revision History
| Version | Date | Author | Description of Change | Status |
| :--- | :--- | :--- | :--- | :--- |
| 1.0 | 2026-10-04 | Senior Frontend Architect | Initial complete release of the 13-phase frontend implementation plan, strictly aligned with approved BRD, FRD, PRD, TRD, SRD, and Backend Plan. Enforces React SPA architecture and Black & White theme for two roles (Student and Librarian). | Approved Baseline |

### 1.3 Baseline Compliance
This plan derives strictly from the approved project documents. It specifies the step-by-step technical construction of the React frontend application without introducing unapproved features, numerical business rules (such as loan periods or borrowing limits), procedural assumptions (such as counter verification), or extra user roles. Exactly two user roles are supported: **Student** and **Librarian**.

---

## 2. Frontend Implementation Overview

### 2.1 Frontend Purpose
The frontend of the Student Library Management System serves as the interactive presentation layer for students and librarians. It is responsible for rendering user interfaces, capturing input, managing client-side navigation and session state, performing initial input validation, dispatching asynchronous requests to backend REST APIs, and presenting real-time feedback within a distraction-free Modern Black & White aesthetic.

### 2.2 Technology Stack
* **Core Framework**: React (v18.x).
* **Language**: JavaScript (ES6+).
* **Routing**: React Router (v6.x) for declarative client-side routing and protected route wrappers.
* **Styling**: CSS3 with modern custom properties (CSS variables) implementing a strict Black & White high-contrast design system.
* **HTTP Client**: Axios (or browser-native Fetch API) configured with base URLs and request/response interceptors.
* **State Management**: React Context API (`AuthContext`) combined with standard React hooks (`useState`, `useEffect`, `useCallback`, `useMemo`).
* **Build Tooling**: Vite or Create React App (npm scripts).

### 2.3 Frontend Responsibilities
1. **Presentation & Layout**: Rendering intuitive, responsive views tailored specifically to Student and Librarian workflows.
2. **Session & Identity Management**: Managing client-side authentication tokens, persisting session state, and executing secure logout.
3. **Client-Side Authorization**: Enforcing view-level route guarding to prevent unauthorized role access.
4. **Catalog Discovery**: Providing a real-time keyword search interface with dynamic availability pill rendering.
5. **Circulation Interaction**: Facilitating book issue requests and return confirmations with clear feedback alerts.
6. **Form Validation & Guidance**: Providing instantaneous user feedback on mandatory fields, email formatting, and password constraints prior to network transmission.

### 2.4 Relationship with Backend APIs and Database
* **With Backend APIs**: The frontend operates strictly as an API client, sending HTTP requests with JSON payloads and `Authorization: Bearer <token>` headers to Express.js endpoints.
* **With the Database**: The frontend has zero direct connection to MySQL. All data mutations, stock counter updates, and persistent state transitions are mediated exclusively through the backend service layer.

---

## 3. Frontend Architecture Approach

```
+-----------------------------------------------------------------------------------+
|                        FRONTEND COMPONENT ARCHITECTURE                            |
+-----------------------------------------------------------------------------------+

   React Root Application (`App.jsx`)
   ├── Global Context Providers (`AuthContext`, `Theme/AlertContext`)
   └── Browser Router (`react-router-dom`)
            │
            ▼
   Route Switch & Route Guards (`src/routes/`)
   ├── Public Routes (Login, Register, Redirects)
   ├── Protected Student Routes (`ProtectedRoute role="Student"`)
   │   ├── Student Dashboard Page
   │   ├── Catalog Search & Details Page
   │   ├── Currently Issued Books Page
   │   └── Personal Library History Page
   └── Protected Librarian Routes (`ProtectedRoute role="Librarian"`)
       ├── Librarian Dashboard Page
       ├── Catalog Management Page (Add / Edit / Safe Delete)
       ├── Student Directory & Inspection Page
       └── Master Circulation Log Page
            │
            ▼
   Shared Presentation Layer (`src/components/common/`)
   ├── Navigation Bar (Branding, Role Badge, User Info, Logout Action)
   ├── Modal Dialogs (Confirmation, Add Book Form, Details View)
   ├── Data Tables (Responsive Monochrome Tables with Action Columns)
   ├── Status Indicators (High-contrast "Available" vs "Out of Stock" Badges)
   └── UI Feedback (Loading Skeletons, Error Banners, Success Toasts)
            │
            ▼
   API Communication Layer (`src/services/api/`)
   ├── Axios HTTP Client Instance (Base URL, Interceptors)
   ├── Auth Service (`register`, `loginStudent`, `loginLibrarian`)
   ├── Book Service (`searchBooks`, `getBookDetails`, `addBook`, `editBook`, `deleteBook`)
   ├── Student Service (`getDashboard`, `getIssuedBooks`, `getHistory`, `getStudentList`)
   └── Circulation Service (`issueBook`, `returnBook`, `getCirculationLogs`)
```

### 3.1 Architecture Components
* **UI Layer**: Functional React components utilizing modern CSS Grid/Flexbox layouts with zero external heavy UI framework bloat.
* **State Management**: Centralized `AuthContext` provides global access to user session details (`user`, `token`, `role`, `isAuthenticated`, `login`, `logout`). Page-level state is maintained locally using standard hooks.
* **API Communication Layer**: Centralized API module wraps all HTTP requests, attaches bearer tokens automatically, and normalizes backend JSON response envelopes (`{ success, data, error }`).
* **Route Guarding**: Higher-Order Component (`ProtectedRoute`) inspects token validity and role membership before rendering private views.
* **Reusable Component Library**: Independent, highly reusable UI primitives (Buttons, Inputs, Cards, Tables, Modals, Badges) ensuring uniform Black & White styling.

---

## 4. Frontend Development Phases

The frontend development lifecycle is organized into 13 structured, sequential phases:

```
+-----------------------------------------------------------------------------------+
|                       13-PHASE FRONTEND IMPLEMENTATION PLAN                       |
+-----------------------------------------------------------------------------------+
|  Phase 1: Project Initialization   ──> React SPA setup, routing, dev scripts      |
|  Phase 2: Global UI & Design System──> Black & White CSS system & UI primitives   |
|  Phase 3: Authentication UI        ──> Login, Registration, Auth Context, Guards  |
|  Phase 4: Student Interface        ──> Student dashboard, active loans, history   |
|  Phase 5: Librarian Interface      ──> Librarian dashboard, student records       |
|  Phase 6: Book Management UI       ──> Catalog search, Add, Edit, Safe Delete UI  |
|  Phase 7: Library Transaction UI   ──> Issue & Return interaction modals & alerts |
|  Phase 8: API Integration Layer    ──> Axios service layer & HTTP interceptors    |
|  Phase 9: Validation & Errors      ──> Form validations, empty states, error UI   |
|  Phase 10: Responsive Design       ──> Desktop, laptop, tablet, mobile adapt     |
|  Phase 11: Testing Preparation     ──> Component, form, auth & integration tests  |
|  Phase 12: End-to-End Integration  ──> Full integration with Express backend APIs |
|  Phase 13: Completion & Review     ──> WCAG AA audit, DoD sign-off, readiness    |
+-----------------------------------------------------------------------------------+
```

---

### Phase 1 — Frontend Project Initialization

* **Objective**: Initialize the React application, establish project directory conventions, configure routing dependencies, and run a baseline development server.
* **Step 1.1**: Initialize React Single Page Application (`package.json`) using standard build tooling (Vite or Create React App) with React 18+.
* **Step 1.2**: Install required production dependencies:
  * `react-router-dom`: Client-side routing.
  * `axios`: Promise-based HTTP client for API communication.
* **Step 1.3**: Configure application entry point:
  * `index.html`: Set page title to *"Student Library Management System"* and configure viewport meta tags.
  * `src/index.js` (or `main.jsx`): Mount React root into `#root` DOM container with `React.StrictMode`.
  * `src/App.jsx`: Base component housing BrowserRouter and global context providers.
* **Step 1.4**: Define npm scripts in `package.json`:
  * `"start"` / `"dev"`: Runs local dev server on `http://localhost:3000`.
  * `"build"`: Compiles optimized static assets to `/dist` or `/build`.
* **Deliverable**: Running React development server rendering a baseline verification screen.

---

### Phase 2 — Global UI and Design System

* **Objective**: Construct the comprehensive Modern Black & White CSS design system and shared UI primitives.
* **Step 2.1 (Monochrome Color Variables)**: Define root CSS custom properties in `src/styles/variables.css`:
  * `--color-black`: `#000000` (deep black for headings, primary buttons, accents).
  * `--color-charcoal`: `#1A1A1A` (dark text, high contrast headers).
  * `--color-white`: `#FFFFFF` (pure white background, card surfaces, inverted text).
  * `--color-offwhite`: `#F8F9FA` (subtle light gray for page backgrounds and zebra striping).
  * `--color-gray-light`: `#EEEEEE` (borders, dividers, inactive states).
  * `--color-gray-medium`: `#767676` (secondary metadata text, disabled states).
  * `--font-family`: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`.
* **Step 2.2 (Typography & Base Styles)**: Establish clean typographic scale (`h1` through `h4`, body text, captions) in `src/styles/typography.css`.
* **Step 2.3 (Reusable UI Primitives)**:
  * `Button`: Primary (solid black with white text), Secondary (white with black border), Danger/Delete (bordered with distinct text).
  * `Input`: High-contrast borders, clear focus rings, label and inline error text support.
  * `Card`: Clean white surface with subtle monochrome border and structured padding.
  * `Table`: Structured table with bold headers, light border dividers, and action column formatting.
  * `Badge / Pill`: Solid black pill with white text (**"Available"**) vs. bordered pill with muted text (**"Out of Stock"**).
  * `Modal`: Centered overlay dialog with backdrop dimmer, title header, body viewport, and action buttons.
  * `Alert / Banner`: Full-width or inline feedback boxes for success, warning, and error messages.
  * `Loading Spinner / Skeleton`: Monochrome pulsing skeletons for table rows and metric cards.
* **Deliverable**: Reusable component catalog rendering clean Black & White primitives.

---

### Phase 3 — Authentication UI

* **Objective**: Build registration and login screens, establish Auth Context, and implement route protection.
* **Step 3.1 (Auth Context & State)**:
  * Create `src/context/AuthContext.jsx`.
  * Manage state: `user`, `token`, `role`, `loading`.
  * Expose helper functions: `login(token, user)`, `logout()`.
  * Persist token in browser storage (`localStorage`) and restore on page refresh.
* **Step 3.2 (Student Registration View)**:
  * Route: `/register`.
  * Form fields: Full Name, Student ID, Email Address, Password, Confirm Password.
  * Client-side validation: Required fields, email regex, minimum 8 characters, password match check.
  * On submit: Dispatches to `POST /api/auth/student/register`; on 201 redirects to `/login` with success banner; on 409 displays duplicate email/ID alert.
* **Step 3.3 (Login Views)**:
  * Route: `/login` (with toggle or dedicated tabs for Student Login vs. Librarian Login).
  * Fields: Email Address, Password.
  * On submit: Dispatches to `/api/auth/student/login` or `/api/auth/librarian/login`.
  * On success: Updates `AuthContext`, redirects Student to `/student/dashboard`, redirects Librarian to `/librarian/dashboard`.
  * On failure: Displays clear error: *"Invalid email or password. Please try again."*
* **Step 3.4 (Route Guards)**:
  * Create `src/components/common/ProtectedRoute.jsx`.
  * If unauthenticated: Redirects to `/login`.
  * If authenticated user role does not match required role: Redirects to authorized dashboard with access denied warning.
* **Deliverable**: Functional, protected authentication flows redirecting users cleanly by role.

---

### Phase 4 — Student Interface

* **Objective**: Construct all dedicated views and user workflows for the Student Portal.
* **Step 4.1 (Student Navigation Bar)**:
  * Render links: "Dashboard", "Browse Catalog", "Issued Books", "History", "Logout".
  * Display student name and Student ID indicator.
* **Step 4.2 (Student Dashboard Screen — `/student/dashboard`)**:
  * **Purpose**: Overview of student's library status.
  * **Elements**: Welcome banner with student identity, summary metric card of currently issued books, active loans table with due dates, quick links to catalog and history.
  * **API Dependency**: `GET /api/student/dashboard`.
  * **States**: Loading skeleton during fetch; empty state card if no books are issued; error banner if fetch fails.
* **Step 4.3 (Currently Issued Books Screen — `/student/issued-books`)**:
  * **Purpose**: Review active borrowings and initiate returns.
  * **Elements**: Structured data table showing Book Title, Author, ISBN, Issue Date, Due Date, and "Return Book" action button.
  * **API Dependency**: `GET /api/student/issued-books` and `POST /api/circulation/return`.
  * **States**: Empty state (*"You have no books currently issued"*); loading spinner; return confirmation modal on button click.
* **Step 4.4 (Student Library History Screen — `/student/history`)**:
  * **Purpose**: Inspect complete personal borrowing and return audit trail.
  * **Elements**: Historical table with Title, Author, ISBN, Issue Date, Due Date, Return Date, Status (`RETURNED`).
  * **API Dependency**: `GET /api/student/history`.
  * **States**: Empty state if student has no past activity; loading skeleton during fetch.
* **Deliverable**: Complete Student Portal views with active loan monitoring and history tracking.

---

### Phase 5 — Librarian Interface

* **Objective**: Construct all administrative oversight and management views for the Librarian Console.
* **Step 5.1 (Librarian Navigation Bar)**:
  * Render links: "Dashboard", "Manage Books", "Manage Students", "Issue Book", "Circulation Logs", "Logout".
  * Display Librarian role branding.
* **Step 5.2 (Librarian Dashboard Screen — `/librarian/dashboard`)**:
  * **Purpose**: Administrative overview of overall library activity.
  * **Elements**: Four primary metric cards: Total Book Titles, Total Inventory Copies, Active Issued Books, Total Registered Students; recent circulation activity feed table; quick management buttons.
  * **API Dependency**: `GET /api/librarian/dashboard`.
  * **States**: Loading skeletons during metric fetch; error retry banner.
* **Step 5.3 (Student Directory Screen — `/librarian/students`)**:
  * **Purpose**: Search and inspect registered student records.
  * **Elements**: Search bar (Student ID or Name); data table listing Student ID, Full Name, Email, Active Loans Count, Action ("View Profile").
  * **API Dependency**: `GET /api/librarian/students`.
* **Step 5.4 (Student Profile Inspection Modal / Screen — `/librarian/students/:id`)**:
  * **Purpose**: Detailed examination of an individual student's library standing.
  * **Elements**: Student contact metadata; table of currently issued books with due dates; table of past returned books; direct button to issue a book to this student.
  * **API Dependency**: `GET /api/librarian/students/:id`.
* **Step 5.5 (Master Circulation Log Screen — `/librarian/circulation-logs`)**:
  * **Purpose**: Comprehensive institutional circulation audit.
  * **Elements**: Filter dropdowns (`All`, `Issued`, `Returned`), keyword search, master table showing Transaction ID, Student Name, Student ID, Book Title, ISBN, Issue Date, Due Date, Return Date, Status.
  * **API Dependency**: `GET /api/circulation/records`.
* **Deliverable**: Complete Librarian administrative console views.

---

### Phase 6 — Book Management UI

* **Objective**: Build the catalog search interface, detailed book inspection modal, and librarian catalog CRUD controls.
* **Step 6.1 (Catalog Search & Browse View — `/books`)**:
  * Accessible to both Students and Librarians.
  * Prominent search bar with debounced input (300ms) querying Title, Author, Category, ISBN.
  * Category filter dropdown dynamically populated from active categories.
  * Grid / Table results showing Title, Author, Category, ISBN, Stock Status Pill ("Available [N]" vs "Unavailable / Out of Stock"), and "View Details" button.
  * Empty search state: *"No books found matching your search criteria."* with a "Clear Search" button.
* **Step 6.2 (Book Details Modal / View)**:
  * Displays complete bibliographic details: Title, Author, ISBN, Category, Publisher, Total Copies, Available Copies.
  * Contextual Actions:
    * For Student: "Request / Borrow Book" button (enabled if Available $> 0$, disabled if Available $= 0$).
    * For Librarian: "Edit Book", "Issue Book", and "Delete Book" controls.
* **Step 6.3 (Add Book Modal — Librarian Only)**:
  * Triggered from "Add New Book" button on librarian views.
  * Form fields: Title, Author, ISBN, Category, Publisher (optional), Total Copies ($\ge 1$).
  * Validates required fields, positive integer for copies.
  * On submit: Dispatches `POST /api/books`; on success displays confirmation toast and prepends new title to catalog; on 409 displays duplicate ISBN alert.
* **Step 6.4 (Edit Book Modal — Librarian Only)**:
  * Form pre-populated with existing book data.
  * Allows updating metadata and adjusting Total Copies.
  * Enforces client validation: Total Copies cannot be lower than currently circulating copies.
  * On submit: Dispatches `PUT /api/books/:id`; updates table item dynamically.
* **Step 6.5 (Delete Book Confirmation Modal — Librarian Only)**:
  * Displays warning dialog: *"Are you sure you want to delete '[Title]'?"*
  * If Available Copies $<$ Total Copies: Button is disabled or displays prominent error banner: *"Cannot delete: [N] copies are currently issued to students. All copies must be returned before deletion."*
  * If Available Copies $==$ Total Copies: Confirming deletion dispatches `DELETE /api/books/:id` and removes item from catalog view.
* **Deliverable**: Complete catalog search, details view, and safeguarded CRUD interfaces.

---

### Phase 7 — Library Transaction UI

* **Objective**: Implement user interfaces for book requests, direct counter issuance, return actions, and stock feedback.
* **Step 7.1 (Book Issue / Borrow Request Flow — Student)**:
  * Triggered from "Request / Borrow Book" button on catalog search or details view.
  * Displays confirmation modal summarizing Book Title, Author, and Due Date information.
  * Student clicks "Confirm Request".
  * Dispatches `POST /api/circulation/issue` with `bookId`.
  * Success Handling: Displays success alert: *"Book successfully issued! It has been added to your currently issued books."*, decrements available stock badge dynamically, and navigates/links to `/student/issued-books`.
  * Error Handling: If book is out of stock, displays: *"Cannot issue book: No copies currently available."*; if duplicate loan exists, displays: *"You already have an active loan of this book title."*
* **Step 7.2 (Direct Book Issue Flow — Librarian)**:
  * Accessible from "Issue Book" button on Librarian Console or student profile.
  * Form allows selecting/searching a registered Student and selecting an available Book.
  * Dispatches `POST /api/circulation/issue` with `{ studentId, bookId }`.
  * Displays confirmation toast with Student Name and Book Title upon success.
* **Step 7.3 (Book Return Flow)**:
  * Triggered by clicking "Return Book" on the student's active loans view or librarian return tool.
  * Displays confirmation dialog: *"Confirm return of '[Book Title]'?"*.
  * On confirmation, dispatches `POST /api/circulation/return` with `transactionId`.
  * Success Handling: Removes item from active loans table, displays confirmation toast: *"Book returned successfully. Stock restored."*, and updates catalog availability counter.
* **Deliverable**: Intuitive, error-guarded issue and return transaction interfaces.

---

### Phase 8 — API Integration Layer

* **Objective**: Construct the centralized HTTP service layer managing request dispatching, authentication token injection, and response normalization.
* **Step 8.1 (Axios Client Configuration — `src/services/api/client.js`)**:
  * Instantiate Axios instance with `baseURL: process.env.REACT_APP_API_URL || '/api'`.
  * Configure default headers: `Content-Type: application/json`.
* **Step 8.2 (Request Interceptor)**:
  * Intercepts outgoing requests to read token from `AuthContext` / storage.
  * Injects `Authorization: Bearer <token>` into request headers if present.
* **Step 8.3 (Response Interceptor & Error Normalization)**:
  * Normalizes successful responses: returns `response.data`.
  * Intercepts error responses:
    * If HTTP 401 Unauthorized: Clears stored session and redirects to `/login` with an expiration prompt.
    * If HTTP 403 Forbidden: Displays access denied banner.
    * If network error / server unreachable: Formats a fallback error payload: `{ success: false, error: { message: "Network error: Unable to connect to library server." } }`.
* **Step 8.4 (Domain Service Modules)**:
  * `authApi.js`: `register()`, `loginStudent()`, `loginLibrarian()`, `logout()`.
  * `bookApi.js`: `searchBooks(query, category)`, `getBookById(id)`, `createBook(data)`, `updateBook(id, data)`, `deleteBook(id)`.
  * `studentApi.js`: `getStudentDashboard()`, `getIssuedBooks()`, `getStudentHistory()`.
  * `librarianApi.js`: `getLibrarianDashboard()`, `getStudentList(query)`, `getStudentDetails(id)`.
  * `circulationApi.js`: `issueBook(payload)`, `returnBook(payload)`, `getCirculationLogs(status)`.
* **Deliverable**: Centralized, robust API service layer with automated token injection.

---

### Phase 9 — Frontend Validation and Error Handling

* **Objective**: Enforce client-side validation rules and resilient error presentation matching backend contracts.
* **Step 9.1 (Form Validation Rules)**:
  * Registration: Name non-empty; Student ID non-empty alphanumeric; valid email format; password minimum 8 chars; password confirmation match.
  * Login: Email and password non-empty.
  * Book Forms: Title, Author, Category non-empty; ISBN alphanumeric; Total Copies integer $\ge 1$.
  * Edit Book: New Total Copies $\ge (\text{Total Copies} - \text{Available Copies})$.
* **Step 9.2 (Field-Level Error Rendering)**:
  * Form inputs display red/black high-contrast border and clear inline error text below the input on validation failure.
* **Step 9.3 (Global Error States & Fallbacks)**:
  * Table Empty States: Clear, descriptive empty state cards for zero search results, zero issued books, and zero history records.
  * Network Failure Banner: Top-level dismissible banner alerting user when the backend is unreachable.
* **Deliverable**: Comprehensive input validation and polished error feedback across all forms.

---

### Phase 10 — Responsive Design

* **Objective**: Ensure the Black & White visual layout renders cleanly and functionally across all device form factors.
* **Step 10.1 (Desktop & Laptop Viewports $\ge 1024px$)**:
  * Multi-column grid layouts for dashboard metric cards.
  * Full-width data tables displaying complete metadata columns without truncation.
  * Side-by-side forms and wide modal dialogs.
* **Step 10.2 (Tablet Viewports $768px - 1023px$)**:
  * Metric cards adapt to $2 \times 2$ grid layout.
  * Data tables enable horizontal scrolling or condense secondary columns.
* **Step 10.3 (Mobile Viewports $375px - 767px$)**:
  * Navigation collapses to a clean monochrome hamburger menu or compact stack.
  * Metric cards stack vertically.
  * Tables adapt to card-based list items showing Title, Author, Due Date, and Action button prominently.
  * Modals adapt to bottom sheets or full-screen overlays with large, touch-friendly buttons.
* **Deliverable**: Fully responsive, high-contrast monochrome interface verified on desktop, tablet, and mobile.

---

### Phase 11 — Frontend Testing Preparation

* **Objective**: Define the comprehensive frontend testing specifications across components, forms, and workflows (no test code generated yet).
* **Step 11.1 (Component & UI Testing Preparation)**: Define test cases for shared primitives (Buttons, Inputs, Badges, Modals, Tables) verifying correct CSS rendering and disabled states.
* **Step 11.2 (Form Validation Testing Preparation)**: Define test cases for Registration, Login, Add Book, and Edit Book verifying field constraint error triggers.
* **Step 11.3 (Auth & Route Guard Testing Preparation)**: Define test cases verifying unauthenticated redirection to `/login` and role-based blocking (Student blocked from `/librarian/*`).
* **Step 11.4 (Catalog & Search Testing Preparation)**: Define test cases for search input debouncing, category filtering, and zero-result empty state rendering.
* **Step 11.5 (Circulation Interaction Testing Preparation)**: Define test cases for issue request triggers, return triggers, stock badge updates, and error alert displays.
* **Deliverable**: Complete frontend testing specifications ready for test script authoring.

---

### Phase 12 — Frontend and Backend Integration

* **Objective**: Execute end-to-end integration verification between the React client and Express backend services.
* **Step 12.1**: Verify API contract compliance (request bodies, query parameters, header formats) against running backend endpoints.
* **Step 12.2**: Validate complete Student flow: Registration $\rightarrow$ Login $\rightarrow$ Search Book $\rightarrow$ View Details $\rightarrow$ Request Book $\rightarrow$ Check Issued Books $\rightarrow$ Return Book $\rightarrow$ Verify History.
* **Step 12.3**: Validate complete Librarian flow: Login $\rightarrow$ Dashboard Metrics $\rightarrow$ Add Book $\rightarrow$ Edit Book $\rightarrow$ Search Students $\rightarrow$ Inspect Profile $\rightarrow$ Issue Book $\rightarrow$ Accept Return $\rightarrow$ Delete Book $\rightarrow$ Inspect Circulation Logs.
* **Step 12.4**: Verify token expiration handling: Expired token automatically clears client session and redirects to login view.
* **Deliverable**: Fully integrated frontend communicating smoothly with backend APIs.

---

### Phase 13 — Frontend Completion and Review

* **Objective**: Conduct formal design system review, accessibility audit, and readiness verification.
* **Step 13.1**: Accessibility Audit: Verify WCAG 2.1 AA compliance for color contrast (monochrome black on white text $\ge 4.5:1$), keyboard tab navigation, and focus rings.
* **Step 13.2**: UI Theme Consistency Audit: Confirm strict adherence to Black & White theme with zero unapproved color accents.
* **Step 13.3**: Requirements Traceability Verification: Confirm 100% of approved student and librarian screens and interactions are covered.
* **Step 13.4**: Complete Frontend Definition of Done Checklist.
* **Deliverable**: Verified, production-ready frontend architecture prepared for deployment.

---

## 5. Frontend Screen / Page Inventory

The following master inventory catalogues every planned screen in the application:

| Screen / Page | User Role | Purpose | Main Components | User Actions | Backend API Dependency | Auth Required | Validation | Source Requirement |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Registration** | Public | Student account registration | Form, Inputs, Submit Button, Link to Login | Enter details, submit form | `POST /api/auth/student/register` | No | Required fields, email regex, pass length $\ge 8$ | `SR-001`, `PR-001` |
| **Login** | Public | User authentication (both roles) | Role Selector, Inputs, Submit Button, Link to Register | Enter credentials, submit login | `POST /api/auth/*/login` | No | Non-empty email & password | `SR-003`, `004`, `PR-002`, `003` |
| **Student Dashboard** | Student | Overview of student library status | Welcome Card, Issued Count Card, Active Loans Table | Navigate to search, initiate return, view history | `GET /api/student/dashboard` | Yes (Student) | Token presence | `SR-015`, `PR-005` |
| **Catalog Search** | Both | Browse and search books | Search Bar, Category Dropdown, Book Table/Cards, Details Modal | Enter keywords, filter category, view details, request book | `GET /api/books`, `GET /api/books/:id` | Yes (Bearer) | None (empty query returns all) | `SR-007`, `008`, `PR-007`, `008` |
| **Book Details View** | Both | Full bibliographic inspection | Modal / Details View, Copy Counters, Action Buttons | View metadata, click Request (Student) or Edit/Delete (Librarian) | `GET /api/books/:id` | Yes (Bearer) | Valid Book ID | `SR-009`, `PR-008` |
| **Issued Books** | Student | View current loans & return | Active Loans Table, Return Action Buttons, Confirm Modal | Review due dates, click return, confirm return | `GET /api/student/issued-books`, `POST /api/circulation/return` | Yes (Student) | Active loan check | `SR-010`, `013`, `PR-012`, `013` |
| **Student History** | Student | Personal reading audit trail | History Data Table, Search/Filter | Review past returned books, dates | `GET /api/student/history` | Yes (Student) | Token presence | `SR-016`, `PR-014` |
| **Librarian Dashboard**| Librarian | Administrative activity overview | 4 Metric Cards (Titles, Copies, Loans, Students), Activity Feed Table | Review metrics, quick navigate to add book or issue book | `GET /api/librarian/dashboard` | Yes (Librarian)| Token presence | `SR-017`, `PR-006` |
| **Manage Books** | Librarian | Catalog CRUD operations | Master Catalog Table, Add Book Button, Edit Modal, Delete Modal | Search books, add book, edit details/stock, delete book | `GET /api/books`, `POST /api/books`, `PUT /api/books/:id`, `DELETE /api/books/:id` | Yes (Librarian)| Total $\ge 1$, Total $\ge$ Circulating, Available $==$ Total on delete | `SR-018`, `019`, `020`, `PR-015`–`017` |
| **Manage Students** | Librarian | Student directory & loan review | Student Directory Table, Search Bar, Student Details Modal | Search students, inspect active loans and past history | `GET /api/librarian/students`, `GET /api/librarian/students/:id` | Yes (Librarian)| Token presence | `SR-021`, `PR-018` |
| **Circulation Logs** | Librarian | Master circulation audit log | Filterable Transaction Table, Status Dropdown, Search Bar | Filter by status (`Issued`, `Returned`), inspect dates | `GET /api/circulation/records` | Yes (Librarian)| Token presence | `SR-LIB-03`, `PR-019` |

---

## 6. Frontend Component Plan

The frontend employs a modular hierarchy of reusable UI components:

```
+-----------------------------------------------------------------------------------+
|                        REUSABLE COMPONENT INVENTORY                               |
+-----------------------------------------------------------------------------------+
|  COMPONENT NAME       | SCOPE / USAGE       | DESCRIPTION                         |
+-----------------------+---------------------+-------------------------------------+
|  `Navbar`             | Global Layout       | Top bar with branding, role pill,   |
|                       |                     | user greeting, and logout button.   |
|  `Button`             | Primitives          | Standardized button (Primary,       |
|                       |                     | Secondary, Danger/Delete, Small).   |
|  `Input`              | Forms               | Text/Email/Password input with      |
|                       |                     | label, placeholder, and error text. |
|  `Card`               | Containers          | Clean monochrome surface card for   |
|                       |                     | metrics, forms, and book previews.  |
|  `DataTable`          | Lists / Tables      | Responsive table with headers, zebra|
|                       |                     | striping, and action button cells.  |
|  `SearchBar`          | Catalog / Directory | Search input with debounced trigger |
|                       |                     | and clear button.                   |
|  `StockBadge`         | Catalog / Details   | High-contrast "Available [N]" vs    |
|                       |                     | "Out of Stock" status pill.         |
|  `Modal`              | Overlays            | Accessible modal dialog with title, |
|                       |                     | backdrop, and action footer.        |
|  `AlertBanner`        | Feedback            | Success, error, and info banner for |
|                       |                     | form and transaction feedback.      |
|  `LoadingSkeleton`    | Asynchronous States | Monochrome pulsing placeholders for |
|                       |                     | tables and dashboard metric cards.  |
|  `EmptyState`         | Tables / Lists      | Centered icon/box with helpful text |
|                       |                     | when data arrays are empty.         |
+-----------------------------------------------------------------------------------+
```

---

## 7. Frontend Folder Structure Plan

The planned React application structure enforces clear architectural separation. *(Note: These files and folders will be created during implementation, not now)*:

```
frontend/
├── public/
│   ├── index.html                 # Single page root HTML template
│   └── favicon.ico                # Application monochrome icon
├── package.json                   # Dependencies and script definitions
├── package-lock.json              # Locked dependency tree
└── src/
    ├── index.js                   # Application root mount point
    ├── App.jsx                    # Top-level router and context wrapper
    ├── context/
    │   └── AuthContext.jsx        # Global user session & token state
    ├── routes/
    │   ├── AppRoutes.jsx          # Route definitions & switches
    │   └── ProtectedRoute.jsx     # Role-based route guard wrapper
    ├── services/
    │   └── api/
    │       ├── client.js          # Axios client instance & interceptors
    │       ├── authApi.js         # Authentication endpoints
    │       ├── bookApi.js         # Catalog & book management endpoints
    │       ├── studentApi.js      # Student portal endpoints
    │       ├── librarianApi.js    # Librarian management endpoints
    │       └── circulationApi.js  # Issue and return endpoints
    ├── components/
    │   └── common/
    │       ├── Navbar.jsx         # Persistent top navigation bar
    │       ├── Button.jsx         # Monochrome styled buttons
    │       ├── Input.jsx          # Styled form inputs with validation
    │       ├── Card.jsx           # Surface card wrapper
    │       ├── DataTable.jsx      # Responsive data table component
    │       ├── SearchBar.jsx      # Reusable search bar input
    │       ├── StockBadge.jsx     # Availability status pill badge
    │       ├── Modal.jsx          # Accessible dialog overlay
    │       ├── AlertBanner.jsx    # Success and error alert boxes
    │       ├── LoadingSkeleton.jsx# Loading placeholder skeletons
    │       └── EmptyState.jsx     # Empty data visual display
    ├── pages/
    │   ├── auth/
    │   │   ├── LoginPage.jsx      # Student & Librarian login page
    │   │   └── RegisterPage.jsx   # Student self-registration page
    │   ├── student/
    │   │   ├── StudentDashboard.jsx # Student overview dashboard
    │   │   ├── IssuedBooksPage.jsx  # Currently issued books & return
    │   │   └── HistoryPage.jsx      # Personal reading activity history
    │   ├── librarian/
    │   │   ├── LibrarianDashboard.jsx # Administrative activity overview
    │   │   ├── ManageBooksPage.jsx    # Catalog CRUD management
    │   │   ├── ManageStudentsPage.jsx # Student directory & inspection
    │   │   └── CirculationLogsPage.jsx# Master circulation records log
    │   └── shared/
    │       ├── CatalogSearchPage.jsx  # Book discovery & details modal
    │       └── NotFoundPage.jsx       # 404 Route fallback
    ├── styles/
    │   ├── variables.css          # Black & White CSS custom properties
    │   ├── typography.css         # Font hierarchy & text styles
    │   └── global.css             # Base resets, layout, and utilities
    └── utils/
        ├── formatters.js          # Date formatters (ISO -> Local Date)
        └── validators.js          # Client-side form validation helpers
```

---

## 8. Frontend Development Order

Developers must follow this sequential implementation order to maintain component stability and smooth workflow progression:

1. **Step 1 (Environment & Entry)**: Setup project (`package.json`, `index.html`), configure `variables.css`, `global.css`, verify `App.jsx` mounting.
2. **Step 2 (Shared UI Primitives)**: Implement `Button.jsx`, `Input.jsx`, `Card.jsx`, `StockBadge.jsx`, `LoadingSkeleton.jsx`, `EmptyState.jsx`.
3. **Step 3 (API Client & Auth Context)**: Build `client.js` with Axios interceptors, implement `AuthContext.jsx` with token persistence in storage.
4. **Step 4 (Auth Pages & Route Guards)**: Build `RegisterPage.jsx`, `LoginPage.jsx`, `ProtectedRoute.jsx`, and `Navbar.jsx`. Verify login and role redirect.
5. **Step 5 (Shared Catalog Search)**: Build `SearchBar.jsx`, `Modal.jsx`, `DataTable.jsx`, and `CatalogSearchPage.jsx`. Implement search query and availability pill display.
6. **Step 6 (Book Details & Issue Flow)**: Implement Book Details modal view with dynamic "Request / Borrow Book" trigger and issue confirmation dialog.
7. **Step 7 (Student Views)**: Build `StudentDashboard.jsx`, `IssuedBooksPage.jsx` (with Return Book action), and `HistoryPage.jsx`.
8. **Step 8 (Librarian Book Management)**: Build `ManageBooksPage.jsx` with Add Book modal, Edit Book modal, and Safe Delete Book modal (enforcing copy invariants).
9. **Step 9 (Librarian Student & Circulation Views)**: Build `LibrarianDashboard.jsx` (metrics and activity feed), `ManageStudentsPage.jsx` (student directory and profile modal), and `CirculationLogsPage.jsx` (master audit table with status filters).
10. **Step 10 (Responsive Polish & Error Hardening)**: Optimize table horizontal scrolling and mobile card layouts; add error banners and form validation feedback.
11. **Step 11 (End-to-End Integration Verification)**: Connect frontend to running backend API service; verify complete user journeys.
12. **Step 12 (Accessibility & Sign-Off)**: Audit keyboard navigation, contrast ratios, and complete Definition of Done checklist.

---

## 9. Frontend Phase Dependencies

```
[Phase 1: Project Initialization]
       │
       ▼
[Phase 2: Global UI & Design System]
       │
       ▼
[Phase 3: Authentication UI & Auth Context]
       │
       ├─────────────────────────────────────────┐
       ▼                                         ▼
[Phase 4: Student Interface]              [Phase 5: Librarian Interface]
       │                                         │
       └────────────────────┬────────────────────┘
                            │
                            ▼
                 [Phase 6: Book Management UI]
                            │
                            ▼
                 [Phase 7: Library Transaction UI]
                            │
                            ▼
                 [Phase 8: API Integration Layer]
                            │
                            ▼
                 [Phase 9: Validation & Error Handling]
                            │
                            ▼
                 [Phase 10: Responsive Design]
                            │
                            ▼
                 [Phase 11: Testing Preparation]
                            │
                            ▼
                 [Phase 12: Backend Integration]
                            │
                            ▼
                 [Phase 13: Completion & Review]
```

### Dependency Rules:
* **Phase 2 & 3 are foundational**: Shared primitives and `AuthContext` must exist before building portal screens.
* **Phase 7 depends on Phase 6**: Issue and return interactions operate upon catalog book records and availability states.
* **Phase 12 requires Backend Availability**: End-to-end integration requires running backend APIs (from `BACKEND_IMPLEMENTATION_PLAN.md`).

---

## 10. Frontend Definition of Done (DoD)

The frontend implementation is considered complete only when all criteria below are satisfied:

- [ ] **Aesthetic Compliance**: 100% of views strictly implement the Modern Black & White theme (no unapproved color clutter).
- [ ] **Role Access Enforcement**: Students are barred from accessing Librarian Console views via client-side routing guards (`ProtectedRoute`).
- [ ] **Data Scoping**: Student views display only the authenticated student's own active loans and reading history.
- [ ] **Catalog Search**: Real-time keyword search functions smoothly across Title, Author, Category, and ISBN with live copy badges.
- [ ] **Circulation Actions**: Book issue and return actions dispatch correct API payloads, show confirmation dialogs, and update UI state dynamically.
- [ ] **Safe Deletion Guards**: Deleting a book with issued copies is blocked in the UI with a clear warning modal.
- [ ] **Form Validations**: All forms execute client validation (mandatory fields, email formats, positive copy numbers).
- [ ] **Error Handling**: Graceful rendering of empty states, 401 token expiration redirects, and backend error alerts.
- [ ] **Responsive Design**: Flawless layout adaptation across desktop, tablet, and mobile displays without horizontal overflow.
- [ ] **Accessibility**: High contrast text compliance (WCAG 2.1 AA) and functional keyboard tab navigation.
- [ ] **Traceability**: All approved student and librarian functional screens are implemented and verified.

---

## 11. Requirement Traceability Matrix

The following matrix maps frontend implementation phases and screens back to the approved project requirements:

| Screen / Page | Frontend Phase | Covered SRD Requirements | Covered TRD Requirements | Covered PRD Requirements | Covered FRD Requirements | Covered BRD Requirements |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Registration Page** | Phase 3 | `SR-AUTH-01`, `SR-001` | Section 8.1, `TR-FE-01` | `PR-001` | `FR-001` | `BR-001`, `STU-001` |
| **Login Page** | Phase 3 | `SR-AUTH-02`, `03`, `SR-003`, `004` | Section 8.1, `TR-FE-03` | `PR-002`, `003` | `FR-002`, `003` | `BR-001`, `STU-002`, `LIB-001` |
| **Student Dashboard** | Phase 4 | `SR-STU-01`, `SR-015` | Section 8.3 | `PR-005` | `FR-005` | `BR-007` |
| **Catalog Search** | Phase 6 | `SR-BKM-01`, `02`, `SR-007`, `008`| Section 8.2 | `PR-007` | `FR-007` | `BR-004`, `STU-003` |
| **Book Details Modal**| Phase 6 | `SR-BKM-03`, `SR-009` | Section 8.2 | `PR-008` | `FR-008` | `BR-004`, `STU-004` |
| **Issued Books Page** | Phase 4, 7 | `SR-STU-02`, `SR-010`, `SR-013` | Section 8.3, 8.4 | `PR-012`, `013` | `FR-010`, `011` | `BR-006`, `007`, `STU-006`|
| **Student History** | Phase 4 | `SR-STU-03`, `SR-016` | Section 8.3 | `PR-014` | `FR-012` | `BR-007`, `STU-008` |
| **Librarian Dashboard**| Phase 5 | `SR-LIB-01`, `SR-017` | Section 8.5 | `PR-006` | `FR-006` | `BR-008`, `LIB-010` |
| **Manage Books Page** | Phase 6 | `SR-BKM-04`–`06`, `SR-018`–`020` | Section 8.2 | `PR-015`–`017` | `FR-013`–`015` | `BR-003`, `LIB-002`–`004`|
| **Manage Students** | Phase 5 | `SR-LIB-02`, `SR-021` | Section 8.5 | `PR-018` | `FR-016` | `BR-009`, `LIB-006` |
| **Circulation Logs** | Phase 5 | `SR-LIB-03` | Section 8.5 | `PR-019` | `FR-017` | `BR-008`, `LIB-009` |
| **Route Protection** | Phase 3 | `SR-022`, `SR-SEC-04` | `TR-SEC-03`, `TR-FE-02` | `PR-020` | `FR-020` | `BR-002`, `AUT-003` |

---

## 12. Risks and Open Technical Decisions

The following items represent unresolved technical decisions from the approved documents that will be finalized during client implementation:

| Decision ID | Topic | Context & Developer Decision Framework | Status |
| :--- | :--- | :--- | :--- |
| **TECH-DEC-01** | **Client Token Storage Mechanism** | Whether JWT is stored in `localStorage` or `sessionStorage` or accessed via an auth cookie.<br>• *Implementation Rule*: Storing token in `localStorage` with header injection satisfies student project requirements and integrates seamlessly with `AuthContext`. | To be decided during implementation |
| **TECH-DEC-02** | **Client Routing Base Prefix** | Whether client-side routes use a `/app` prefix or root level (e.g., `/student/dashboard` vs `/app/student/dashboard`).<br>• *Implementation Rule*: Direct root-level paths (`/student/*` and `/librarian/*`) provide clean, simple URLs matching the FRD. | To be decided during implementation |
| **TECH-DEC-03** | **Search Debounce Delay** | Optimal debounce delay for catalog search input.<br>• *Implementation Rule*: Standard 300ms debounce balances search responsiveness with minimal network overhead. | To be decided during implementation |
| **DEC-01** | **Due Date Display Format** | How loan due dates are formatted on student cards.<br>• *Implementation Rule*: Formatted using standard readable local date format (e.g., `YYYY-MM-DD`). | To be decided during implementation |

---
*End of Frontend Implementation Plan*
