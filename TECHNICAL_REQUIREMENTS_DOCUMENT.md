# TECHNICAL REQUIREMENTS DOCUMENT (TRD)
## Student Library Management System (SLMS)

---

## 1. Document Control

### 1.1 Document Information
| Field | Details |
| :--- | :--- |
| **Document Name** | Technical Requirements Document (TRD) |
| **Project Name** | Student Library Management System (SLMS) |
| **Document Version** | 1.0 (Baseline Technical Architecture) |
| **Date** | October 4, 2026 |
| **Document Status** | Approved Technical Specification |
| **Source Documents** | `BUSINESS_REQUIREMENTS_DOCUMENT.md` (v1.0), `FUNCTIONAL_REQUIREMENTS_DOCUMENT.md` (v1.2), `PRODUCT_REQUIREMENTS_DOCUMENT.md` (v1.0) |
| **Author / Role** | Senior Software Architect & Technical Requirements Engineer |
| **Intended Audience** | Lead Architects, Frontend Engineers, Backend Engineers, Database Engineers, QA Automation Leads, Academic Evaluators |

### 1.2 Revision History
| Version | Date | Author | Description of Change | Status |
| :--- | :--- | :--- | :--- | :--- |
| 1.0 | 2026-10-04 | Senior Software Architect | Initial technical baseline translating approved BRD, FRD, and PRD into system-level technical requirements. Establishes the React + Node.js/Express + MySQL architectural foundation for two application roles (Student and Librarian). | Approved Baseline |

### 1.3 Baseline Reference & Compliance
This document serves as the authoritative technical specification for the Student Library Management System. All architectural layers, component boundaries, API contracts, data models, and security controls defined herein adhere strictly to the functional rules and constraints established in the approved BRD, FRD, and PRD. 

Under no circumstances does this document modify approved business rules, invent numerical borrowing limits, specify arbitrary loan durations, introduce counter verification protocols, or add unauthorized user roles.

---

## 2. Technical Overview

### 2.1 System Type
The **Student Library Management System (SLMS)** is a web-based, client-server application built on a decoupled, three-tier architectural paradigm. The application features a Single Page Application (SPA) frontend communicating over a stateless RESTful Application Programming Interface (API) to a modular backend service, backed by a persistent relational database.

### 2.2 Overall Technical Approach
* **Client-Side (Presentation)**: Built with **React** to deliver a responsive, component-driven, and high-performance user interface. Navigation is handled client-side, while communication with the backend is mediated via asynchronous HTTP requests.
* **Server-Side (Application & Logic)**: Built with **Node.js** and the **Express.js** web framework. The backend encapsulates business rules, authentication verification, role authorization, request validation, transaction coordination, and error dispatching.
* **Data Storage (Persistence)**: Powered by **MySQL**, enforcing strong referential integrity, ACID transactional guarantees for book circulation events, and structured indexing for catalog search performance.
* **Authentication & Identity**: Secured using credential-based **Email + Password** authentication. Passwords are cryptographic hashes (using industry-standard hashing algorithms); authenticated user state is managed via secure, signed token mechanisms (e.g., JSON Web Tokens) passed in standardized authorization headers.

---

## 3. Technology Stack

The planned technology stack is selected to balance modern web engineering standards, developer ergonomics, long-term maintainability, and college project evaluation requirements.

```
+-----------------------------------------------------------------------------------+
|                           PLANNED TECHNOLOGY STACK                                |
+-----------------------------------------------------------------------------------+
|  TIER / DOMAIN        | SELECTED TECHNOLOGY   | PURPOSE                           |
+-----------------------+-----------------------+-----------------------------------+
|  Frontend Framework   | React                 | Component-driven SPA architecture |
|  Frontend Routing     | React Router          | Client-side declarative routing   |
|  Language             | JavaScript (ES6+)     | Standard language across stack    |
|  Styling & Theme      | CSS3 (Modern B&W)     | Custom monochrome high-contrast   |
|  HTTP Client          | Axios / Fetch API     | Asynchronous REST API integration |
|  Backend Runtime      | Node.js (LTS)         | High-throughput event-driven I/O  |
|  Backend Framework    | Express.js            | Modular REST routing & middleware |
|  Database Engine      | MySQL (8.0+)          | ACID relational data persistence  |
|  Database Driver      | mysql2                | High-performance pooled client    |
|  Password Hashing     | bcrypt                | Adaptive one-way salted hashing   |
|  Token Management     | jsonwebtoken (JWT)    | Stateless signed bearer tokens    |
|  Environment Config   | dotenv                | Environment variable isolation    |
|  Version Control      | Git & GitHub          | Source code revision control      |
|  Package Manager      | npm                   | Dependency lifecycle management   |
+-----------------------------------------------------------------------------------+
```

### 3.1 Frontend Stack Details
* **React**: Chosen for declarative state management, virtual DOM efficiency, and reusable component modularity across Student and Librarian views.
* **React Router**: Manages client-side routing, protected route guarding, and programmatic redirection between the Student Portal and Librarian Console.
* **HTTP Client**: Axios (or standard browser Fetch API) configured with centralized request interceptors for token attachment and response error handling.
* **Styling**: Modern, high-contrast Black & White CSS architecture using native CSS variables for typography, spacing, and monochrome borders.

