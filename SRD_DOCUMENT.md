# SOFTWARE REQUIREMENTS DOCUMENT (SRD)
## Student Library Management System (SLMS)

---

## 1. Document Control

### 1.1 Document Information
| Field | Details |
| :--- | :--- |
| **Document Name** | Software Requirements Document (SRD) |
| **Project Name** | Student Library Management System (SLMS) |
| **Document Version** | 1.0 (Final Software Specification Baseline) |
| **Date** | October 4, 2026 |
| **Document Status** | Approved Software Engineering Specification |
| **Source Documents** | `BUSINESS_REQUIREMENTS_DOCUMENT.md` (v1.0), `FUNCTIONAL_REQUIREMENTS_DOCUMENT.md` (v1.2), `PRODUCT_REQUIREMENTS_DOCUMENT.md` (v1.0), `TECHNICAL_REQUIREMENTS_DOCUMENT.md` (v1.0) |
| **Author / Role** | Senior Software Requirements Engineer |
| **Intended Audience** | Frontend Engineers, Backend Engineers, QA Test Engineers, System Architects, Academic Project Evaluators |

### 1.2 Revision History
| Version | Date | Author | Description of Change | Status |
| :--- | :--- | :--- | :--- | :--- |
| 1.0 | 2026-10-04 | Senior Requirements Engineer | Initial baseline specification translating BRD, FRD, PRD, and TRD into rigorous, testable software-level requirements for implementation and verification. | Approved Baseline |

### 1.3 Baseline Compliance
This Software Requirements Document (SRD) constitutes the direct implementation specification for the Student Library Management System. All functional modules, input/output data definitions, validation rules, error handling flows, and security constraints defined herein derive strictly from the approved baseline documents. 

No new business rules, numerical thresholds (e.g., loan durations or borrowing caps), procedural assumptions (e.g., counter verification protocols), or unauthorized user roles are introduced.

---

## 2. Introduction

### 2.1 Purpose of the SRD
The purpose of this Software Requirements Document (SRD) is to provide a complete, unambiguous, and formal specification of the software-level capabilities, interfaces, data requirements, and operational constraints for the Student Library Management System. 

It serves as the definitive reference for:
* **Developers**: To guide the structural construction of React components, Express.js RESTful controllers, domain services, and MySQL database queries.
* **Quality Assurance (QA) Engineers**: To author unit tests, integration tests, API verification suites, and end-to-end acceptance tests.
* **Academic Evaluators & Project Reviewers**: To verify technical completeness, architectural discipline, and requirement traceability across all project documentation tiers.

---

## 3. System Scope

### 3.1 Software Boundary
The SLMS is a dedicated web application providing centralized digital management of academic library assets and circulation. The software boundary encompasses:
* **Client Application**: A React Single Page Application (SPA) offering distinct interfaces for Students and Librarians under a Modern Black & White aesthetic.
* **Server Application**: A Node.js + Express.js backend handling authentication, authorization, business logic, validation, and REST API routing.
* **Data Storage**: A MySQL relational database managing user accounts, book catalog records, and circulation transaction logs.

### 3.2 Explicit Exclusions
The software boundary strictly excludes monetary fee collection/payment gateways, physical barcode/RFID device drivers, digital e-book reader/PDF streaming engines, automated third-party SMS/email dispatch gateways, and any user roles other than Student and Librarian.

---

## 4. System Overview

The SLMS unifies library cataloging and circulation into an automated digital workflow:
1. **Student Self-Service**: Enables enrolled students to register an account, log in, search for available books, inspect bibliographic details and real-time copy counts, request/issue books, review active loans with due dates, return books, and inspect their personal borrowing history.
2. **Librarian Administration**: Enables authorized library staff to log in securely, add new books, edit existing book metadata and copy counts, delete books (under strict active loan protection), search the complete catalog, inspect registered student accounts, issue books directly to students, accept returns, and view library-wide circulation logs and activity statistics.

---

## 5. User Roles and Responsibilities

The application strictly enforces dual-role partitioning:

```
+-----------------------------------------------------------------------------------+
|                        APPLICATION ROLE RESPONSIBILITIES                          |
+-----------------------------------------------------------------------------------+
|  ROLE       | CORE RESPONSIBILITIES                 | STRICT RESTRICTIONS         |
+-------------+---------------------------------------+-----------------------------+
|  STUDENT    | • Self-registration & login           | • No catalog modifications  |
|             | • Search & view book catalog          | • No access to other users  |
|             | • Request/issue available books       | • No access to admin logs   |
|             | • Return issued books                 | • No direct stock overrides |
|             | • View own active loans & history     | • No librarian view access  |
+-------------+---------------------------------------+-----------------------------+
|  LIBRARIAN  | • Secure login & session access       | • Cannot delete book if any |
|             | • Full catalog management (CRUD)      |   copy is currently issued  |
|             | • Direct book issuance & returns      | • Cannot issue book if      |
|             | • Student directory inspection        |   available copies = 0      |
|             | • Global circulation log review       | • Cannot alter transaction  |
|             | • Activity dashboard monitoring       |   history records           |
+-----------------------------------------------------------------------------------+
```

---

## 6. Functional Requirements

### 6.1 Authentication
* **SR-AUTH-01 (Student Registration)**: The software shall accept Full Name, Student ID, Email Address, and Password from an unauthenticated user, validate input constraints, securely hash the password, and store a new user record with role `Student`.
* **SR-AUTH-02 (Student Login)**: The software shall authenticate student credentials (email and password), verify role `Student`, and issue a signed session token.
* **SR-AUTH-03 (Librarian Login)**: The software shall authenticate librarian credentials (email and password), verify role `Librarian`, and issue a signed session token.
* **SR-AUTH-04 (User Logout)**: The software shall terminate active user sessions and clear client-side authentication state.

### 6.2 Student Functionality
* **SR-STU-01 (Student Dashboard)**: The software shall present the authenticated student with a summary of their profile, count of currently issued books, active loans with due dates, and quick navigation.
* **SR-STU-02 (Currently Issued Books View)**: The software shall render a structured table displaying all books currently issued to the student, including Title, Author, ISBN, Issue Date, Due Date, and Return trigger.
* **SR-STU-03 (Personal Library History)**: The software shall display a permanent chronological log of all books borrowed and returned by the student.

### 6.3 Librarian Functionality
* **SR-LIB-01 (Librarian Dashboard)**: The software shall render an operational overview showing Total Book Titles, Total Inventory Copies, Active Issued Books, Total Registered Students, and a recent circulation activity feed.
* **SR-LIB-02 (Student Directory Inspection)**: The software shall display a searchable list of registered students and render individual student profiles showing active loans and past borrowing history.
* **SR-LIB-03 (Circulation Records Audit)**: The software shall display a filterable master log of all circulation transactions across all students.

### 6.4 Book Search and Book Details
* **SR-BKM-01 (Catalog Search)**: The software shall query the catalog in real time across Title, Author, Category, and ISBN.
* **SR-BKM-02 (Availability Indication)**: The software shall display a high-contrast badge indicating **"Available"** (with remaining copy count) when Available Copies $> 0$, and **"Unavailable / Out of Stock"** when Available Copies $= 0$.
* **SR-BKM-03 (Book Details View)**: The software shall display complete bibliographic metadata (Title, Author, ISBN, Category, Publisher, Total Copies, Available Copies) for any selected title.

### 6.5 Book Issue / Request Process
* **SR-CIR-01 (Student Request/Issue)**: The software shall allow an authenticated student to request/issue an available book ($\text{Available} \ge 1$), creating an issue record with due date and decrementing Available Copies by 1.
* **SR-CIR-02 (Librarian Direct Issue)**: The software shall allow a Librarian to issue an available book to a designated registered student, creating an issue record and decrementing Available Copies by 1.
* **SR-CIR-03 (Duplicate Title Loan Prevention)**: The software shall block issuance if the student already holds an active, unreturned copy of the exact same book title (RULE-008).
* **SR-CIR-04 (Zero Stock Guard)**: The software shall block issuance if the selected book has Available Copies $= 0$ (RULE-003).

### 6.6 Book Return Process
* **SR-CIR-05 (Return Processing)**: The software shall process book returns, updating transaction status from `ISSUED` to `RETURNED`, capturing the return timestamp, and incrementing Available Copies by 1 (RULE-004).
* **SR-CIR-06 (Librarian Return Acceptance)**: The software shall enable the Librarian to accept returned books, update transaction records, and restore catalog availability.

