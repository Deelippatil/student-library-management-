# BACKEND IMPLEMENTATION PLAN
## Student Library Management System (SLMS)

---

## 1. Document Control

### 1.1 Document Information
| Field | Details |
| :--- | :--- |
| **Document Name** | Backend Phase-by-Phase Implementation Plan |
| **Project Name** | Student Library Management System (SLMS) |
| **Document Version** | 1.0 (Baseline Architecture Plan) |
| **Date** | October 4, 2026 |
| **Document Status** | Approved Backend Implementation Blueprint |
| **Source Documents** | `BUSINESS_REQUIREMENTS_DOCUMENT.md` (v1.0), `FUNCTIONAL_REQUIREMENTS_DOCUMENT.md` (v1.2), `PRODUCT_REQUIREMENTS_DOCUMENT.md` (v1.0), `TECHNICAL_REQUIREMENTS_DOCUMENT.md` (v1.0), `SRD_DOCUMENT.md` (v1.0) |
| **Author / Role** | Senior Backend Architect & Technical Project Manager |
| **Target Audience** | Backend Developers, Database Engineers, QA Test Engineers, Academic Project Evaluators |

### 1.2 Revision History
| Version | Date | Author | Description of Change | Status |
| :--- | :--- | :--- | :--- | :--- |
| 1.0 | 2026-10-04 | Senior Backend Architect | Initial complete release of the 12-phase backend implementation plan, strictly aligned with approved BRD, FRD, PRD, TRD, and SRD specifications. | Approved Baseline |

### 1.3 Baseline Compliance
This plan derives strictly from the approved project documents. It specifies the step-by-step technical construction of the backend service without introducing unapproved features, numerical business rules (such as loan periods or borrowing limits), procedural assumptions (such as counter verification), or extra user roles. Exactly two user roles are supported: **Student** and **Librarian**.

---

## 2. Backend Implementation Overview

### 2.1 Backend Purpose
The backend of the Student Library Management System serves as the secure, authoritative system of record for all library entities and operations. It is responsible for credential verification, role-based access control, business rule enforcement, inventory stock invariants, atomic circulation transactions, and persistent data storage.

### 2.2 Technology Stack
* **Runtime**: Node.js (LTS version 18.x or 20.x).
* **Web Framework**: Express.js (v4.x).
* **Database Driver**: `mysql2` (utilizing Promise wrappers and Connection Pooling).
* **Authentication & Cryptography**: `bcrypt` (password hashing) and `jsonwebtoken` (JWT bearer token signing/verification).
* **Configuration**: `dotenv` (environment variable isolation).
* **Security & Utility**: `cors` (origin control), `helmet` (HTTP security headers), `morgan` (HTTP request logging).

### 2.3 Backend Core Responsibilities
1. **Identity & Access Management**: Secure student self-registration, credential verification, and token issuance.
2. **Access Control Enforcement**: Strict server-side route guarding ensuring Students cannot execute Librarian-only actions and cannot access other students' records.
3. **Catalog Governance**: Management of book metadata with inventory counter tracking ($0 \le \text{Available} \le \text{Total}$) and safe deletion protection (RULE-007).
4. **Transaction Coordination**: Atomic issue and return processing wrapped in database transactions to prevent stock desynchronization.
5. **Data Delivery**: Providing sanitized, formatted RESTful JSON responses to the React frontend.

### 2.4 Relationship with Frontend and Database
* **With the Frontend**: Serves as a stateless REST API gateway communicating over HTTPS using standard JSON payloads, verifying Bearer tokens on every private endpoint, and returning standardized error envelopes.
* **With the Database**: Acts as the sole access client to the MySQL database, executing parameterized SQL statements through connection pools and managing ACID transaction boundaries.

---

## 3. Backend Architecture Approach

The backend implements a classic **Layered Modular Architecture** to guarantee separation of concerns, testability, and maintainability:

```
+-----------------------------------------------------------------------------------+
|                        BACKEND LAYERED ARCHITECTURE                               |
+-----------------------------------------------------------------------------------+

   HTTP Requests (From React Frontend)
          │
          ▼
   [1. Routing Layer (`src/routes/`)]
   ├── Route definitions matching REST endpoints
   └── Route-level middleware attachment (Auth & Validation)
          │
          ▼
   [2. Middleware Layer (`src/middleware/`)]
   ├── Authentication Middleware (JWT signature & expiration validation)
   ├── Authorization Middleware (Role checking: Student vs. Librarian)
   ├── Input Validation Middleware (Format and mandatory field checks)
   └── Global Error Handling Middleware (Exception formatting)
          │
          ▼
   [3. Controller Layer (`src/controllers/`)]
   ├── Parses request parameters, query strings, and body payloads
   ├── Invokes domain service methods
   └── Formats and dispatches standard HTTP JSON responses
          │
          ▼
   [4. Service / Business Logic Layer (`src/services/`)]
   ├── Executes core business rules (RULE-001 through RULE-008)
   ├── Coordinates multi-step transaction workflows
   └── Enforces data invariants (Availability check, duplicate loan check)
          │
          ▼
   [5. Data Access Layer / Models (`src/models/` or `src/dal/`)]
   ├── Executes parameterized SQL queries via `mysql2` pool
   └── Manages database transaction blocks (`START TRANSACTION`, `COMMIT`, `ROLLBACK`)
          │
          ▼
   MySQL Relational Database
```