### 3.2 Backend Stack Details
* **Node.js + Express.js**: Provides a lightweight, unopinionated foundation for building RESTful micro-controllers, custom middleware pipelines, and structured routing controllers.
* **REST API Approach**: Clean, resource-oriented endpoint architecture following JSON-RPC/REST guidelines with standard HTTP verbs (`GET`, `POST`, `PUT`, `DELETE`).

### 3.3 Database Stack Details
* **MySQL**: Relational database management system providing robust schema enforcement, foreign key constraints, unique indexes, and ACID transaction isolation for stock decrement/increment operations.
* **Driver (`mysql2`)**: Direct promise-based MySQL driver utilizing connection pooling to deliver optimal query performance and transparent parameterization without heavy ORM overhead.

---

## 4. Technical Architecture Overview

The system implements a classic **Layered (N-Tier) Architecture** to ensure clean separation of concerns, testability, and decoupled maintenance:

```
+-----------------------------------------------------------------------------------+
|                        SYSTEM ARCHITECTURAL LAYERS                                |
+-----------------------------------------------------------------------------------+

   [PRESENTATION LAYER]
   React Single Page Application (SPA)
   ├── Student Portal Views (Dashboard, Search, Issued Books, History)
   ├── Librarian Console Views (Dashboard, Catalog Management, Students, Circulation)
   └── Shared UI Components (Navigation, Search Bar, Modals, Forms, Alerts)
            │
            ▼ (HTTPS / JSON REST API Calls)
   [API & ROUTING LAYER]
   Express.js Web Application
   ├── Route Definitions (/api/auth, /api/books, /api/student, /api/librarian)
   └── Middleware Pipeline (CORS, Request Parsing, Auth, Role Authorization)
            │
            ▼
   [BUSINESS LOGIC & SERVICE LAYER]
   Application Domain Services
   ├── Authentication Service (Credential validation, Token generation)
   ├── Catalog Service (Book CRUD, Inventory invariant validation)
   ├── Circulation Service (Issue processing, Return acceptance, Stock sync)
   └── Student Management Service (Directory query, Profile collation)
            │
            ▼
   [DATA ACCESS LAYER (DAL)]
   Database Abstraction & Query Execution
   ├── Pooled Database Connections (mysql2 pool)
   ├── Parameterized SQL Queries (SQL Injection Prevention)
   └── ACID Transaction Wrappers (BEGIN, COMMIT, ROLLBACK)
            │
            ▼ (TCP / SQL Sockets)
   [PERSISTENCE LAYER]
   MySQL Relational Database
   ├── Structured User, Book, and Transaction Tables
   └── Relational Constraints, Foreign Keys, and Secondary Indexes
```

### 4.1 Layer Responsibilities
1. **Presentation Layer (Client)**: Renders the user interface, manages client-side form validation, captures user interactions, stores session tokens in secure client memory/storage, and presents data received from backend endpoints.
2. **API & Routing Layer (Server Gateway)**: Receives HTTP requests, parses JSON payloads, handles Cross-Origin Resource Sharing (CORS), intercepts unauthenticated requests, and dispatches validated requests to appropriate controller functions.
3. **Business Logic Layer (Domain Services)**: Executes core business rules (e.g., verifying that a book has available copies before issuing, verifying that a student does not hold multiple copies of the same title, checking that a book has zero active loans before deletion).
4. **Data Access Layer (DAL)**: Isolates database communication. Executes parameterized queries using connection pools and wraps multi-step circulation operations in atomic database transactions.
5. **Persistence Layer (MySQL)**: Permanently stores entities, enforces relational referential integrity, indexes searchable text attributes, and guarantees transaction durability.

---

## 5. Application Components

### 5.1 Frontend Technical Modules
* **Authentication Module**: Registration form, Student login view, Librarian login view, logout handler, Auth Context provider, and token management utilities.
* **Student Module**: Student dashboard view, currently issued books list, book return trigger, and personal borrowing history ledger.
* **Librarian Module**: Librarian dashboard, student directory view, individual student profile inspection, and master circulation records log.
* **Book Search & Catalog Module**: Global keyword search bar, category filter controls, search result cards/tables, and book details view with real-time stock pills.
* **Book Management Module**: Add Book modal/form, Edit Book modal/form, and safe Delete Book confirmation modal with loan-blocking guards.
* **Circulation Module**: Issue Book modal/form, student borrow request trigger, return confirmation modal, and status badge components.
* **Shared Component Library**: App header, navigation bar, modal dialogs, loading skeletons, error notification banners, and responsive Black & White data tables.

### 5.2 Backend Technical Modules
* **Auth Controller & Middleware**: Verifies incoming credentials, generates signed JWTs, verifies bearer tokens on protected endpoints, and extracts user identity into request context.
* **Role Authorization Middleware**: Validates that the authenticated user possesses the specific role (`Student` vs. `Librarian`) required for the target endpoint.
* **Book Controller & Service**: Handles catalog queries, metadata creation, metadata updates, and safe deletion checks.
* **Circulation Controller & Service**: Coordinates transactional issue and return operations, atomic inventory decrement/increment, and transaction history logging.
* **Student Controller & Service**: Serves individual student profiles, personal active loans, personal history, and administrative student directory listings.
* **Error Handling Middleware**: Centralized global exception handler transforming unhandled errors into standardized, sanitized JSON error responses.