### 6.7 Book Management (CRUD)
* **SR-BKM-04 (Add Book)**: The software shall allow the Librarian to add a new book record with Title, Author, ISBN, Category, Publisher, and Total Copies ($\ge 1$), initializing $\text{Available Copies} = \text{Total Copies}$.
* **SR-BKM-05 (Edit Book)**: The software shall allow the Librarian to update metadata and adjust Total Copies, blocking any reduction below currently circulating copies.
* **SR-BKM-06 (Delete Book Safe Guard)**: The software shall allow the Librarian to delete a book if and only if $\text{Available Copies} == \text{Total Copies}$ (RULE-007). Deletion is hard-blocked if any copy is currently issued.

---

## 7. Detailed Software Requirements

The software requirements are cataloged below using unique identifiers `SR-001` through `SR-022`:

| Requirement ID | Module | Detailed Software Requirement Statement | Priority |
| :--- | :--- | :--- | :--- |
| **SR-001** | Auth | The software shall provide a student self-registration endpoint accepting Name, Student ID, Email, and Password. | Must Have |
| **SR-002** | Auth | The software shall hash all passwords using `bcrypt` (salt rounds $\ge 10$) prior to persistence. | Must Have |
| **SR-003** | Auth | The software shall authenticate student login requests using email and password matching against stored hashes. | Must Have |
| **SR-004** | Auth | The software shall authenticate librarian login requests using email and password matching against stored hashes. | Must Have |
| **SR-005** | Auth | The software shall generate signed JSON Web Tokens (JWT) containing `userId`, `role`, and `email` upon successful login. | Must Have |
| **SR-006** | Auth | The software shall provide client-side and server-side session termination (logout) clearing active token context. | Must Have |
| **SR-007** | Catalog | The software shall provide a search endpoint returning catalog records matching keyword queries against Title, Author, Category, or ISBN. | Must Have |
| **SR-008** | Catalog | The software shall dynamically return real-time Available Copies and Total Copies for every catalog item. | Must Have |
| **SR-009** | Catalog | The software shall provide a single-book inspection endpoint returning complete bibliographic attributes. | Must Have |
| **SR-010** | Circulation | The software shall process book borrow/issue requests, creating an active circulation record (`Status = 'ISSUED'`). | Must Have |
| **SR-011** | Circulation | The software shall atomically decrement `Available Copies` by 1 upon confirming a book issuance. | Must Have |
| **SR-012** | Circulation | The software shall enforce RULE-008 by rejecting issue requests if the student already holds an unreturned copy of that title. | Must Have |
| **SR-013** | Circulation | The software shall process book returns, updating transaction `Status = 'RETURNED'` and recording `ReturnDate = NOW()`. | Must Have |
| **SR-014** | Circulation | The software shall atomically increment `Available Copies` by 1 upon confirming a book return. | Must Have |
| **SR-015** | Student | The software shall provide an endpoint returning all books currently issued to the authenticated student. | Must Have |
| **SR-016** | Student | The software shall provide an endpoint returning the permanent borrowing history for the authenticated student. | Must Have |
| **SR-017** | Librarian | The software shall provide an endpoint returning aggregate operational metrics (titles, inventory, active loans, students). | Must Have |
| **SR-018** | Librarian | The software shall allow librarians to create new book titles with unique ISBN and Total Copies $\ge 1$. | Must Have |
| **SR-019** | Librarian | The software shall allow librarians to update book metadata and adjust copy counts safely. | Must Have |
| **SR-020** | Librarian | The software shall enforce RULE-007, blocking deletion of any book where $\text{Available Copies} < \text{Total Copies}$. | Must Have |
| **SR-021** | Librarian | The software shall provide a student directory endpoint returning registered student profiles and borrowing summaries. | Must Have |
| **SR-022** | Security | The software shall enforce role authorization middleware rejecting students attempting to access librarian endpoints with HTTP 403. | Must Have |

---

## 8. Input Requirements

All software inputs must strictly comply with data type, length, and format boundaries:

| Form / Interface | Field Name | Data Type | Constraints & Formatting | Mandatory |
| :--- | :--- | :--- | :--- | :--- |
| **Student Registration** | `fullName` | String | 2–100 characters; letters and spaces. | Yes |
| **Student Registration** | `studentId` | String | 3–20 characters; alphanumeric; unique. | Yes |
| **Student Registration** | `email` | String | Valid email regex (`user@domain.tld`); unique. | Yes |
| **Student Registration** | `password` | String | Minimum 8 characters. | Yes |
| **Login (Both Roles)** | `email` | String | Valid email format. | Yes |
| **Login (Both Roles)** | `password` | String | Non-empty string. | Yes |
| **Add / Edit Book** | `title` | String | 1–255 characters; non-empty. | Yes |
| **Add / Edit Book** | `author` | String | 1–255 characters; non-empty. | Yes |
| **Add Book** | `isbn` | String | 10–20 characters; alphanumeric/hyphens; unique. | Yes |
| **Add / Edit Book** | `category` | String | 1–100 characters; non-empty. | Yes |
| **Add / Edit Book** | `publisher` | String | Up to 150 characters. | No |
| **Add Book** | `totalCopies` | Integer | Positive integer $\ge 1$. | Yes |
| **Edit Book** | `totalCopies` | Integer | Integer $\ge (\text{Total Copies} - \text{Available Copies})$. | Yes |
| **Catalog Search** | `query` | String | Search keyword string. | No |
| **Issue Book** | `bookId` | Integer / ID | Positive integer referencing valid book record. | Yes |
| **Issue Book (Librarian)**| `studentId` | Integer / ID | Positive integer referencing valid student record. | Yes |
| **Return Book** | `transactionId` | Integer / ID | Positive integer referencing active issue record. | Yes |

---

## 9. Output Requirements

### 9.1 Screen Displays & Data Tables
* **Catalog Search Results Table**: Columns: Title, Author, Category, ISBN, Stock Status Pill ("Available [N]" vs. "Unavailable"), Actions ("View Details", "Request").
* **Book Details Card**: Full bibliographic block with Title, Author, ISBN, Category, Publisher, Total Copies, Available Copies, and contextual action buttons.
* **Student Issued Books Table**: Columns: Title, Author, ISBN, Issue Date, Due Date, Action ("Return Book").
* **Student History Table**: Columns: Title, Author, ISBN, Issue Date, Due Date, Return Date, Status (`RETURNED`).
* **Librarian Overview Cards**: Total Book Titles, Total Inventory Copies, Active Circulating Loans, Registered Students.
* **Librarian Student Directory Table**: Columns: Student ID, Full Name, Email, Active Loans Count, Action ("View Details").
* **Master Circulation Log Table**: Columns: Transaction ID, Student Name, Student ID, Book Title, ISBN, Issue Date, Due Date, Return Date, Status.

### 9.2 API Output Payloads
All server responses must follow a structured envelope:
* **Success Output**:
  ```json
  {
    "success": true,
    "data": { ... },
    "message": "Human-readable confirmation message"
  }
  ```
* **Error Output**:
  ```json
  {
    "success": false,
    "error": {
      "code": "ERROR_CODE_IDENTIFIER",
      "message": "Human-readable error description"
    }
  }
  ```

---

## 10. Validation Requirements

The software shall enforce two-tier validation (client-side pre-validation and mandatory server-side validation):

```
+-----------------------------------------------------------------------------------+
|                            VALIDATION FLOW ENGINE                                 |
+-----------------------------------------------------------------------------------+
  User submits input on React Client
       │
       ▼
  Client-side validation verifies formats (Instant user feedback)
       │
       ▼ (Dispatches HTTP Request)
  Express backend validation middleware re-verifies all fields:
    • Type checking & length boundaries
    • Format sanitization (trimming, email regex)
    • Uniqueness checks against database (Email, Student ID, ISBN)
    • Invariant checks (Total Copies >= Circulating, Available >= 1)
       │
       ├─ If Invalid ──> Returns 422 Unprocessable Entity with error list
       │
       └─ If Valid ────> Passes to Domain Logic & Database Execution
```

### 10.1 Server-Side Validation Rules
1. **Uniqueness Enforcement**: The software shall query the database prior to insertion to ensure `email`, `studentId`, and `isbn` are not already present.
2. **Issue Eligibility Validation**: Prior to inserting an issue record, the software shall verify:
   * Target book has $\text{Available Copies} \ge 1$.
   * Student has no active record (`Status = 'ISSUED'`) for the same `bookId`.
3. **Safe Deletion Validation**: Prior to executing a book deletion, the software shall verify that $\text{Available Copies} == \text{Total Copies}$ and zero active issue records exist for that book.
4. **Copy Count Modification Validation**: When editing a book, new Total Copies cannot be lower than $(\text{Total Copies} - \text{Available Copies})$.

---

## 11. Error Handling Requirements

The software must handle exceptions deterministically, returning standard HTTP status codes and sanitized JSON error payloads:

| Error Condition | Triggering Event | HTTP Code | System Response Message |
| :--- | :--- | :--- | :--- |
| **Invalid Credentials** | Incorrect email or password on login | `401 Unauthorized` | *"Invalid email or password. Please try again."* |
| **Token Expired / Missing** | API request lacking valid Bearer token | `401 Unauthorized` | *"Authentication required. Please log in."* |
| **Role Forbidden** | Student accessing Librarian endpoint | `403 Forbidden` | *"Access denied: Insufficient privileges."* |
| **Duplicate Registration** | Email or Student ID already exists | `409 Conflict` | *"An account with this email or Student ID already exists."* |
| **Duplicate ISBN** | Creating book with existing ISBN | `409 Conflict` | *"A book with this ISBN already exists in the catalog."* |
| **Book Out of Stock** | Issuing book with Available Copies $= 0$ | `400 Bad Request` | *"Cannot issue book: No copies currently available."* |
| **Duplicate Title Loan** | Student borrows same title twice | `400 Bad Request` | *"Student already has an active loan of this book title."* |
| **Active Loans on Deletion**| Deleting book with circulating copies | `400 Bad Request` | *"Cannot delete book: Copies are currently issued to students."* |
| **Resource Not Found** | Querying non-existent Book or Student ID | `404 Not Found` | *"The requested resource was not found."* |
| **Input Validation Failure** | Missing mandatory fields or bad format | `422 Unprocessable Entity`| *"Validation failed. Please correct highlighted fields."* |
| **Internal Server Error** | Database connection loss or code fault | `500 Server Error` | *"An unexpected error occurred. Please try again later."* |

---

## 12. Authentication and Authorization Requirements

* **SR-SEC-01 (Password Encryption)**: Passwords shall be hashed using `bcrypt` with salt rounds $\ge 10$ prior to database persistence.
* **SR-SEC-02 (Token Signing & Expiry)**: The software shall issue signed JWT tokens containing `{ userId, role, email }` signed with a secure server-side secret (`JWT_SECRET`) and a defined expiration.
* **SR-SEC-03 (Token Verification Middleware)**: The Express backend shall intercept private requests, verify the Bearer token signature, and reject invalid/expired tokens with HTTP 401.
* **SR-SEC-04 (Role Verification Middleware)**: The software shall verify that `req.user.role === 'Librarian'` before executing any catalog creation, editing, deletion, student management, or administrative log queries.
* **SR-SEC-05 (Data Scoping / IDOR Prevention)**: Student endpoints shall resolve user records using `req.user.userId` derived directly from the authenticated token payload rather than client-supplied URL parameters.

---

## 13. Data Requirements

### 13.1 Logical Data Entities
The database requires four primary logical entities:
1. **User Entity**: Stores user identity, credentials, and role.
   * Attributes: `id`, `full_name`, `student_id` (nullable for librarian), `email`, `password_hash`, `role` (`Student` | `Librarian`), `created_at`.
2. **Book Entity**: Stores bibliographic metadata and inventory copy numbers.
   * Attributes: `id`, `title`, `author`, `isbn`, `category`, `publisher`, `total_copies`, `available_copies`, `created_at`, `updated_at`.
3. **Circulation Transaction Entity**: Stores individual issue and return transactions.
   * Attributes: `id`, `student_id` (FK to User), `book_id` (FK to Book), `issue_date`, `due_date`, `return_date` (nullable while issued), `status` (`ISSUED` | `RETURNED`).

### 13.2 Data Invariants & Transactional Integrity
* **Inventory Count Invariant**: For every book record, the database shall satisfy:
  $$0 \le \text{available\_copies} \le \text{total\_copies}$$
* **Atomic Issue Transaction**: The software shall execute book issuance inside a database transaction:
  1. Verify $\text{available\_copies} \ge 1$.
  2. Insert transaction record (`status = 'ISSUED'`).
  3. Update book record: $\text{available\_copies} = \text{available\_copies} - 1$.
  4. Commit transaction. (Rollback on any error).
* **Atomic Return Transaction**: The software shall execute book returns inside a database transaction:
  1. Update transaction record (`status = 'RETURNED'`, `return_date = NOW()`).
  2. Update book record: $\text{available\_copies} = \text{available\_copies} + 1$.
  3. Commit transaction. (Rollback on any error).

---

## 14. API / Service-Level Requirements

The backend service layer shall expose the following RESTful service endpoints:

```
+-----------------------------------------------------------------------------------+
|                        RESTFUL API SERVICE CONTRACT                               |
+-----------------------------------------------------------------------------------+
| ENDPOINT                      | METHOD | ACTOR     | FUNCTIONAL PURPOSE           |
+-------------------------------+--------+-----------+------------------------------+
| /api/auth/student/register    | POST   | Public    | Register student account     |
| /api/auth/student/login       | POST   | Public    | Authenticate student         |
| /api/auth/librarian/login     | POST   | Public    | Authenticate librarian       |
| /api/auth/logout              | POST   | Both      | Terminate session            |
| /api/books                    | GET    | Both      | Search & filter catalog      |
| /api/books/:id                | GET    | Both      | Retrieve book details        |
| /api/books                    | POST   | Librarian | Create new book title        |
| /api/books/:id                | PUT    | Librarian | Update book & copy counts    |
| /api/books/:id                | DELETE | Librarian | Safe delete book record      |
| /api/student/dashboard        | GET    | Student   | Get student dashboard data   |
| /api/student/issued-books     | GET    | Student   | Get student's active loans   |
| /api/student/history          | GET    | Student   | Get student's loan history   |
| /api/circulation/issue        | POST   | Both      | Process book issuance        |
| /api/circulation/return       | POST   | Both      | Process book return          |
| /api/librarian/dashboard      | GET    | Librarian | Get overall library stats    |
| /api/librarian/students       | GET    | Librarian | List & search student directory|
| /api/librarian/students/:id   | GET    | Librarian | Get student profile & history|
| /api/circulation/records      | GET    | Librarian | Get master circulation log   |
+-----------------------------------------------------------------------------------+
```

---

## 15. User Interface Requirements

* **SR-UI-01 (Modern Black & White Theme)**: The software shall implement a high-contrast monochrome design using pure blacks (`#000000`, `#111111`), crisp white (`#FFFFFF`), light grays (`#F8F9FA`, `#EEEEEE`), and subtle border grays (`#E0E0E0`).
* **SR-UI-02 (Layout Structure)**: The software shall render a consistent layout consisting of a top navigation bar (branding, active user display, role indicator, navigation links, logout action) and a main content viewport.
* **SR-UI-03 (Responsive Adaptation)**: UI layouts shall adapt responsively using CSS Grid/Flexbox across desktop (1280px+), laptop (1024px), tablet (768px), and mobile (375px+) displays.
* **SR-UI-04 (Immediate Feedback)**: The software shall provide clear visual feedback for all user actions:
  * Loading spinners / skeletons during asynchronous data fetches.
  * Inline validation text on form fields failing validation.
  * High-contrast confirmation toasts/banners for successful operations.
  * High-contrast error banners for failed operations.

---

## 16. Non-Functional Requirements

### 16.1 Performance
* **NFR-PERF-01 (API Response Latency)**: REST API response times for standard queries and mutations shall execute in under 500ms under standard operational conditions.
* **NFR-PERF-02 (Catalog Search Latency)**: Database queries for book searches shall execute in under 200ms by leveraging indexed columns (`isbn`, `title`, `author`, `category`).
* **NFR-PERF-03 (Client Bundle Load)**: The React client application initial page load shall complete within 2.0 seconds on standard broadband connectivity.

### 16.2 Security
* **NFR-SEC-01 (SQL Injection Prevention)**: All SQL queries shall utilize parameterized prepared statements via the `mysql2` driver. Direct string concatenation in queries is strictly prohibited.
* **NFR-SEC-02 (Credential Confidentiality)**: Passwords shall be hashed using `bcrypt` (cost factor $\ge 10$). Passwords must never appear in server logs, API responses, or client storage.
* **NFR-SEC-03 (Role Isolation)**: The backend shall independently verify user roles on every private API call, enforcing complete isolation between Student and Librarian access levels.
* **NFR-SEC-04 (Configuration Privacy)**: Database credentials, server ports, and JWT signing keys shall be externalized in `.env` files and excluded from version control.

### 16.3 Reliability & Availability
* **NFR-REL-01 (ACID Consistency)**: Book copy counters and circulation transaction records shall be updated atomically inside database transactions to prevent stock desynchronization.
* **NFR-REL-02 (Graceful Error Recovery)**: Database connection errors or query exceptions shall trigger a transaction rollback and return a controlled HTTP error response without terminating the Node.js process.

### 16.4 Usability
* **NFR-USE-01 (Navigation Simplicity)**: Core student tasks (Search, Request Book, View Active Loans, Return Book) shall be executable in 3 or fewer user interactions from the home view.
* **NFR-USE-02 (Legibility & Contrast)**: All text elements shall maintain WCAG 2.1 AA compliant high contrast ratios against monochrome backgrounds.