### 3.1 Layer Responsibilities
* **Routes (`src/routes/`)**: Map URI endpoints to controller functions and declare middleware chains.
* **Middleware (`src/middleware/`)**: Intercepts requests for authentication, role validation, schema validation, and uncaught error formatting.
* **Controllers (`src/controllers/`)**: Handle HTTP-specific logic (status codes, headers, response JSON envelopes). No direct SQL is executed here.
* **Services (`src/services/`)**: Encapsulate pure business logic, calculations, and invariant validations independent of the HTTP transport layer.
* **Data Access / Models (`src/models/`)**: Encapsulate SQL queries, parameter binding, and connection pool interactions.
* **Utilities (`src/utils/`)**: Reusable helper functions (token generation, password hashing, date formatters).
* **Configuration (`src/config/`)**: Environment variable validation and MySQL connection pool setup.

---

## 4. Backend Development Phases

The backend development lifecycle is divided into 12 structured, sequential phases:

```
+-----------------------------------------------------------------------------------+
|                        12-PHASE BACKEND IMPLEMENTATION PLAN                       |
+-----------------------------------------------------------------------------------+
|  Phase 1: Project Initialization   ──> Establish Node/Express foundation          |
|  Phase 2: Database Integration      ──> Configure MySQL pool & entity mapping      |
|  Phase 3: Auth & Authorization     ──> Registration, Login, JWT, Role Middleware  |
|  Phase 4: Student Features         ──> Student dashboard, active loans, history   |
|  Phase 5: Librarian Features       ──> Librarian dashboard, student records       |
|  Phase 6: Book Management APIs     ──> Catalog search, Add, Edit, Safe Delete     |
|  Phase 7: Circulation Management   ──> Atomic Issue, Return, Stock Sync           |
|  Phase 8: Validation & Errors      ──> Centralized error handling & validation    |
|  Phase 9: Security Hardening       ──> Parameterization, CORS, Helmet, Scoping    |
|  Phase 10: Testing Preparation     ──> Unit, Integration & API Test Plan         |
|  Phase 11: Backend Integration     ──> Contract validation with React client      |
|  Phase 12: Completion & Review     ──> Traceability, Readiness Checklist          |
+-----------------------------------------------------------------------------------+
```

---

### Phase 1 — Backend Project Initialization

* **Objective**: Establish the Node.js runtime environment, configure dependencies, set up directory structures, and run a baseline health check server.
* **Step 1.1**: Initialize Node.js project (`package.json`) specifying metadata, `type: "commonjs"` (or ES Modules based on developer preference), and target Node.js LTS version.
* **Step 1.2**: Install core production dependencies:
  * `express`: Web server framework.
  * `mysql2`: MySQL database client.
  * `dotenv`: Environment configuration.
  * `bcrypt`: Password hashing.
  * `jsonwebtoken`: Token management.
  * `cors`: Cross-Origin Resource Sharing.
  * `helmet`: HTTP header security.
  * `morgan`: HTTP request logging.
* **Step 1.3**: Install development dependencies: `nodemon` (auto-reloading).
* **Step 1.4**: Define npm scripts in `package.json`:
  * `"start"`: `node src/server.js`
  * `"dev"`: `nodemon src/server.js`