### 5.3 Database Logical Data Groupings
* **User Identity Data**: Stores student profiles, librarian credentials, hashed passwords, roles, and registration metadata.
* **Book Catalog Data**: Stores bibliographic attributes (Title, Author, ISBN, Category, Publisher) along with Total Copies and Available Copies counts.
* **Circulation Transaction Data**: Stores immutable records of every book issue and return event (Transaction ID, Student reference, Book reference, Issue Date, Due Date, Return Date, Status).

---

## 6. User Roles and Technical Authorization

The application recognizes strictly two user roles. There is no Admin role.

```
+-----------------------------------------------------------------------------------+
|                        TECHNICAL AUTHORIZATION MATRIX                             |
+-----------------------------------------------------------------------------------+
|  OPERATION / RESOURCE PATH              | STUDENT ROLE        | LIBRARIAN ROLE    |
+-----------------------------------------+---------------------+-------------------+
|  POST /api/auth/student/register        | Public / Allow      | Prohibited        |
|  POST /api/auth/student/login           | Public / Allow      | Prohibited        |
|  POST /api/auth/librarian/login         | Prohibited          | Public / Allow    |
|  POST /api/auth/logout                  | Authenticated Allow | Authenticated Allow|
|  GET  /api/books (Search/Browse)        | Authenticated Allow | Authenticated Allow|
|  GET  /api/books/:id (View Details)     | Authenticated Allow | Authenticated Allow|
|  POST /api/books (Add Book)             | DENY (403 Forbidden)| Authenticated Allow|
|  PUT  /api/books/:id (Edit Book)        | DENY (403 Forbidden)| Authenticated Allow|
|  DELETE /api/books/:id (Delete Book)    | DENY (403 Forbidden)| Authenticated Allow|
|  GET  /api/student/dashboard            | Authenticated Allow | DENY (403)        |
|  GET  /api/student/issued-books         | Authenticated Allow | DENY (403)        |
|  POST /api/circulation/issue            | Authenticated Allow | Authenticated Allow|
|  POST /api/circulation/return           | Authenticated Allow | Authenticated Allow|
|  GET  /api/student/history              | Authenticated Allow | DENY (403)        |
|  GET  /api/librarian/dashboard          | DENY (403 Forbidden)| Authenticated Allow|
|  GET  /api/librarian/students           | DENY (403 Forbidden)| Authenticated Allow|
|  GET  /api/librarian/students/:id       | DENY (403 Forbidden)| Authenticated Allow|
|  GET  /api/circulation/records          | DENY (403 Forbidden)| Authenticated Allow|
+-----------------------------------------------------------------------------------+
```

### 6.1 Backend Enforcement Mandate
* Authorization must be verified **server-side** on every single private API invocation.
* Client-side route guarding in React provides a seamless user experience, but provides zero security without server-side verification.
* Any request carrying a `Student` role token sent to a Librarian-only endpoint must immediately fail with HTTP 403 Forbidden.
* Any request attempting to access another student's data must be scoped strictly to the authenticated `userId` extracted from the token, preventing Insecure Direct Object References (IDOR).

---

## 7. Authentication Requirements

```
+-----------------------------------------------------------------------------------+
|                          AUTHENTICATION ARCHITECTURE                              |
+-----------------------------------------------------------------------------------+

  [Student Registration Flow]
  Client submits { fullName, studentId, email, password }
       │
       ▼
  Backend validates email/studentId uniqueness
       │
       ▼
  Password hashed using bcrypt (cost factor >= 10)
       │
       ▼
  Record stored in database with role = 'Student' -> Returns 201 Created

  [Login & Session Flow]
  Client submits { email, password }
       │
       ▼
  Backend verifies email exists & compares bcrypt hash
       │
       ▼
  Backend generates signed JWT containing { userId, role, email, studentId }
       │
       ▼
  Token returned in JSON payload -> Client attaches as Bearer token in headers
```

### 7.1 Technical Requirements
* **TR-AUTH-01 (Password Security)**: Passwords must be hashed using `bcrypt` (or `argon2`) with a salt round / cost factor of at least 10 prior to storage. Plaintext passwords must never be stored, logged, or cached.
* **TR-AUTH-02 (Token Issuance)**: Upon successful credential verification, the server issues a signed JSON Web Token (JWT) using a cryptographically secure secret key.
* **TR-AUTH-03 (Token Payload)**: The JWT payload must be minimal and non-sensitive, containing only: `userId`, `role` (`Student` or `Librarian`), `email`, and `studentId` (for students).
* **TR-AUTH-04 (Token Transmission)**: The client must attach the JWT to all authenticated requests using the standard HTTP header: `Authorization: Bearer <token>`.
* **TR-AUTH-05 (Session Invalidation / Logout)**: Client-side logout clears the stored token from client state. The server-side authentication middleware rejects expired or malformed tokens.
* **TR-AUTH-06 (Protection Against Enumeration)**: Authentication failures for invalid emails or passwords must return a generic error message: *"Invalid email or password"* with HTTP 401 Unauthorized.

---

## 8. API Requirements

The REST API is organized into five functional modules:

### 8.1 Authentication APIs
| Method | Endpoint | Actor | Auth Required | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/student/register` | Prospective Student | Public | Validates student data, hashes password, creates student record. |
| `POST` | `/api/auth/student/login` | Student | Public | Verifies student credentials, returns signed JWT. |
| `POST` | `/api/auth/librarian/login` | Librarian | Public | Verifies librarian credentials, returns signed JWT. |
| `POST` | `/api/auth/logout` | Any User | Bearer Token | Informs client of session closure; cleans client state. |

### 8.2 Book Catalog APIs
| Method | Endpoint | Actor | Auth Required | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/books` | Student, Librarian | Bearer Token | Searches and filters catalog by title, author, category, ISBN. |
| `GET` | `/api/books/:id` | Student, Librarian | Bearer Token | Retrieves full bibliographic metadata and copy counts for a book. |
| `POST` | `/api/books` | Librarian | Librarian Token | Creates a new catalog book record; initializes available copies. |
| `PUT` | `/api/books/:id` | Librarian | Librarian Token | Updates metadata and adjusts copy counts (guarded against active loans). |
| `DELETE`| `/api/books/:id` | Librarian | Librarian Token | Deletes book record (strictly blocked if copies are issued). |

### 8.3 Student APIs
| Method | Endpoint | Actor | Auth Required | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/student/dashboard` | Student | Student Token | Returns student profile, active loan counts, and quick alerts. |
| `GET` | `/api/student/issued-books` | Student | Student Token | Returns list of books currently issued to the authenticated student. |
| `GET` | `/api/student/history` | Student | Student Token | Returns permanent borrowing history for the authenticated student. |

### 8.4 Issue & Return APIs
| Method | Endpoint | Actor | Auth Required | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/circulation/issue` | Student, Librarian | Bearer Token | Processes book issuance; verifies availability, creates loan, decrements stock. |
| `POST` | `/api/circulation/return` | Student, Librarian | Bearer Token | Processes book return; updates status, logs return date, increments stock. |

### 8.5 Librarian Administrative APIs
| Method | Endpoint | Actor | Auth Required | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/librarian/dashboard` | Librarian | Librarian Token | Returns overall operational metrics (titles, copies, loans, students). |
| `GET` | `/api/librarian/students` | Librarian | Librarian Token | Returns directory of registered students with search filter support. |
| `GET` | `/api/librarian/students/:id` | Librarian | Librarian Token | Returns specific student profile, active loans, and borrowing history. |
| `GET` | `/api/circulation/records` | Librarian | Librarian Token | Returns master circulation logs across all transactions with filtering. |

---

## 9. API Design Standards

### 9.1 REST Conventions & Media Types
* All endpoints must follow standard RESTful naming conventions using plural nouns (e.g., `/api/books`, `/api/circulation/records`).
* All request and response payloads must use `Content-Type: application/json`.
* Dates and timestamps must be formatted using ISO 8601 strings (e.g., `YYYY-MM-DDTHH:mm:ss.sssZ`).

### 9.2 Standard HTTP Status Codes
* `200 OK`: Successful resource retrieval, update, or general operation.
* `201 Created`: Successful creation of a resource (registration, book creation, issue creation).
* `400 Bad Request`: Malformed syntax, invalid payload, or business rule violation (e.g., duplicate title issue, book out of stock).
* `401 Unauthorized`: Missing, expired, or invalid authentication token.
* `403 Forbidden`: Authenticated user lacks the required role (e.g., student requesting librarian endpoint).
* `404 Not Found`: Requested resource (book ID, student ID, transaction ID) does not exist.
* `409 Conflict`: Unique constraint violation (duplicate email, duplicate student ID, duplicate ISBN).
* `422 Unprocessable Entity`: Input validation failure (missing required fields, invalid email format).
* `500 Internal Server Error`: Unhandled server exception or database connectivity error.

### 9.3 Standard Response Payloads
All responses must follow a structured envelope format:

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}
```

Standard error envelope:
```json
{
  "success": false,
  "error": {
    "code": "BOOK_OUT_OF_STOCK",
    "message": "Cannot issue book: No copies currently available."
  }
}
```

---

## 10. Database Technical Requirements

### 10.1 Logical Entity Identification
The database architecture must support five primary logical entities derived directly from the approved FRD:

1. **User / Student Entity**: Captures student credentials, identity attributes, and account status.
   * Logical Attributes: Unique User Identifier, Full Name, Student ID (unique), Email Address (unique), Password Hash, Role (`Student`), Registration Timestamp.
2. **Librarian Entity**: Captures librarian administrative credentials and identity.
   * Logical Attributes: Unique Librarian Identifier, Full Name, Email Address (unique), Password Hash, Role (`Librarian`), Creation Timestamp.
   *(Note: Student and Librarian may share a unified user authentication structure with a `role` discriminator).*
3. **Book Entity**: Captures bibliographic and inventory counts.
   * Logical Attributes: Unique Book Identifier, Title, Author, ISBN / Book Code (unique), Category / Subject, Publisher, Total Copies, Available Copies, Timestamps.
4. **Circulation Transaction Entity**: Captures the complete borrowing and return lifecycle.
   * Logical Attributes: Unique Transaction Identifier, Student Reference, Book Reference, Issue Timestamp, Due Date, Return Timestamp, Status (`ISSUED`, `RETURNED`).

### 10.2 Logical Entity Relationships
* **User to Transaction**: One-to-Many ($1 : N$). A student may have multiple historical circulation transaction records over time.
* **Book to Transaction**: One-to-Many ($1 : N$). A book title may be involved in multiple circulation transactions across different students.
* **Integrity Constraints**: Hard foreign keys link Transaction records to User and Book records. Cascading deletes on circulating books are strictly forbidden.

---

## 11. Data Integrity Requirements

* **TR-DATA-01 (Unique Identifiers)**: The database must enforce strict uniqueness constraints on:
  * User Email Address (case-insensitive).
  * Student Identification Number.
  * Book ISBN / Accession Number.