### 16.5 Maintainability
* **NFR-MN-01 (Modular Architecture)**: Backend codebase shall strictly separate routes, controllers, domain services, middleware, and database access.
* **NFR-MN-02 (Component Reusability)**: Common frontend UI patterns (buttons, inputs, modals, tables, badges) shall be implemented as reusable React components.

### 16.6 Scalability
* **NFR-SCAL-01 (Stateless Application Tier)**: The backend service shall maintain zero in-memory session state, allowing horizontal scaling behind a reverse proxy.
* **NFR-SCAL-02 (Connection Pooling)**: Database access shall utilize a connection pool (10–20 connections) to efficiently handle concurrent user requests.

---

## 17. Requirements Traceability Matrix

The following matrix maps software requirements (SRD) back to the approved BRD, FRD, PRD, and TRD requirements:

| BRD Requirement | FRD Requirement | PRD Requirement | TRD Requirement | SRD Software Requirement |
| :--- | :--- | :--- | :--- | :--- |
| **BR-001** / **BR-STU-001** | `FR-001` | `PR-001` | `TR-AUTH-01`, `03` | `SR-AUTH-01`, `SR-001`, `SR-002` |
| **BR-001** / **BR-STU-002** | `FR-002` | `PR-002` | `TR-AUTH-02`, `04` | `SR-AUTH-02`, `SR-003`, `SR-005` |
| **BR-001** / **BR-LIB-001** | `FR-003` | `PR-003` | `TR-AUTH-02`, `04` | `SR-AUTH-03`, `SR-004`, `SR-005` |
| **BR-001** / **BR-AUT-004** | `FR-004` | `PR-004` | `TR-AUTH-05` | `SR-AUTH-04`, `SR-006` |
| **BR-007** / **BR-STU-006** | `FR-005` | `PR-005` | `GET /api/student/dashboard` | `SR-STU-01`, `SR-015` |
| **BR-008** / **BR-LIB-010** | `FR-006` | `PR-006` | `GET /api/librarian/dashboard` | `SR-LIB-01`, `SR-017` |
| **BR-004** / **BR-STU-003** | `FR-007` | `PR-007` | `GET /api/books` | `SR-BKM-01`, `SR-BKM-02`, `SR-007`, `008` |
| **BR-004** / **BR-STU-004** | `FR-008` | `PR-008` | `GET /api/books/:id` | `SR-BKM-03`, `SR-009` |
| **BR-005** / **BR-STU-005** | `FR-009` | `PR-009` | `POST /api/circulation/issue` | `SR-CIR-01`, `SR-010`, `SR-011` |
| **BR-005** / **BR-LIB-007** | `FR-009` | `PR-010` | `POST /api/circulation/issue` | `SR-CIR-02`, `SR-010`, `SR-011` |
| **RULE-008** / **RULE-003** | `FR-009` | `PR-011` | `TR-DATA-02`, `TR-DATA-04` | `SR-CIR-03`, `SR-CIR-04`, `SR-012` |
| **BR-007** / **BR-STU-006** | `FR-010` | `PR-012` | `GET /api/student/issued-books` | `SR-STU-02`, `SR-015` |
| **BR-006** / **BR-LIB-008** | `FR-011` | `PR-013` | `POST /api/circulation/return` | `SR-CIR-05`, `SR-CIR-06`, `SR-013`, `014` |
| **BR-007** / **BR-STU-008** | `FR-012` | `PR-014` | `GET /api/student/history` | `SR-STU-03`, `SR-016` |
| **BR-003** / **BR-LIB-002** | `FR-013` | `PR-015` | `POST /api/books` | `SR-BKM-04`, `SR-018` |
| **BR-003** / **BR-LIB-003** | `FR-014` | `PR-016` | `PUT /api/books/:id` | `SR-BKM-05`, `SR-019` |
| **BR-003** / **BR-LIB-004** | `FR-015` | `PR-017` | `DELETE /api/books/:id` | `SR-BKM-06`, `SR-020` |
| **BR-009** / **BR-LIB-006** | `FR-016` | `PR-018` | `GET /api/librarian/students` | `SR-LIB-02`, `SR-021` |
| **BR-008** / **BR-LIB-009** | `FR-017` | `PR-019` | `GET /api/circulation/records` | `SR-LIB-03` |
| **BR-002** / **BR-AUT-003** | `FR-019`, `020` | `PR-020` | `TR-SEC-03`, `TR-FE-02` | `SR-022` |