* **Step 1.5**: Create environment template file (`.env.example`) defining:
  * `PORT`, `NODE_ENV`, `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `CLIENT_URL`.
* **Step 1.6**: Establish baseline Express application in `src/app.js` with JSON body parser, CORS, and health check route (`GET /api/health`).
* **Step 1.7**: Establish server entry point in `src/server.js` binding to configured `PORT`.
* **Deliverable**: Running Express server responding with HTTP 200 OK on `/api/health`.

---

### Phase 2 — Database Integration

* **Objective**: Configure MySQL connection pooling, establish database communication abstraction, and map logical entities defined in the SRD.
* **Step 2.1**: Implement database configuration module (`src/config/db.js`) creating a `mysql2/promise` connection pool:
  * Configure host, port, user, password, database, connection limit (10–20), and queue limits.
  * Implement pool connection verification on server startup.
* **Step 2.2**: Define logical entity mappings (aligned strictly with SRD Section 13):
  * **User Entity**: `id`, `full_name`, `student_id` (nullable for librarian), `email`, `password_hash`, `role` (`Student` | `Librarian`), `created_at`.
  * **Book Entity**: `id`, `title`, `author`, `isbn`, `category`, `publisher`, `total_copies`, `available_copies`, `created_at`, `updated_at`.
  * **Circulation Transaction Entity**: `id`, `student_id`, `book_id`, `issue_date`, `due_date`, `return_date`, `status` (`ISSUED` | `RETURNED`).
* **Step 2.3**: Establish database access wrapper utilities:
  * Standard query execution helper executing parameterized statements.
  * Transaction helper providing connection acquisition, `beginTransaction()`, `commit()`, `rollback()`, and connection release.
* **Deliverable**: Verified database connection pool responding to test queries.

---

### Phase 3 — Authentication and Authorization

* **Objective**: Implement secure user registration for students, login for both roles, token issuance, and server-side role authorization guards.
* **Step 3.1**: Implement Password Utility (`src/utils/password.js`) providing:
  * `hashPassword(plaintext)` using `bcrypt` (salt rounds $\ge 10$).
  * `comparePassword(plaintext, hash)` returning boolean.
* **Step 3.2**: Implement Token Utility (`src/utils/token.js`) providing:
  * `generateToken(payload)` signing JWT with `JWT_SECRET` and expiration.
  * `verifyToken(token)` decoding and validating signature.
* **Step 3.3**: Implement Student Registration Controller & Service (`POST /api/auth/student/register`):
  * Validates non-empty fields, email regex, student ID uniqueness, password length $\ge 8$.
  * Hashes password and persists record with role `Student`.
  * Returns HTTP 201 Created on success; HTTP 409 Conflict on duplicate email/ID.
* **Step 3.4**: Implement Login Controllers (`POST /api/auth/student/login` and `POST /api/auth/librarian/login`):
  * Queries user by email; validates role matching endpoint.
  * Compares password hash; rejects invalid credentials with generic HTTP 401 Unauthorized.
  * Generates signed JWT payload `{ userId, role, email }`.
  * Returns token and user profile in standard JSON envelope.
* **Step 3.5**: Implement Authentication Middleware (`src/middleware/auth.js`):
  * Extracts `Authorization: Bearer <token>` header.
  * Rejects missing or invalid tokens with HTTP 401.
  * Attaches decoded user payload to `req.user`.
* **Step 3.6**: Implement Role Authorization Middleware (`src/middleware/role.js`):
  * Verifies `req.user.role === requiredRole`.
  * Rejects unauthorized roles with HTTP 403 Forbidden.
* **Deliverable**: Functional, protected auth endpoints with role-based route blocking.

---

### Phase 4 — Student Backend Features

* **Objective**: Implement student-facing data retrieval endpoints scoped strictly to the authenticated student's identity.
* **Step 4.1**: Implement Student Dashboard Controller & Service (`GET /api/student/dashboard`):
  * Extracts `userId` from `req.user`.
  * Retrieves student profile metadata.
  * Retrieves count of active issued books (`status = 'ISSUED'`).
  * Returns summary payload formatted for student dashboard.
* **Step 4.2**: Implement Active Issued Books Controller & Service (`GET /api/student/issued-books`):
  * Queries active loans where `student_id = req.user.userId` and `status = 'ISSUED'`.
  * Joins book table to retrieve Title, Author, ISBN.
  * Returns list of currently held books with Issue Date and Due Date.
* **Step 4.3**: Implement Student History Controller & Service (`GET /api/student/history`):
  * Queries all transactions for `req.user.userId`.
  * Sorts chronologically (most recent first).
  * Returns complete personal borrowing and return log.
* **Deliverable**: Student portal endpoints serving private, scoped data.

---

### Phase 5 — Librarian Backend Features

* **Objective**: Implement librarian administrative data endpoints for institutional activity monitoring and student directory inspection.
* **Step 5.1**: Implement Librarian Dashboard Controller & Service (`GET /api/librarian/dashboard`):
  * Protected by Librarian role middleware.
  * Aggregates key library metrics: Total Book Titles count, Total Inventory Copies sum, Active Circulating Loans count, Total Registered Students count.
  * Retrieves recent circulation activity feed (most recent issues/returns).
  * Returns consolidated administrative metrics payload.
* **Step 5.2**: Implement Student Directory Controller & Service (`GET /api/librarian/students`):
  * Queries all users where `role = 'Student'`.
  * Supports query parameters for search (`?query=...`) matching Student Name or Student ID.
  * Aggregates count of currently issued books for each student.
  * Returns student directory list.
* **Step 5.3**: Implement Student Details Inspection Controller & Service (`GET /api/librarian/students/:id`):
  * Retrieves individual student profile.
  * Retrieves that student's currently issued books with due dates.
  * Retrieves that student's complete historical borrowing ledger.
* **Deliverable**: Administrative oversight endpoints accessible exclusively to librarians.

---

### Phase 6 — Book Management APIs

* **Objective**: Implement catalog search, details inspection, and librarian catalog CRUD operations under strict inventory invariants.
* **Step 6.1**: Implement Catalog Search & Filter Controller & Service (`GET /api/books`):
  * Accessible to both authenticated Students and Librarians.
  * Supports keyword search (`?query=...`) evaluating Title, Author, Category, and ISBN.
  * Supports category filtering (`?category=...`).
  * Computes dynamic availability status: "Available" if `available_copies > 0`, "Unavailable / Out of Stock" if `available_copies = 0`.
* **Step 6.2**: Implement Book Details Controller & Service (`GET /api/books/:id`):
  * Retrieves single book record by ID with full bibliographic metadata and copy counts.
  * Returns HTTP 404 Not Found if ID does not exist.
* **Step 6.3**: Implement Add Book Controller & Service (`POST /api/books`):
  * Protected by Librarian role middleware.
  * Validates non-empty Title, Author, Category; validates unique ISBN; validates Total Copies $\ge 1$.
  * Initializes `available_copies = total_copies`.
  * Persists record; returns HTTP 201 Created.
* **Step 6.4**: Implement Edit Book Controller & Service (`PUT /api/books/:id`):
  * Protected by Librarian role middleware.
  * Validates that new `total_copies` is not lower than currently circulating copies:
    $$\text{total\_copies (new)} \ge (\text{total\_copies (current)} - \text{available\_copies (current)})$$
  * Dynamically updates `available_copies` to maintain stock consistency.
* **Step 6.5**: Implement Safe Delete Book Controller & Service (`DELETE /api/books/:id`):
  * Protected by Librarian role middleware.
  * Enforces RULE-007: Queries active issue records for book; verifies `available_copies == total_copies`.
  * If copies are on loan, blocks deletion with HTTP 400 Bad Request.
  * If all copies are in library, deletes or archives the book record.
* **Deliverable**: Complete catalog CRUD operations enforcing stock and deletion invariants.

---

### Phase 7 — Library Transaction Management

* **Objective**: Implement book issue and return transactions with database-level ACID atomicity and business rule enforcement.
* **Step 7.1**: Implement Book Issue Controller & Service (`POST /api/circulation/issue`):
  * Resolves target Student ID (from session if student, or from payload if librarian) and Book ID.
  * Acquires database transaction connection (`START TRANSACTION`).
  * **Invariant Check 1**: Verifies book exists and `available_copies >= 1` (RULE-003).
  * **Invariant Check 2**: Verifies student has no active loan (`status = 'ISSUED'`) for this exact title (RULE-008).
  * Inserts circulation record with `status = 'ISSUED'`, `issue_date = NOW()`, and `due_date`.
  * Decrements book stock: `available_copies = available_copies - 1`.
  * Commits transaction (`COMMIT`); rolls back on any failure (`ROLLBACK`).
  * Returns HTTP 201 Created with transaction details.
* **Step 7.2**: Implement Book Return Controller & Service (`POST /api/circulation/return`):
  * Resolves target transaction ID or active loan identifier.
  * Acquires database transaction connection (`START TRANSACTION`).
  * Verifies active loan exists (`status = 'ISSUED'`).
  * Updates circulation record: `status = 'RETURNED'`, `return_date = NOW()`.
  * Increments book stock: `available_copies = available_copies + 1` (RULE-004).
  * Invariant Verification: Verifies `available_copies <= total_copies`.
  * Commits transaction (`COMMIT`); rolls back on failure (`ROLLBACK`).
  * Returns HTTP 200 OK with confirmation.
* **Step 7.3**: Implement Master Circulation Records Controller & Service (`GET /api/circulation/records`):
  * Protected by Librarian role middleware.
  * Queries all transactions joining Student Name, Student ID, Book Title, and ISBN.
  * Supports status filtering (`?status=All|Issued|Returned`).
  * Returns complete institutional circulation audit ledger.
* **Deliverable**: Atomic, thread-safe circulation issue/return transactions.

---

### Phase 8 — Validation and Error Handling

* **Objective**: Implement centralized request validation schemas and global exception handling.
* **Step 8.1**: Implement Request Validation Middleware (`src/middleware/validate.js`):
  * Sanitizes string inputs (trims whitespace, normalizes emails).
  * Enforces field existence, data types, and length bounds.
  * Halts processing with HTTP 422 Unprocessable Entity before reaching services if validation fails.
* **Step 8.2**: Implement Global Error Handling Middleware (`src/middleware/errorHandler.js`):
  * Intercepts unhandled errors passed via `next(err)`.
  * Formats responses using standard error payload: `{ success: false, error: { code, message } }`.
  * Maps business exceptions to standard status codes (400, 401, 403, 404, 409, 422).
  * Masks raw SQL errors and internal stack traces in production.
* **Deliverable**: Resilient, predictable API error responses.

---

### Phase 9 — Security Hardening

* **Objective**: Enforce backend security controls matching academic software engineering standards.
* **Step 9.1**: Configure parameterized queries across all database access modules; verify zero string concatenation in SQL statements.
* **Step 9.2**: Configure `helmet` middleware for standard HTTP security headers (X-Content-Type-Options, Frameguard).
* **Step 9.3**: Configure strict CORS middleware restricting allowed origins to `CLIENT_URL`.
* **Step 9.4**: Verify student data isolation: Audit all student controllers to ensure queries strictly filter by authenticated `req.user.userId`.
* **Step 9.5**: Audit environment variable loading: Confirm no credentials, secrets, or ports are hardcoded.
* **Deliverable**: Secure backend service protected against SQL injection, IDOR, and credential leakage.

---

### Phase 10 — Testing Preparation

* **Objective**: Define the comprehensive backend testing plan across all operational units (test execution framework and scenarios).
* **Step 10.1 (Unit Testing Preparation)**: Define unit test specifications for utility functions: password hashing/comparison, token generation/verification, and inventory calculation logic.
* **Step 10.2 (API Route & Middleware Testing)**: Define test cases verifying authentication middleware (valid, missing, expired tokens) and role authorization middleware (Student rejected on Librarian routes).
* **Step 10.3 (Catalog & Book Management Testing)**: Define test cases for Add Book (valid vs duplicate ISBN), Edit Book (stock reduction invariant), and Delete Book (blocked when copies issued vs allowed when all copies returned).
* **Step 10.4 (Circulation Lifecycle Testing)**: Define test cases verifying:
  * Issue when Available $\ge 1$ decrements stock by 1.
  * Issue when Available $= 0$ rejected with 400.
  * Issue duplicate title rejected with 400 (RULE-008).
  * Return updates status to `RETURNED` and increments stock by 1.
* **Step 10.5 (Error Scenario Testing)**: Define test cases verifying 401, 403, 404, 409, 422, and 500 error envelopes.
* **Deliverable**: Complete, verifiable backend test plan ready for test script authoring.

---

### Phase 11 — Backend Integration

* **Objective**: Verify backend readiness for client communication, API contract compliance, and end-to-end data workflows.
* **Step 11.1**: Verify API contract compliance against SRD Section 14 (endpoint paths, HTTP verbs, request/response JSON envelopes).
* **Step 11.2**: Verify CORS and pre-flight `OPTIONS` request handling with the React frontend origin.
* **Step 11.3**: Validate full end-to-end workflow execution via API client (Postman/cURL):
  * Student Registration $\rightarrow$ Student Login $\rightarrow$ Catalog Search $\rightarrow$ Book Issue $\rightarrow$ Active Loans Check $\rightarrow$ Book Return $\rightarrow$ History Check.
  * Librarian Login $\rightarrow$ Dashboard Check $\rightarrow$ Add Book $\rightarrow$ Edit Book $\rightarrow$ Issue Book $\rightarrow$ Accept Return $\rightarrow$ Safe Delete Book $\rightarrow$ View Circulation Logs.
* **Deliverable**: Validated, end-to-end operational backend ready for UI connection.

---

### Phase 12 — Backend Completion and Review

* **Objective**: Conduct formal architectural review, requirement traceability audit, and readiness verification.
* **Step 12.1**: Audit requirements traceability: Confirm 100% of SRD requirements (`SR-001` through `SR-022`) are addressed.
* **Step 12.2**: Audit role boundaries: Confirm no Admin role exists and role partitioning is strictly maintained.
* **Step 12.3**: Audit business rules: Confirm strict adherence to approved rules (RULE-001 through RULE-008) with zero unapproved additions.
* **Step 12.4**: Complete Backend Readiness Checklist.
* **Deliverable**: Fully verified backend architecture ready for production coding.

---

## 5. Backend API Planning Table

The following master table specifies all planned backend API endpoints:

| Feature Domain | User Role | Purpose | Method | Endpoint Path | Auth Required | Request Data | Response Data | Error Cases | Source Requirement |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Auth** | Public | Register Student | `POST` | `/api/auth/student/register` | No | `{ fullName, studentId, email, password }` | `{ success: true, message, studentId }` | 409 Duplicate, 422 Validation | `SR-001`, `SR-002` |
| **Auth** | Student | Login Student | `POST` | `/api/auth/student/login` | No | `{ email, password }` | `{ success: true, token, user }` | 401 Invalid credentials | `SR-003`, `SR-005` |
| **Auth** | Librarian | Login Librarian | `POST` | `/api/auth/librarian/login` | No | `{ email, password }` | `{ success: true, token, user }` | 401 Invalid credentials | `SR-004`, `SR-005` |
| **Auth** | Both | Logout Session | `POST` | `/api/auth/logout` | Yes (Bearer) | None | `{ success: true, message }` | 401 Unauthorized | `SR-006` |
| **Catalog** | Both | Search / Browse | `GET` | `/api/books` | Yes (Bearer) | Query: `?query=...&category=...` | `{ success: true, books: [...] }` | 401 Unauthorized | `SR-007`, `SR-008` |
| **Catalog** | Both | View Details | `GET` | `/api/books/:id` | Yes (Bearer) | Param: `id` | `{ success: true, book: { ... } }` | 404 Not Found | `SR-009` |
| **Catalog** | Librarian | Add New Book | `POST` | `/api/books` | Yes (Librarian)| `{ title, author, isbn, category, publisher, totalCopies }` | `{ success: true, bookId, message }` | 403 Forbidden, 409 Duplicate ISBN, 422 | `SR-018` |
| **Catalog** | Librarian | Edit Book | `PUT` | `/api/books/:id` | Yes (Librarian)| `{ title, author, category, publisher, totalCopies }` | `{ success: true, message }` | 400 Total < Circulating, 403, 404 | `SR-019` |
| **Catalog** | Librarian | Delete Book | `DELETE`| `/api/books/:id` | Yes (Librarian)| Param: `id` | `{ success: true, message }` | 400 Copies issued, 403, 404 | `SR-020` |
| **Student** | Student | Dashboard Stats | `GET` | `/api/student/dashboard` | Yes (Student) | None | `{ success: true, stats: { ... } }` | 401 Unauthorized, 403 Forbidden | `SR-015` |
| **Student** | Student | Issued Books | `GET` | `/api/student/issued-books` | Yes (Student) | None | `{ success: true, issuedBooks: [...] }` | 401 Unauthorized, 403 Forbidden | `SR-015` |
| **Student** | Student | Loan History | `GET` | `/api/student/history` | Yes (Student) | None | `{ success: true, history: [...] }` | 401 Unauthorized, 403 Forbidden | `SR-016` |
| **Circulation**| Both | Issue Book | `POST` | `/api/circulation/issue` | Yes (Bearer) | `{ bookId, studentId? }` | `{ success: true, transactionId, message }` | 400 Out of stock, 400 Duplicate title | `SR-010`, `SR-011`, `SR-012` |
| **Circulation**| Both | Return Book | `POST` | `/api/circulation/return` | Yes (Bearer) | `{ transactionId }` | `{ success: true, message }` | 400 Invalid transaction, 404 | `SR-013`, `SR-014` |
| **Librarian** | Librarian | Dashboard Stats | `GET` | `/api/librarian/dashboard` | Yes (Librarian)| None | `{ success: true, metrics: { ... }, recentActivity: [...] }` | 401 Unauthorized, 403 Forbidden | `SR-017` |
| **Librarian** | Librarian | Student Directory| `GET` | `/api/librarian/students` | Yes (Librarian)| Query: `?query=...` | `{ success: true, students: [...] }` | 401 Unauthorized, 403 Forbidden | `SR-021` |
| **Librarian** | Librarian | Student Profile | `GET` | `/api/librarian/students/:id` | Yes (Librarian)| Param: `id` | `{ success: true, student, issuedBooks, history }` | 403 Forbidden, 404 Not Found | `SR-021` |
| **Librarian** | Librarian | Circulation Log | `GET` | `/api/circulation/records` | Yes (Librarian)| Query: `?status=...` | `{ success: true, records: [...] }` | 401 Unauthorized, 403 Forbidden | `SR-LIB-03` |

*(Note: Exact endpoint naming adheres strictly to TRD/SRD specifications. Minor path adjustments, if required during coding, are developer implementation decisions).*

---

## 6. Backend Data Flow

The backend enforces a consistent, deterministic request-response flow across all workflows:

```
+-----------------------------------------------------------------------------------+
|                            GENERIC DATA FLOW PIPELINE                             |
+-----------------------------------------------------------------------------------+

   HTTP Request (Frontend Client)
         │
         ▼
   [1. Express Route Parser] ──> Matches URI and HTTP verb
         │
         ▼
   [2. Auth Middleware]      ──> Validates Bearer JWT; attaches req.user (401 if invalid)
         │
         ▼
   [3. Role Middleware]      ──> Verifies req.user.role matches allowed role (403 if invalid)
         │
         ▼
   [4. Validation Middleware]──> Validates body/params/query formats (422 if invalid)
         │
         ▼
   [5. Controller Layer]     ──> Extracts parameters; passes clean data to Domain Service
         │
         ▼
   [6. Service Layer]        ──> Executes business logic & invariant checks (400 if failed)
         │
         ▼
   [7. Data Access Layer]    ──> Executes parameterized SQL query via mysql2 pool
         │
         ▼
   [8. Database Layer]       ──> MySQL performs operation; commits transaction
         │
         ▼
   [9. Response Dispatch]    ──> Controller formats standardized JSON payload
         │
         ▼
   HTTP 200/201 Response (Frontend Client)