* **TR-DATA-02 (Stock Counter Invariants)**:
  * For every book record: $\text{Available Copies} \le \text{Total Copies}$ and $\text{Available Copies} \ge 0$.
  * Total Copies must be an integer $\ge 1$.
* **TR-DATA-03 (Referential Integrity)**:
  * Foreign keys must prevent the deletion of a Student profile if active issued book records exist.
  * Foreign keys must prevent the deletion of a Book record if active issued transaction records exist.
* **TR-DATA-04 (ACID Transaction Wrapping)**:
  * All issue operations (inserting the transaction record AND decrementing Available Copies) must execute inside a single database transaction (`BEGIN ... COMMIT`).
  * All return operations (updating the transaction record AND incrementing Available Copies) must execute inside a single database transaction (`BEGIN ... COMMIT`).
  * If any step fails, the entire transaction is rolled back (`ROLLBACK`), preventing phantom inventory drift.

---

## 12. Validation Requirements

The backend must execute rigorous input validation independent of client-side validation:

| Operation | Target Field(s) | Backend Validation Rule |
| :--- | :--- | :--- |
| **Registration** | Full Name | Required, string, 2–100 characters. |
| **Registration** | Student ID | Required, alphanumeric, unique in database. |
| **Registration** | Email | Required, valid email format regex, unique in database. |
| **Registration** | Password | Required, string, minimum 8 characters. |
| **Login** | Email & Password | Both fields required and non-empty. |
| **Add Book** | Title, Author, Category | Required, non-empty strings. |
| **Add Book** | ISBN | Required, alphanumeric, unique in catalog. |
| **Add Book** | Total Copies | Required, positive integer $\ge 1$. |
| **Edit Book** | Total Copies | Integer $\ge (\text{Total Copies} - \text{Available Copies})$. |
| **Delete Book** | Book Status | Requires $\text{Available Copies} == \text{Total Copies}$ and 0 active issues. |
| **Issue Book** | Book Stock | Requires $\text{Available Copies} \ge 1$. |
| **Issue Book** | Duplicate Loan | Student cannot hold an active copy of the same title (Rule 08). |
| **Return Book** | Transaction Status | Must reference an existing active issue record (`Status = 'ISSUED'`). |

---

## 13. Error Handling Requirements

The system must employ a centralized error-handling strategy that catches exceptions, formats clear feedback, and logs technical details:

```
+------------------------------------------------------------------------------------+
|                         ERROR HANDLING ARCHITECTURE                                |
+------------------------------------------------------------------------------------+
|  CLIENT ERROR (4xx)    | Validation failure, duplicate records, unauthorized access|
|                        | -> Return clean JSON payload with user guidance           |
+------------------------+-----------------------------------------------------------+
|  SERVER ERROR (5xx)    | Database connection timeout, query syntax error           |
|                        | -> Log stack trace internally, return sanitized 500 error  |
+------------------------+-----------------------------------------------------------+
|  SECURITY SAFETY       | Never leak stack traces, database credentials, or server  |
|                        | paths to the client in production responses               |
+------------------------------------------------------------------------------------+
```

* **Standardized Error Middleware**: Express middleware intercepts all unhandled errors passed via `next(err)`.
* **Sanitized Responses**: Internal database error codes and raw stack traces are stripped before sending the response to the client.
* **HTTP Status Code Mapping**: Errors must map to semantic HTTP codes (e.g., validation $\rightarrow 422$, auth $\rightarrow 401$, forbidden $\rightarrow 403$, not found $\rightarrow 404$, business invariant failure $\rightarrow 400$).

---

## 14. Security Requirements

* **TR-SEC-01 (Password Encryption)**: Passwords must be hashed using `bcrypt` with salt rounds $\ge 10$. Plaintext passwords must never be stored in logs or database tables.
* **TR-SEC-02 (SQL Injection Prevention)**: All database interactions must use parameterized queries (prepared statements) provided by the `mysql2` driver. String concatenation for query building is strictly prohibited.
* **TR-SEC-03 (Role Authorization Guards)**: Express middleware must inspect the verified token role before granting access to Librarian-only routes.
* **TR-SEC-04 (Cross-Origin Resource Sharing - CORS)**: CORS middleware must restrict allowed origins strictly to the authorized frontend URL in production.
* **TR-SEC-05 (Environment Variable Protection)**: Database credentials, JWT secrets, and server ports must be loaded via `.env` files and never committed to source control repositories.
* **TR-SEC-06 (Data Privacy / IDOR Protection)**: Student endpoints must resolve the student identifier from the authenticated token payload, preventing students from querying other students' data by manipulating URL parameters.
* **TR-SEC-07 (Secure HTTP Headers)**: Security headers (e.g., X-Content-Type-Options, X-Frame-Options) should be configured using standard security middleware (e.g., `helmet`).

---

## 15. Frontend Technical Requirements