---

## 18. Acceptance Criteria

The software shall satisfy the following testable acceptance criteria:

* **AC-SRD-01 (Student Registration)**: Given valid and unique Full Name, Student ID, Email, and Password, when submitted to `/api/auth/student/register`, then the software returns HTTP 201 Created and persists the user record with password hashed via `bcrypt`.
* **AC-SRD-02 (Authentication & JWT Issuance)**: Given registered credentials, when submitted to `/api/auth/*/login`, then the software returns HTTP 200 OK and a signed JWT carrying the user's ID and role.
* **AC-SRD-03 (Role Access Enforcement)**: Given a student's JWT token, when a request is dispatched to `/api/books` (POST/PUT/DELETE) or `/api/librarian/*`, then the software returns HTTP 403 Forbidden.
* **AC-SRD-04 (Catalog Search Execution)**: Given an active catalog, when a query string is sent to `/api/books?query=...`, then the software returns matching titles with real-time `available_copies` counts within 200ms.
* **AC-SRD-05 (Issue Execution & Stock Decrement)**: Given a book with `available_copies >= 1`, when an issue request is posted, then the software creates a transaction record (`status = 'ISSUED'`) and decrements `available_copies` by exactly 1 within an atomic database transaction.
* **AC-SRD-06 (Duplicate Title Check)**: Given an active issued record for a student and book title, when an issue request is submitted for the same student and title, then the software rejects the transaction with HTTP 400 Bad Request.
* **AC-SRD-07 (Return Execution & Stock Increment)**: Given an active issue transaction, when a return is confirmed, then the software updates `status = 'RETURNED'`, records `return_date`, and increments `available_copies` by exactly 1 within an atomic database transaction.
* **AC-SRD-08 (Safe Deletion Enforcement)**: Given a book with `available_copies < total_copies`, when a DELETE request is submitted, then the software rejects deletion with HTTP 400 Bad Request. When `available_copies == total_copies`, deletion succeeds.

---

## 19. Assumptions and Constraints

### 19.1 Software Assumptions
1. **Single Library Deployment**: The software is deployed to manage a single physical campus library.
2. **Two Roles Only**: The software supports exactly two roles: `Student` and `Librarian`. No Administrator role exists.
3. **Physical-Digital Correlation**: Digital issue and return operations correspond directly to the physical movement of books.
4. **Data Persistence**: Issue and return transaction logs are preserved permanently to maintain an unbroken audit trail.

### 19.2 Technical Constraints
1. **Frontend Constraint**: Developed using **React**, **HTML5**, **CSS3**, and **JavaScript (ES6+)**.
2. **Backend Constraint**: Developed using **Node.js** with the **Express.js** web framework.
3. **Database Constraint**: Persistent relational data stored in **MySQL** (communicating via `mysql2`).
4. **Authentication Constraint**: Credential-based **Email + Password** with `bcrypt` and signed JWT bearer tokens.
5. **Aesthetic Constraint**: Strictly styled with a modern, high-contrast **Black & White** theme.

---

## 20. Open Questions / Decisions Required

The following operational and configuration decisions remain open from the baseline documents and should be formalized prior to code implementation:

| Decision ID | Area | Open Question / Decision Description | Impact on Implementation |
| :--- | :--- | :--- | :--- |
| **DEC-01** | Circulation | **Default Loan Period Duration**: How is the issue due date calculated (e.g., standard policy duration vs. specified by librarian during issuance)? | Determines due date assignment logic in `/api/circulation/issue`. |
| **DEC-02** | Circulation | **Maximum Concurrent Loan Limit**: Is there an overall limit on total active borrowed books per student, or does the system rely solely on RULE-008 (*no duplicate copies of the same title*)? | Determines if an active loan count validation is added to issue services. |
| **DEC-03** | Workflow | **Student Request Workflow Interaction**: Does a student request directly issue the book in the system, or does it queue for librarian confirmation? | Determines transaction status flow (`REQUESTED` $\rightarrow$ `ISSUED` vs direct `ISSUED`). |
| **DEC-04** | Workflow | **Student Return Workflow Interaction**: Does a student initiate a return that the librarian confirms, or can either party process the return directly? | Determines whether return requires a two-step confirmation state. |
| **DEC-05** | Auth | **Initial Librarian Account Setup**: Because there is no Admin role and students self-register, how is the first Librarian account established? | Determines deployment setup/seeding mechanism. |

---
*End of Software Requirements Document (SRD)*