```

### 6.1 Data Flow for Major Workflows
1. **Student Registration**: Frontend $\rightarrow$ `/api/auth/student/register` $\rightarrow$ Validate Inputs $\rightarrow$ Check Unique Email/ID $\rightarrow$ Bcrypt Hash $\rightarrow$ SQL Insert $\rightarrow$ Return 201 Created.
2. **Book Search**: Frontend $\rightarrow$ `/api/books?query=...` $\rightarrow$ Auth Middleware $\rightarrow$ Books Controller $\rightarrow$ Books Service $\rightarrow$ Parameterized Search Query $\rightarrow$ Return 200 OK with copy counts.
3. **Book Issue**: Frontend $\rightarrow$ `/api/circulation/issue` $\rightarrow$ Auth Middleware $\rightarrow$ Issue Controller $\rightarrow$ Circulation Service $\rightarrow$ Begin Transaction $\rightarrow$ Check Available $\ge 1$ $\rightarrow$ Check No Duplicate Active Loan $\rightarrow$ Insert Issue Record $\rightarrow$ Decrement Available Copies $\rightarrow$ Commit $\rightarrow$ Return 201 Created.
4. **Book Return**: Frontend $\rightarrow$ `/api/circulation/return` $\rightarrow$ Auth Middleware $\rightarrow$ Return Controller $\rightarrow$ Circulation Service $\rightarrow$ Begin Transaction $\rightarrow$ Verify Active Loan $\rightarrow$ Update Status to `RETURNED` $\rightarrow$ Increment Available Copies $\rightarrow$ Commit $\rightarrow$ Return 200 OK.
5. **Safe Book Deletion**: Frontend $\rightarrow$ `DELETE /api/books/:id` $\rightarrow$ Auth Middleware $\rightarrow$ Librarian Role Middleware $\rightarrow$ Book Controller $\rightarrow$ Book Service $\rightarrow$ Check $\text{Available Copies} == \text{Total Copies}$ $\rightarrow$ If copies issued: Return 400 Bad Request $\rightarrow$ If all present: SQL Delete/Archive $\rightarrow$ Return 200 OK.

---

## 7. Backend Folder Structure Plan

The planned backend project layout implements a modular, clean architectural separation. *(Note: These files and folders will be created in the implementation phase, not now)*:

```
backend/
├── .env.example                  # Environment variable template
├── .gitignore                    # Node modules and environment ignore rules
├── package.json                  # Dependencies and script definitions
├── package-lock.json             # Locked dependency tree
└── src/
    ├── app.js                    # Express app configuration & middleware pipeline
    ├── server.js                 # HTTP server listener entry point
    ├── config/
    │   └── db.js                 # MySQL connection pool configuration
    ├── middleware/
    │   ├── auth.js               # JWT authentication verification middleware
    │   ├── role.js               # Role-based authorization guard middleware
    │   ├── validate.js           # Request payload validation middleware
    │   └── errorHandler.js       # Centralized error formatting middleware
    ├── routes/
    │   ├── authRoutes.js         # /api/auth routes
    │   ├── bookRoutes.js         # /api/books routes
    │   ├── studentRoutes.js      # /api/student routes
    │   ├── librarianRoutes.js    # /api/librarian routes
    │   └── circulationRoutes.js  # /api/circulation routes
    ├── controllers/
    │   ├── authController.js     # Authentication request handling
    │   ├── bookController.js     # Book catalog request handling
    │   ├── studentController.js  # Student portal request handling
    │   ├── librarianController.js# Administrative request handling
    │   └── circulationController.js # Issue and return request handling
    ├── services/
    │   ├── authService.js        # Credential validation & registration domain logic
    │   ├── bookService.js        # Catalog business rules & invariant enforcement
    │   ├── studentService.js     # Student profile & history domain logic
    │   ├── librarianService.js   # Administrative statistics aggregation logic
    │   └── circulationService.js # Transactional issue/return lifecycle logic
    ├── models/
    │   ├── userModel.js          # User SQL queries & data access
    │   ├── bookModel.js          # Book catalog SQL queries & data access
    │   └── transactionModel.js   # Circulation SQL queries & transaction blocks
    └── utils/
        ├── password.js           # Bcrypt hashing and comparison helpers
        └── token.js              # JWT signing and verification helpers