* **TR-FE-01 (Component Architecture)**: Built using functional React components utilizing standard React hooks (`useState`, `useEffect`, `useContext`, `useCallback`).
* **TR-FE-02 (Routing & Route Guards)**: React Router manages declarative routing. Protected route wrappers inspect the authentication token and role, redirecting unauthenticated users to `/login` and students attempting to view librarian routes to `/student/dashboard`.
* **TR-FE-03 (Centralized Authentication State)**: An `AuthContext` provides global authentication state (`user`, `token`, `role`, `login`, `logout`) across the component tree.
* **TR-FE-04 (API Service Layer)**: Centralized Axios / Fetch service layer handles base URL configuration, bearer token injection, and global response interceptors for 401 expiration handling.
* **TR-FE-05 (Asynchronous Loading & Error States)**: All data-fetching views (catalog search, dashboard metrics, issued books) must present clean loading indicators during fetch and informative error banners upon failure.
* **TR-FE-06 (Client-Side Validation)**: Forms execute immediate client-side validation to provide real-time user guidance before dispatching network requests.

---

## 16. UI Technical Requirements

* **TR-UI-01 (Modern Black & White Visual Theme)**:
  * Strict monochrome color palette: Deep Black (`#000000`, `#111111`), Off-Black (`#1A1A1A`), Crisp White (`#FFFFFF`), Light Gray (`#F5F5F5`, `#F9F9F9`), and Border Gray (`#E0E0E0`, `#D1D1D1`).
  * High-contrast visual elements for maximum readability in academic environments.
* **TR-UI-02 (Typography & Hierarchy)**:
  * Clean, modern sans-serif typography (`Inter`, `system-ui`, or standard system fonts).
  * Distinct typographic scale for headings, body text, metadata labels, and data tables.
* **TR-UI-03 (Layout & Responsiveness)**:
  * Fully responsive CSS Grid and Flexbox layouts adapting across desktop (1440px+), laptop (1024px), tablet (768px), and mobile (375px+).
  * Clean top navigation bar with persistent role branding and logout action.
* **TR-UI-04 (Status Badges)**:
  * High-contrast solid black badge with white text: **"Available"**.
  * Light bordered badge with muted text: **"Unavailable / Out of Stock"**.

---

## 17. Backend Technical Requirements

* **TR-BE-01 (Modular Directory Structure)**: Organized by architectural layers:
  * `routes/`: Endpoint path declarations.
  * `controllers/`: HTTP request handling and response mapping.
  * `services/`: Core business logic and validation invariant enforcement.
  * `middleware/`: Authentication, authorization, and error handling.
  * `config/`: Database connection pool and environment loading.
* **TR-BE-02 (Stateless Services)**: Application servers must remain completely stateless; session context resides within the signed JWT.
* **TR-BE-03 (Express Middleware Pipeline)**:
  1. `cors()`: Origin validation.
  2. `express.json()`: JSON body parsing.
  3. Custom Logging Middleware: Request logging.
  4. Router Middleware: Domain-specific routes.
  5. Global Error Handler: Centralized exception response.

---

## 18. Database Access Requirements

### 18.1 Selected Approach: `mysql2` with Connection Pool
For this project, direct database communication using the **`mysql2`** library (with Promise support and Connection Pooling) is selected as the primary database access mechanism.

### 18.2 Rationale
1. **Lightweight & High Performance**: `mysql2` is the premier, zero-overhead Node.js driver for MySQL, avoiding heavy abstraction penalties.
2. **Explicit SQL Control**: Allows developers to write clear, parameterized queries directly matching academic software engineering expectations.
3. **Transaction Transparency**: Provides direct, unambiguous control over transaction blocks (`await connection.beginTransaction()`, `await connection.commit()`, `await connection.rollback()`), which is essential for demonstrating ACID compliance.
4. **Prepared Statement Security**: Native support for parameterized queries prevents SQL injection vulnerabilities without relying on third-party query builders.

---

## 19. Environment Configuration

All environment-specific variables must be externalized into a `.env` configuration file loaded via `dotenv`:

| Variable Category | Configuration Key | Purpose |
| :--- | :--- | :--- |
| **Server** | `PORT` | Local server listening port (e.g., `5000`). |
| **Server** | `NODE_ENV` | Environment mode (`development` or `production`). |
| **Database** | `DB_HOST` | MySQL database hostname (e.g., `localhost`). |
| **Database** | `DB_PORT` | MySQL database port (e.g., `3306`). |
| **Database** | `DB_USER` | MySQL database username. |
| **Database** | `DB_PASSWORD` | MySQL database user password. |
| **Database** | `DB_NAME` | MySQL target database name (e.g., `slms_db`). |
| **Security** | `JWT_SECRET` | Cryptographic secret for signing tokens. |
| **Security** | `JWT_EXPIRES_IN` | Token validity duration (e.g., `24h`). |
| **CORS** | `CLIENT_URL` | Allowed frontend origin URL (e.g., `http://localhost:3000`). |

---

## 20. Performance Requirements

* **TR-PERF-01 (API Response Latency)**: Average backend API response time should remain under **500 milliseconds** for standard CRUD and search operations under normal academic load.
* **TR-PERF-02 (Catalog Search Optimization)**: Catalog search queries across title, author, category, and ISBN must leverage appropriate database indexes to ensure execution times remain under **200 milliseconds** for collections up to 20,000 titles.
* **TR-PERF-03 (Connection Pooling)**: Database access must utilize a connection pool (e.g., 10–20 connections) to prevent connection starvation and avoid per-request socket initialization latency.
* **TR-PERF-04 (Frontend Bundle Efficiency)**: The React client application should be optimized to load the initial bundle within **2.0 seconds** on standard broadband connections.

---

## 21. Scalability Requirements

* **Stateless Backend Tier**: The Node.js/Express service maintains zero in-memory session state, allowing the application to scale horizontally behind a load balancer if needed.
* **Relational Normalization**: Relational database tables adhere to Third Normal Form (3NF) to minimize storage redundancy and prevent update anomalies.
* **Indexing Strategy**: B-Tree indexes on searchable text columns (`isbn`, `title`, `author`, `category`) and foreign keys (`student_id`, `book_id`) ensure consistent query performance as transaction volume scales.

---

## 22. Reliability and Availability

* **Graceful Failure**: If a database query fails, the backend rolls back transactions cleanly, releases connection pool handles, and returns a controlled error response rather than crashing the Node process.
* **Process Continuity**: In production deployment, Node.js should be managed using a process manager (such as `pm2` or systemd) to automatically restart the application service in the event of an unhandled exception.
* **Data Consistency Protection**: The inventory invariants ($0 \le \text{Available} \le \text{Total}$) are checked both in the business logic service and guarded by database constraints.

---

## 23. Maintainability

* **Separation of Concerns**: Strict boundary separation between HTTP routing, validation logic, business domain rules, and database query execution.
* **Descriptive Naming Conventions**: Consistent camelCase for variables/functions, PascalCase for React components and classes, and UPPER_SNAKE_CASE for constants.
* **Clean Code Standards**: Modular file sizes (target $< 300$ lines per module), clear documentation blocks on service functions, and uniform error propagation patterns.

---

## 24. Logging and Monitoring

* **Request Logging**: Basic HTTP request logging capturing method, URL endpoint, response status code, and latency (e.g., using `morgan`).
* **Authentication Auditing**: Logging authentication events (successful student login, failed login attempts, librarian logins) with timestamps.
* **Error Logging**: Logging unexpected internal server errors ($5xx$) with stack traces to server console/log files for developer debugging.
* **Sensitive Data Scrubbing**: Authentication passwords and sensitive token strings must be explicitly masked or excluded from logs.

---

## 25. Backup and Data Recovery

* **Logical Database Backups**: Standard database dumps (using `mysqldump` or equivalent utilities) can be executed periodically to export the complete schema and transaction dataset into a single SQL dump file.
* **Audit Trail Protection**: Circulation transaction records are never hard-deleted; historical records are preserved to allow point-in-time reconstruction of borrowing history.

---

## 26. Deployment Technical Requirements

```
+-----------------------------------------------------------------------------------+
|                        DEPLOYMENT ARCHITECTURE (HIGH-LEVEL)                       |
+-----------------------------------------------------------------------------------+

   [Client Web Browser]
            │
            ▼ (HTTPS / TCP 443)
   +---------------------------------------+
   |   Web Server / Static Hosting Tier   |
   |   (Serves Compiled React SPA Assets)  |
   +---------------------------------------+
            │
            ▼ (API Proxy / Reverse Proxy)
   +---------------------------------------+
   |   Application Service Tier            |
   |   (Node.js + Express.js API Runtime)  |
   +---------------------------------------+
            │
            ▼ (Internal Network / TCP 3306)
   +---------------------------------------+
   |   Database Persistence Tier           |
   |   (MySQL Relational Database Engine)  |
   +---------------------------------------+
```

* **Frontend Deployment**: Compiled production build of the React application (`npm run build`) served via a web server (e.g., Nginx, static cloud host, or Express static middleware).
* **Backend Deployment**: Node.js runtime hosting the Express REST API service on an internal port, fronted by a reverse proxy.
* **Database Deployment**: MySQL 8.0 instance with persistent volume storage and strict network access restricted to the backend host.
* **Transport Security (HTTPS)**: Production deployment should terminate SSL/TLS at the reverse proxy to encrypt all data in transit.

---

## 27. Development Environment

* **Node.js**: LTS version (Node.js 18.x or 20.x).
* **Package Manager**: npm (v9.x or v10.x).
* **Database Server**: Local MySQL Server 8.0+ (or MySQL container).
* **IDE / Development Environment**: VS Code or Google Antigravity.
* **Version Control**: Git with remote repository hosted on GitHub.
* **API Testing Tool**: Postman, Thunder Client, or cURL.

---

## 28. Technical Constraints

1. **Two Roles Only**: The technical architecture strictly recognizes `Student` and `Librarian`. No third role exists.
2. **Planned Stack**: Frontend is strictly **React**, backend is strictly **Node.js + Express.js**, database is strictly **MySQL**.
3. **Authentication Mechanism**: Strictly **Email + Password** with cryptographic hashing.
4. **Visual Theme**: High-contrast, modern **Black & White** CSS architecture.
5. **College Software Project Scope**: Architecture is designed to be robust, clean, and professional without introducing unneeded enterprise microservice complexity.

---

## 29. Technical Assumptions

1. **Single Database Host**: A single relational MySQL instance is sufficient to handle the institutional data volumes and transaction concurrency.
2. **Stateless Token Authentication**: A standard signed JWT approach satisfies the authentication requirements for both Student and Librarian roles.
3. **Client Modernity**: Users access the platform via modern, standards-compliant web browsers supporting ES6 JavaScript and HTML5.
4. **No Financial or Scanner Integrations**: The technical scope does not require payment SDKs or device-driver libraries for physical hardware scanners.

---

## 30. Open Technical Decisions

The following technical implementation options should be aligned before active coding begins:

| Decision ID | Technical Decision Topic | Options & Technical Rationale |
| :--- | :--- | :--- |
| **TECH-DEC-01** | **JWT Client Storage Strategy** | • *Option A*: Store JWT in `localStorage` (simple, standard for student projects, accessible via React context).<br>• *Option B*: Store JWT in `httpOnly` secure cookie (stronger protection against XSS). |
| **TECH-DEC-02** | **API Versioning Prefix** | • *Option A*: Include `/api/v1/` prefix for future extensibility.<br>• *Option B*: Standard `/api/` prefix for academic simplicity. |
| **TECH-DEC-03** | **Deployment Packaging Strategy** | • *Option A*: Unified repository with `/client` and `/server` folders (monorepo).<br>• *Option B*: Separate standalone repositories for frontend and backend. |

---

## 31. Technical Requirements Traceability Matrix

The following matrix confirms full technical traceability from the approved BRD, FRD, and PRD to the technical requirements defined in this TRD:

| BRD Requirement | FRD Requirement | PRD Requirement | TRD Specification ID & Scope |
| :--- | :--- | :--- | :--- |
| **BR-001** (Auth) | `FR-001`, `FR-002` | `PR-001`, `PR-002` | `TR-AUTH-01` to `06`, `POST /api/auth/student/*` |
| **BR-001** (Librarian Auth)| `FR-003`, `FR-004` | `PR-003`, `PR-004` | `TR-AUTH-01` to `06`, `POST /api/auth/librarian/login` |
| **BR-002** (Role Separation)| `FR-005`, `FR-006`, `FR-020`| `PR-005`, `PR-006`, `PR-020`| `TR-SEC-03`, `TR-FE-02`, Role Middleware |
| **BR-004** (Book Search) | `FR-007`, `FR-008` | `PR-007`, `PR-008` | `GET /api/books`, `GET /api/books/:id`, `TR-PERF-02` |
| **BR-005** (Book Issue) | `FR-009`, `FR-018` | `PR-009`, `PR-010`, `PR-011`| `POST /api/circulation/issue`, `TR-DATA-04` (ACID) |
| **BR-007** (Issued Books) | `FR-010` | `PR-012` | `GET /api/student/issued-books` |
| **BR-006** (Book Return) | `FR-011`, `FR-018` | `PR-013` | `POST /api/circulation/return`, `TR-DATA-04` (ACID) |
| **BR-007** (History) | `FR-012` | `PR-014` | `GET /api/student/history` |
| **BR-003** (Add Book) | `FR-013` | `PR-015` | `POST /api/books`, `TR-DATA-02` (Stock invariant) |
| **BR-003** (Edit Book) | `FR-014` | `PR-016` | `PUT /api/books/:id`, Total $\ge$ Circulating check |
| **BR-003** (Delete Book) | `FR-015` | `PR-017` | `DELETE /api/books/:id`, Available $==$ Total check |
| **BR-009** (Manage Students)| `FR-016` | `PR-018` | `GET /api/librarian/students`, `GET /api/librarian/students/:id` |
| **BR-008** (Circulation Log)| `FR-017` | `PR-019` | `GET /api/circulation/records` |

---

## 32. Technical Readiness Checklist

The following readiness checklist confirms that the architectural foundation is complete and the project is ready for subsequent documentation phases (SRD, Implementation Plans, Diagrams):

- [x] **Core Business Requirements Traced**: Full alignment with `BUSINESS_REQUIREMENTS_DOCUMENT.md`.
- [x] **Functional Requirements Traced**: Full alignment with `FUNCTIONAL_REQUIREMENTS_DOCUMENT.md`.
- [x] **Product Requirements Traced**: Full alignment with `PRODUCT_REQUIREMENTS_DOCUMENT.md`.
- [x] **Technology Stack Defined**: React (Frontend), Node.js + Express.js (Backend), MySQL (Database).
- [x] **User Roles Strictly Enforced**: Exactly two roles: `Student` and `Librarian`. No Admin role.
- [x] **Authentication Architecture Defined**: Email + Password with bcrypt hashing and signed JWT bearer tokens.
- [x] **REST API Specifications Outlined**: All endpoints defined across Auth, Books, Student, Issue/Return, and Librarian modules.
- [x] **Database Technical Direction Defined**: Logical entities, relational integrity, and `mysql2` connection pooling established.
- [x] **Security Requirements Defined**: Parameterized queries, role guards, CORS, environment variables, and IDOR prevention.
- [x] **Frontend Architecture Specified**: Component hierarchy, React Router, Auth Context, and Black & White UI styling.
- [x] **Backend Architecture Specified**: Modular layer structure (Routes, Controllers, Services, DAL, Middleware).
- [x] **Zero Code / Schema Intrusion**: No application code, database schema scripts, or diagrams created at this stage.

---

## 33. Final Technical Summary

The **Technical Requirements Document (TRD)** establishes a clean, modern, and robust engineering architecture for the Student Library Management System. Built upon **React**, **Node.js + Express.js**, and **MySQL**, the system adopts a layered architecture that cleanly separates presentation, business logic, and data persistence. 

Security is prioritized through one-way password hashing, stateless token-based authorization, server-side role validation, and parameterized SQL queries that eliminate injection risks. Critical circulation workflows (book issuing and returning) are protected by database transactions to ensure stock invariants are preserved without race conditions.

With all technical specifications clearly articulated and strictly aligned with the approved BRD, FRD, and PRD, the system is fully prepared for the subsequent Software Requirements Document (SRD), implementation planning, and system diagramming phases.

---
*End of Technical Requirements Document (TRD)*