```

---

## 8. Phase Dependencies

The backend development phases must be executed in strict dependency order:

```
[Phase 1: Project Initialization]
       │
       ▼
[Phase 2: Database Integration]
       │
       ▼
[Phase 3: Auth & Authorization]
       │
       ├─────────────────────────────────────────┐
       ▼                                         ▼
[Phase 4: Student Features]               [Phase 5: Librarian Features]
       │                                         │
       └────────────────────┬────────────────────┘
                            │
                            ▼
                 [Phase 6: Book Management APIs]
                            │
                            ▼
                 [Phase 7: Circulation Management]
                            │
                            ▼
                 [Phase 8: Validation & Error Handling]
                            │
                            ▼
                 [Phase 9: Security Hardening]
                            │
                            ▼
                 [Phase 10: Testing Preparation]
                            │
                            ▼
                 [Phase 11: Backend Integration]
                            │
                            ▼
                 [Phase 12: Completion & Review]
```

### Dependency Rules:
1. **Phase 2 requires Phase 1**: Cannot connect to the database without Express and environment setup.
2. **Phase 3 requires Phase 2**: Cannot store users or authenticate without the database pool.
3. **Phases 4, 5, 6, and 7 require Phase 3**: Domain endpoints require authentication and role middleware.
4. **Phase 7 requires Phase 6**: Circulation transactions depend on the existence of catalog book records and availability counters.
5. **Phase 8 and 9 cross-cut all modules**: Formal validation and security policies harden endpoints developed in Phases 3–7.
6. **Phases 10, 11, and 12 complete the build**: Testing and verification require all functional components to be constructed.

---

## 9. Backend Development Order

To maximize engineering efficiency, developers must follow this exact step-by-step sequence:

1. **Step 1 (Environment & Server)**: Initialize project, install dependencies, configure `.env`, establish `app.js` and `server.js`, verify `/api/health`.
2. **Step 2 (Database Pool)**: Configure `mysql2` pool in `src/config/db.js`, test database connectivity.
3. **Step 3 (Auth Utilities & Middleware)**: Implement `bcrypt` password helpers, JWT token helpers, `auth.js` middleware, and `role.js` middleware.
4. **Step 4 (User Data Access & Auth Endpoints)**: Implement `userModel.js`, `authService.js`, `authController.js`, and `authRoutes.js`. Verify student registration and login via API client.
5. **Step 5 (Book Data Access & Search)**: Implement `bookModel.js`, `bookService.js`, `bookController.js`, and `bookRoutes.js` for catalog search and details retrieval.
6. **Step 6 (Librarian Book Management)**: Implement Add Book, Edit Book, and Safe Delete Book (with copy invariants) on book routes.
7. **Step 7 (Circulation Transactions)**: Implement `transactionModel.js`, `circulationService.js`, and `circulationController.js` wrapping Issue Book (decrement stock, check duplicate loan) and Return Book (increment stock) in atomic SQL transactions.
8. **Step 8 (Student Specific Endpoints)**: Implement Student Dashboard, Issued Books list, and History views.
9. **Step 9 (Librarian Specific Endpoints)**: Implement Librarian Dashboard metrics, Student Directory inspection, and Master Circulation Log.
10. **Step 10 (Centralized Validation & Errors)**: Add validation middleware on all mutation routes; implement global error handler in `errorHandler.js`.
11. **Step 11 (Security Audit)**: Audit all SQL queries for parameterization; configure Helmet and CORS; audit student data isolation.
12. **Step 12 (Integration Verification)**: Execute full automated/manual API test suite; verify readiness checklist.

---

## 10. Backend Definition of Done (DoD)

The backend implementation is considered complete only when all criteria below are verified:

- [ ] **Initialization**: Server starts cleanly via `npm start` and `npm run dev` with zero unhandled errors.
- [ ] **Database Connectivity**: Connection pool successfully connects to MySQL and recovers gracefully from drops.
- [ ] **Authentication**: Student registration succeeds with hashed passwords; login succeeds with valid credentials; invalid credentials rejected with 401.
- [ ] **Authorization Enforcement**: Students receive HTTP 403 Forbidden on all Librarian endpoints; unauthenticated requests receive 401.
- [ ] **Data Scoping**: Students cannot access other students' records (all queries strictly scoped to authenticated token `userId`).
- [ ] **Catalog Management**: Add Book initializes Available $=$ Total; Edit Book protects circulating copies; Delete Book is hard-blocked when copies are issued.
- [ ] **Circulation Transactions**: Book issue atomically decrements Available Copies by 1; book return atomically increments Available Copies by 1.
- [ ] **Business Rules Enforced**: Book issue blocked when Available Copies $= 0$ (RULE-003); duplicate active title loan blocked (RULE-008); safe deletion enforced (RULE-007).
- [ ] **No SQL Injections**: 100% of SQL queries utilize parameterized inputs via `mysql2`.
- [ ] **Standard Error Responses**: All errors return structured JSON envelopes with appropriate semantic HTTP status codes.
- [ ] **Traceability**: 100% of SRD requirements (`SR-001` through `SR-022`) are implemented and verified.

---

## 11. Requirement Traceability

The following matrix maps the backend implementation phases back to the approved project requirements:

| Backend Implementation Phase | Covered SRD Requirements | Covered TRD Requirements | Covered PRD Requirements | Covered FRD Requirements | Covered BRD Requirements |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Phase 1: Project Init** | `SR-SEC-04` | `TR-BE-01`, `03` | `PR-020` | `FR-022` | `BR-002` |
| **Phase 2: Database Integration**| `SR-011`, `014` | Section 10, 18 | Section 21 | Section 14 | `BR-005`, `006`, `BKM` |
| **Phase 3: Auth & Authorization**| `SR-001`–`006`, `SR-022` | `TR-AUTH-01`–`06` | `PR-001`–`004`, `PR-020`| `FR-001`–`004`, `FR-022` | `BR-001`, `002`, `AUT` |
| **Phase 4: Student Features** | `SR-015`, `SR-016` | Section 8.3 | `PR-005`, `012`, `014` | `FR-005`, `010`, `012` | `BR-007`, `STU-006`, `008`|
| **Phase 5: Librarian Features** | `SR-017`, `SR-021` | Section 8.5 | `PR-006`, `PR-018` | `FR-006`, `FR-016` | `BR-008`, `009`, `LIB-006`|
| **Phase 6: Book Management** | `SR-007`–`009`, `018`–`020`| Section 8.2 | `PR-007`, `008`, `015`–`017`| `FR-007`, `008`, `013`–`015`| `BR-003`, `004`, `BKM-001`–`005`|
| **Phase 7: Circulation** | `SR-010`–`014` | Section 8.4, `TR-DATA-04`| `PR-009`–`011`, `PR-013`| `FR-009`, `FR-011` | `BR-005`, `006`, `CIR-001`–`005`|
| **Phase 8: Validation & Errors** | Section 10, 11 | Section 12, 13 | Section 24, 25 | Section 15, 16 | Section 18 |
| **Phase 9: Security Hardening** | `SR-SEC-01`–`05` | Section 14 | Section 25 | Section 18.1 | Section 18.1 |
| **Phase 10: Testing Preparation** | Section 18 | Section 32 | Section 24 | Section 19 | Section 23 |
| **Phase 11: Integration** | Section 14 | Section 26 | Section 26 | Section 20 | Section 20 |
| **Phase 12: Completion** | Section 17 | Section 31, 32 | Section 30, 31 | Section 20 | Section 25 |

---

## 12. Risks and Open Technical Decisions

The following items represent unresolved technical decisions from the approved documents that must be settled during coding:

| Decision ID | Topic | Context & Developer Decision Framework | Status |
| :--- | :--- | :--- | :--- |
| **DEC-01** | **Due Date Calculation** | The BRD/FRD/SRD requires an expected due date for every issue, but does not define a fixed duration.<br>• *Implementation Rule*: If no duration is passed by the client or configured in `.env`, the service will assign a standard due date placeholder or accept a date parameter from the request. | To be decided during implementation |
| **DEC-02** | **Overall Borrowing Limit** | The approved baseline enforces RULE-008 (no duplicate copies of the same title) but defines no overall numerical limit on total borrowed books.<br>• *Implementation Rule*: The backend will enforce RULE-008 strictly; additional borrowing caps will only be enforced if institutional policy is specified. | To be decided during implementation |
| **DEC-03** | **Student Request Workflow Interaction** | Approved documents allow students to request/issue books and librarians to issue books.<br>• *Implementation Rule*: Endpoint `/api/circulation/issue` supports direct issuance for both Student and Librarian roles. | To be decided during implementation |
| **DEC-04** | **Student Return Workflow Interaction** | Approved documents allow students to return books and librarians to accept returns.<br>• *Implementation Rule*: Endpoint `/api/circulation/return` processes the return transaction and stock increment when invoked by an authorized user. | To be decided during implementation |
| **DEC-05** | **Initial Librarian Account Setup** | Because there is no Admin role and students self-register, how the first Librarian account is established.<br>• *Implementation Rule*: A database seed script or administrative CLI utility will be used during database setup to insert the initial librarian record. | To be decided during implementation |
| **TECH-DEC-01**| **JWT Client Storage Strategy** | Whether JWT is stored in client `localStorage` or `httpOnly` secure cookie.<br>• *Implementation Rule*: Standard Authorization Bearer header supported; developer may choose cookie or header approach during integration. | To be decided during implementation |

---
*End of Backend Implementation Plan*
