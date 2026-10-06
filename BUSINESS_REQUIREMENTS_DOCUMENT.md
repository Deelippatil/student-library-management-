# BUSINESS REQUIREMENTS DOCUMENT (BRD)
## Student Library Management System

---

## 1. Document Control

### 1.1 Document Information
| Field | Details |
| :--- | :--- |
| **Project Name** | Student Library Management System (SLMS) |
| **Document Name** | Business Requirements Document (BRD) |
| **Document Version** | 1.0 (Initial Baseline) |
| **Document Status** | Final Draft for Baseline Sign-Off |
| **Date of Creation** | October 4, 2026 |
| **Prepared For** | Academic Institution / College Library Administration & Project Stakeholders |
| **Prepared By** | Senior Business Analyst & Project Advisory Lead |
| **Target Audience** | Academic Evaluators, Project Mentors, Library Staff, Development Team |

### 1.2 Revision History
| Version | Date | Author | Description of Change | Status |
| :--- | :--- | :--- | :--- | :--- |
| 1.0 | 2026-10-04 | Senior Business Analyst | Initial compilation of comprehensive Business Requirements based on stakeholder requirements and project charter. | Baseline Draft |

### 1.3 Document Approval & Sign-Off
| Stakeholder Role | Name / Title | Signature | Date |
| :--- | :--- | :--- | :--- |
| **Lead Library Administrator** | Representative, Library Administration | [Pending Sign-Off] | — |
| **Academic Project Supervisor** | Project Faculty / Academic Evaluator | [Pending Sign-Off] | — |
| **Lead Business Analyst** | Senior Business Analyst | Signed (v1.0) | 2026-10-04 |

---

## 2. Executive Summary

In higher education institutions, the library serves as the intellectual hub for learning, academic research, and curricular advancement. Despite the digital transformation occurring across educational operations, numerous academic libraries continue to depend upon labor-intensive manual record-keeping, physical ledgers, card catalogues, and paper-based circulation logs. These outdated modalities introduce friction into daily operations, increase operational overhead, result in catalog discrepancy errors, and hinder students from swiftly accessing learning materials.

The **Student Library Management System (SLMS)** is conceived as a modern, centralized, web-based digital platform engineered to systematically automate library operations. The system establishes two primary dedicated operational interfaces: a self-service **Student Portal** for real-time catalog discovery, book borrowing requests, active issue monitoring, and borrowing history tracking; and a **Librarian Administration Console** for centralized book inventory control, student record administration, issue/return transaction processing, and holistic library activity monitoring.

By replacing disparate manual workflows with a single, reliable system of record, the SLMS eliminates paper records, prevents catalog errors, accelerates book turnaround times, and ensures complete auditability of all circulation activities. The visual identity of the system is planned around a modern, high-contrast, distraction-free Black & White aesthetic, fostering academic focus, usability, and professional software presentation suitable for college-level project evaluation and real-world institutional adoption.

---

## 3. Business Problem / Current Situation

Academic libraries operating without an automated digital management system encounter recurring operational vulnerabilities that compromise efficiency, student satisfaction, and administrative integrity. The current manual and semi-manual operating environment suffers from the following key challenges:

```
[Current Manual Situation]
 ├── Physical Card Catalogs & Registers ──> Inefficient Search & Discovery
 ├── Hand-Written Issue/Return Ledgers  ──> Transcription Errors & Lost Records
 ├── Paper Slips & Physical Inquiries   ──> Long Counter Queues & Admin Burnout
 └── Disjointed Stock Verification      ──> Inaccurate Inventory Counts & Stock Loss
```

### 3.1 Primary Operational Pain Points
1. **Catalog Opacity & Search Latency**: Students must physically visit the library and scan physical shelves or handwritten card indexes to determine if a book is stocked and available. This results in significant time loss for students and repetitive inquiries directed to library staff.
2. **Circulation Bottlenecks & Human Error**: Checking books out and processing returns relies on manually transcribing student registration numbers, accession codes, and dates into physical registers. This process is susceptible to legibility issues, transcription errors, skipped entries, and long service queues during peak library hours.
3. **Inventory Discrepancy & Inaccurate Stock Counts**: Without centralized real-time updates, librarians struggle to maintain an accurate count of total volumes versus circulating copies. Books misplaced on shelves or unreturned without proper notation are effectively lost from active circulation.
4. **Absence of Student Accountability & Self-Service**: Students have no persistent personal ledger to review which titles they have checked out, their due dates, or their past reading history. Disputes frequently arise regarding whether an item was returned or when it was borrowed.
5. **Administrative Overhead & Lack of Visibility**: Compiling periodic circulation reports, auditing overdue loans, or reviewing historical usage patterns requires hours of manual ledger auditing, distracting library staff from curation and student engagement.

---

## 4. Proposed Solution

The proposed **Student Library Management System (SLMS)** resolves these challenges by introducing a unified, multi-role digital ecosystem that streamlines catalog management, book circulation, user activity tracking, and inventory oversight.

```
+-----------------------------------------------------------------------------------+
|                        Student Library Management System                         |
+-----------------------------------------------------------------------------------+
           |                                                      |
           v                                                      v
+-------------------------------+                     +-------------------------------+
|        STUDENT PORTAL         |                     |      LIBRARIAN CONSOLE        |
+-------------------------------+                     +-------------------------------+
| • Secure Self-Registration    |                     | • Secure Admin Authentication |
| • Email & Password Login      |                     | • Catalog Management (CRUD)   |
| • Real-Time Book Search       |                     | • Stock & Availability Tracking|
| • Book Details & Availability |                     | • Student Record Management   |
| • Book Issue/Borrow Requests  |                     | • Issue / Return Processing   |
| • Active Issued Books List    |                     | • Comprehensive Circulation Log|
| • Return Action Initiation    |                     | • Library Activity Monitoring |
| • Personal Borrowing History  |                     | • Operational Overview Metrics|
+-------------------------------+                     +-------------------------------+
           |                                                      |
           +--------------------------+---------------------------+
                                      |
                                      v
                     +---------------------------------+
                     |    Centralized System Engine    |
                     |  & Transaction Record of Truth  |
                     +---------------------------------+
```

### 4.1 Solution Pillars
* **Centralized Digital Repository**: A single, reliable source of truth housing structured book catalog information, available copy quantities, student identities, and circulation logs.
* **Role-Delineated Portals**: Clearly defined, separate digital workflows tailored to the functional needs of Students and Librarians.
* **Streamlined Circulation Workflow**: Fast, consistent issue and return processing that immediately synchronizes copy availability upon transaction completion.
* **Comprehensive Activity Tracking**: Automatic, persistent logging of every issue and return event, providing an unbroken audit trail for both individual students and the institution.
* **Modern Black & White Academic Interface**: A professional, high-contrast, distraction-free visual presentation optimized for speed, clarity, and ease of use on desktop and portable workstations.

---

## 5. Business Objectives

The implementation of the SLMS is driven by targeted, measurable business objectives designed to modernize library workflows:

| Objective ID | Business Objective Description | Target Metric / Evaluation Measure |
| :--- | :--- | :--- |
| **BO-01** | **Eliminate Manual Paper Records** | 100% transition from paper-based borrowing ledgers to digital data storage for all active circulation transactions. |
| **BO-02** | **Accelerate Circulation Turnaround** | Reduce the average time required to issue or accept a book return from 4–6 minutes down to under 45 seconds per transaction. |
| **BO-03** | **Provide Instant Catalog Transparency** | Provide students with real-time visibility into book availability, search, and details with immediate status reflection. |
| **BO-04** | **Guarantee 100% Circulation Auditability** | Maintain a complete, unalterable historical log of every book issued, returned, and overdue across the student body. |
| **BO-05** | **Zero Inventory Stock Discrepancies** | Prevent double-issuing and phantom stock errors through automated, synchronized copy counters. |
| **BO-06** | **Empower Student Self-Sufficiency** | Enable students to register, verify borrowing status, and monitor their own library records independently. |

---

## 6. Project Goals

### 6.1 Short-Term Operational Goals (Phase 1)
* Establish a stable digital catalog where librarians can perform full CRUD (Create, Read, Update, Delete) operations on book records.
* Enable students to register and securely log in using validated email and password credentials.
* Implement a dependable issue and return transaction loop that updates book availability in real time.
* Deliver distinct dashboard views for Students (personal records) and Librarians (overall library monitoring).

### 6.2 Medium-Term Institutional Goals
* Retire all physical paper circulation ledgers and card registers across the target institution.
* Achieve complete user adoption across the student body with minimal user onboarding requirements.
* Establish a verified dataset of institutional reading preferences, popular academic categories, and circulation trends.

### 6.3 Academic & Demonstration Goals
* Provide a clear, well-structured, production-ready software project blueprint suitable for academic evaluation, code review, and viva defense.
* Ensure clear requirements traceability linking business objectives directly to subsequent system specifications and design artifacts.

---

## 7. Project Scope

### 7.1 In-Scope Capabilities
The system scope for Phase 1 covers the core workflows required for a fully operational student library:

1. **User Identity & Access Management**:
   * Student self-registration with valid email and password.
   * Secure credential-based login for Students.
   * Secure credential-based login for Librarians.
   * Session termination (secure logout) for both user roles.
2. **Book Catalog Management**:
   * Creation of new book entries with comprehensive metadata (Title, Author, ISBN/Identifier, Category, Total Copies).
   * Modification and updating of existing book details.
   * Deletion of book entries (restricted if active issues exist).
   * Search and filter capabilities by title, author, category, or availability.
   * Detailed book view displaying copy availability.
3. **Circulation Management (Issue & Return)**:
   * Student-initiated book issue requests and librarian issuance handling.
   * Direct librarian issuance of available books to registered students.
   * Systematic return handling: student return initiation and librarian return verification.
   * Automated increment/decrement of available copy counters.
4. **Tracking & Operational Oversight**:
   * Student dashboard showing currently issued books, due dates, and individual borrowing history.
   * Librarian console showing active issues across all students, return histories, and overall library activity statistics.
   * Management and review of registered student profiles by the Librarian.
5. **User Interface & Experience**:
   * Professional, high-contrast, modern Black & White visual theme.
   * Clean, responsive layout tailored for standard academic desktop and laptop displays.

### 7.2 Out-of-Scope Capabilities (Phase 1)
To ensure project completion within scheduled deadlines and maintain architectural clarity, the following features are explicitly deferred:

| Out-of-Scope Item | Rationale & Future Roadmap Consideration |
| :--- | :--- |
| **Financial Gateways & Fine Processing** | Online fine collection requires PCI-DSS compliance and payment gateways. Fines, if applicable, remain cash/manual off-system for Phase 1. |
| **Physical Barcode / RFID Hardware Integration** | Direct hardware tethering (scanners/RFID gates) adds device-driver complexity; manual entry and soft search are used for Phase 1. |
| **Digital Content Hosting / E-Book Readers** | System manages physical book inventory; PDF/EPUB streaming and digital rights management (DRM) are deferred. |
| **Third-Party Email / SMS Notification Gateways** | External dispatch gateways (Twilio, SendGrid) are excluded from the core baseline to avoid external API dependencies. |
| **Hierarchical Roles Beyond Student & Librarian** | Roles such as Department Heads, Multi-Campus Super-Admins, or Guest Auditors are not introduced in Phase 1. |
| **Inter-Library Loan (ILL) Federation** | Cross-institutional resource sharing across multiple university networks is out of scope. |

---

## 8. Stakeholders

The stakeholder landscape is intentionally focused on direct actors and institutional supervisors, avoiding unnecessary application roles.

```
+-----------------------------------------------------------------------------------+
|                              STAKEHOLDER MAP                                      |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [DIRECT APPLICATION ACTORS]                [INSTITUTIONAL GOVERNANCE]             |
|                                                                                   |
|  +---------------------------+              +----------------------------------+  |
|  |          STUDENT          |              |   COLLEGE LIBRARY ADMINISTRATION  |  |
|  |  Direct end-user;         |              |   Institutional policy maker;    |  |
|  |  Discovers, borrows, and  |              |   Approves circulation rules and |  |
|  |  monitors library items.  |              |   operational workflows.         |  |
|  +---------------------------+              +----------------------------------+  |
|               |                                              |                    |
|               v                                              v                    |
|  +---------------------------+              +----------------------------------+  |
|  |         LIBRARIAN         |              |   ACADEMIC PROJECT EVALUATOR     |  |
|  |  Operational administrator|              |   Reviews project quality,       |  |
|  |  Manages catalog, issues, |              |   documentation completeness,    |  |
|  |  returns, and students.   |              |   and requirements alignment.    |  |
|  +---------------------------+              +----------------------------------+  |
+-----------------------------------------------------------------------------------+
```

### 8.1 Primary Application Roles
* **Student**: The primary academic user. Relies on the system to locate required books, request loans, track due dates, and maintain personal library records without friction.
* **Librarian**: The authorized administrative operator. Holds exclusive responsibility for maintaining catalog integrity, managing student access, executing circulation actions, and monitoring collection metrics.

### 8.2 Organizational Stakeholders (Non-Application Users)
* **College Library Administration**: Provides library rules (loan durations, copy limits) and evaluates whether the software meets operational requirements.
* **Academic Faculty / Project Evaluators**: Evaluates the system's software engineering rigor, requirement specifications, design consistency, and code architecture.

---

## 9. User Roles and High-Level Responsibilities

The following matrix delineates operational boundaries between user roles to maintain clear role separation:

| Functional Domain | Student Role Responsibilities | Librarian Role Responsibilities |
| :--- | :--- | :--- |
| **Account Creation** | Self-registers via email and password with student details. | Provisioned securely via verified administrative onboarding. |
| **Authentication** | Authenticates securely; accesses personal student portal. | Authenticates securely; accesses administrative management console. |
| **Book Catalog Search** | Searches and views available books, categories, and stock status. | Searches and reviews books with full administrative editing controls. |
| **Catalog Maintenance** | **Read-Only**: No privileges to create, update, or remove titles. | **Full Control**: Adds new titles, modifies details, and removes titles. |
| **Issuance of Books** | Submits book issue/borrow requests for available titles. | Approves requests, issues books to students, updates stock. |
| **Returning Books** | Initiates book return actions from their active borrowings. | Inspects physical book, confirms return, restores stock availability. |
| **Circulation History** | Views their own historical issue and return activity records. | Accesses system-wide circulation audit trails across all students. |
| **Student Directory** | Can only view and edit their own user profile data. | Reviews, searches, and manages registered student records. |
| **Operational Oversight**| Views personal metrics (currently borrowed, total past reads). | Views library-wide metrics (total books, active issues, inventory). |

---

## 10. High-Level Business Requirements

The core business capabilities are categorized below under unique Business Requirement identifiers (BR-001 through BR-010):

| Requirement ID | Requirement Name | Description | Priority | Primary Actor |
| :--- | :--- | :--- | :--- | :--- |
| **BR-001** | **User Credential Management** | The system must allow users to register (students) and authenticate securely using email and password credentials. | Must Have | Student / Librarian |
| **BR-002** | **Role-Based Portal Access** | The system must partition application views into distinct Student and Librarian interfaces based on verified user roles. | Must Have | System / All Roles |
| **BR-003** | **Centralized Catalog Administration**| The system must provide librarians with comprehensive capabilities to add, edit, view, and delete book records. | Must Have | Librarian |
| **BR-004** | **Real-Time Catalog Search** | The system must provide real-time search and filter capabilities across book titles, authors, and categories with live availability. | Must Have | Student / Librarian |
| **BR-005** | **Managed Book Issuance** | The system must handle book borrowing workflows, ensuring only available books are issued to registered students. | Must Have | Student / Librarian |
| **BR-006** | **Automated Stock Restoration** | The system must process book returns, automatically incrementing available stock count and recording return dates. | Must Have | Librarian / Student |
| **BR-007** | **Personal Student Activity Tracking**| The system must maintain and display individual records of currently issued books and past borrowing history for each student. | Must Have | Student |
| **BR-008** | **Comprehensive Library Activity Audit**| The system must log every circulation transaction to provide librarians with an audit trail of all issued and returned items. | Must Have | Librarian |
| **BR-009** | **Student Record Administration** | The system must allow librarians to search, review, and manage registered student accounts and their loan statuses. | Must Have | Librarian |
| **BR-010** | **Operational Monitoring Dashboard** | The system must provide librarians with a consolidated dashboard displaying key operational metrics and inventory status. | Should Have | Librarian |

---

## 11. Student Business Requirements

This section details the functional expectations specific to the Student user:

| Requirement ID | Title | Business Requirement Specification | Priority |
| :--- | :--- | :--- | :--- |
| **BR-STU-001** | **Student Self-Registration** | The system must provide a public-facing self-registration mechanism allowing any student to create an account by providing their Full Name, Student/College Identification Number, Email Address, and Password. | Must Have |
| **BR-STU-002** | **Student Authentication** | The system must allow registered students to authenticate using their registered email address and password, granting access to the dedicated Student Portal. | Must Have |
| **BR-STU-003** | **Catalog Discovery & Search** | The system must provide students with an interactive catalog search tool to locate books by title, author, category, or ISBN, displaying real-time availability. | Must Have |
| **BR-STU-004** | **Book Information Inspection** | The system must allow students to view a detailed information card for any selected book, showing Title, Author, Category/Genre, ISBN/Code, Total Copies, and Available Copies. | Must Have |
| **BR-STU-005** | **Book Borrow/Issue Request** | The system must enable an authenticated student to request or issue an available book (where Available Copies > 0), recording the request against their student profile. | Must Have |
| **BR-STU-006** | **Active Borrowings Review** | The system must display a dedicated "Currently Issued Books" dashboard view showing all titles currently held by the student, along with issue dates and due dates. | Must Have |
| **BR-STU-007** | **Book Return Initiation** | The system must allow students to initiate or mark a book for return from their active borrowings list, notifying the system for librarian acceptance. | Must Have |
| **BR-STU-008** | **Personal Activity & History** | The system must maintain a permanent historical ledger for each student, detailing all previously issued and returned books with relevant timestamps. | Must Have |
| **BR-STU-009** | **Account Profile Management** | The system must allow students to review their registered profile details and update their access password securely. | Should Have |

---

## 12. Librarian Business Requirements

This section details the administrative and operational capabilities required by the Librarian:

| Requirement ID | Title | Business Requirement Specification | Priority |
| :--- | :--- | :--- | :--- |
| **BR-LIB-001** | **Librarian Secure Login** | The system must provide a protected authentication gateway for authorized Librarians using email and password credentials, redirecting to the administrative console. | Must Have |
| **BR-LIB-002** | **Add New Book Record** | The system must enable the Librarian to add new titles to the catalog by capturing Title, Author, ISBN/Identifier, Category, Publisher, Total Copies, and Available Copies. | Must Have |
| **BR-LIB-003** | **Modify Book Information** | The system must allow the Librarian to update existing book information, edit metadata fields, and adjust copy counts. | Must Have |
| **BR-LIB-004** | **Delete Book Entry** | The system must allow the Librarian to remove a book record from the active catalog, provided there are no active, unreturned issues linked to that title. | Must Have |
| **BR-LIB-005** | **Administrative Catalog Search**| The system must provide the Librarian with search and filter capabilities across all catalog entries, including titles with zero available copies. | Must Have |
| **BR-LIB-006** | **Student Account Administration**| The system must allow the Librarian to search, view, and inspect all registered student profiles and review their past and current borrowing activity. | Must Have |
| **BR-LIB-007** | **Direct Book Issuance** | The system must permit the Librarian to directly issue an available book to a designated student by selecting the student record and book title. | Must Have |
| **BR-LIB-008** | **Accept & Verify Book Return** | The system must provide the Librarian with a workflow to process returned books, verify physical return, update circulation status, and restore stock. | Must Have |
| **BR-LIB-009** | **Circulation Records Inspection**| The system must provide a master circulation log listing all historical and active issue and return transactions across the institution. | Must Have |
| **BR-LIB-010** | **Operational Monitoring Dashboard**| The system must provide an administrative dashboard displaying key metrics: Total Book Titles, Total Inventory Copies, Active Loans, and Total Registered Students. | Must Have |

---

## 13. Book Management Requirements

Book records represent the core physical assets managed by the library. The following business requirements govern the book catalog:

```
[Book Inventory Lifecycle]
   Add Book (Total = N, Available = N)
      │
      ├─ Issue Book ──> Available Copies decrements by 1 (Available = N - 1)
      │
      ├─ Return Book ─> Available Copies increments by 1 (Available = N)
      │
      └─ Delete Book ─> Allowed ONLY when Available Copies == Total Copies
```

| Requirement ID | Specification Detail |
| :--- | :--- |
| **BR-BKM-001** | **Mandatory Catalog Attributes**: Every book record must systematically store: <br>• Title (Text, Mandatory)<br>• Author (Text, Mandatory)<br>• ISBN or Unique Accession Code (Alphanumeric, Unique, Mandatory)<br>• Category / Genre (Subject classification, Mandatory)<br>• Edition / Publisher (Optional metadata)<br>• Total Copies (Positive integer $\ge 1$, Mandatory)<br>• Available Copies (Non-negative integer $\ge 0$, Mandatory) |
| **BR-BKM-002** | **Inventory Counter Invariant**: The system must enforce that for every book title: <br>$$\text{Available Copies} \le \text{Total Copies}$$ and $$\text{Available Copies} \ge 0$$. Under no circumstances may Available Copies exceed Total Copies or drop below zero. |
| **BR-BKM-003** | **Dynamic Availability Status**: When $\text{Available Copies} > 0$, the book status must be presented as **"Available"**. When $\text{Available Copies} = 0$, the status must automatically display as **"Out of Stock / Checked Out"**, preventing new issue requests. |
| **BR-BKM-004** | **Safe Deletion Protection**: A book record cannot be removed from the catalog if $\text{Available Copies} < \text{Total Copies}$ (indicating active circulating loans). A book must have all copies returned before deletion is allowed. |
| **BR-BKM-005** | **Catalog Uniqueness**: The system must verify that book identifiers (ISBN/Accession Code) are strictly unique, preventing duplicate entries for the same edition. |

---

## 14. Library Issue and Return Process Requirements

The circulation lifecycle must adhere to a standardized business flow to ensure consistency between physical items and digital records:

```
+-----------------------------------------------------------------------------------+
|                        CIRCULATION LIFECYCLE WORKFLOW                             |
+-----------------------------------------------------------------------------------+

[ISSUE PHASE]
  Student / Librarian selects available book (Available > 0)
       │
       ▼
  System checks student eligibility & active loan count
       │
       ▼
  System creates Transaction Record (Issue Date, Due Date, Status: "ISSUED")
       │
       ▼
  System decrements Available Copies by 1 (Real-time update)

[RETURN PHASE]
  Book returned physically to Librarian desk
       │
       ▼
  Librarian locates active transaction & confirms return
       │
       ▼
  System updates Transaction Record (Return Date recorded, Status: "RETURNED")
       │
       ▼
  System increments Available Copies by 1 (Book returns to "Available" status)
```

| Requirement ID | Specification Detail |
| :--- | :--- |
| **BR-CIR-001** | **Issue Validation**: Prior to confirming an issuance, the system must verify: <br>1. The book exists and has at least one available copy ($\text{Available Copies} \ge 1$).<br>2. The student account is active and verified.<br>3. The student does not already hold an active, unreturned copy of the exact same book title. |
| **BR-CIR-002** | **Transaction Record Creation**: Every successful issue must generate a permanent, immutable record containing: <br>• Unique Transaction Reference ID<br>• Student Identifier and Name<br>• Book Identifier and Title<br>• Issue Timestamp<br>• Standard Expected Due Date<br>• Circulation Status (set to `ISSUED`) |
| **BR-CIR-003** | **Return Verification & Closure**: When an issued book is returned: <br>1. The Librarian confirms receipt of the physical item.<br>2. The system updates the circulation transaction status to `RETURNED`.<br>3. The system records the exact Return Timestamp.<br>4. The transaction is closed and archived in the active ledger. |
| **BR-CIR-004** | **Inventory Recalculation**: Upon saving a return transaction, the system must immediately increment the book's $\text{Available Copies}$ by 1, instantly updating catalog search results. |
| **BR-CIR-005** | **Immutable Audit Ledger**: Historical circulation records must be permanently preserved. Transactions cannot be hard-deleted from the database, ensuring historical reporting accuracy. |

---

## 15. Authentication & Access Requirements

| Requirement ID | Specification Detail |
| :--- | :--- |
| **BR-AUT-001** | **Student Registration Standard**: The registration interface must collect and validate: Full Name, Student/College Identification ID, valid institutional Email Address, and secure Password. Email addresses must be unique across the user base. |
| **BR-AUT-002** | **Credential Validation**: Both Student and Librarian login flows must authenticate users using exact email and password matching against securely hashed credentials. |
| **BR-AUT-003** | **Role-Based Redirect & Separation**: Upon successful authentication: <br>• Users with the `Student` role are directed exclusively to the Student Portal.<br>• Users with the `Librarian` role are directed exclusively to the Librarian Console.<br>Direct URL access to librarian administrative functions must be barred to students. |
| **BR-AUT-004** | **Session Termination (Logout)**: Both portals must feature a prominent, accessible "Logout" action that securely terminates the active session, clears user state, and redirects to the public login screen. |
| **BR-AUT-005** | **Account Privacy Enforcement**: Under no circumstances may a student user access, view, or modify the borrowing activity, profile information, or circulation history of another student. |

---

## 16. Business Rules

The following core business rules govern all interactions within the system. These rules are non-negotiable and must be enforced across all workflows:

```
+------------------------------------------------------------------------------------+
|                               CORE BUSINESS RULES                                  |
+------------------------------------------------------------------------------------+
| RULE-01: Identity Verification    -> Only registered, authenticated students can   |
|                                       request or borrow books.                     |
| RULE-02: Administrative Authority -> Only authorized Librarians can add, edit, or  |
|                                       delete book records.                         |
| RULE-03: Stock Availability       -> A book can ONLY be issued if Available >= 1.  |
| RULE-04: Inventory Restoration    -> Every returned book increments Available by 1 |
|                                       and updates the catalog immediately.         |
| RULE-05: Audit Persistence        -> Circulation history is immutable and never    |
|                                       hard-deleted.                                |
| RULE-06: Student Data Isolation   -> Students can only access their own records.   |
| RULE-07: Catalog Safeguard        -> Books with active, unreturned issues cannot    |
|                                       be deleted from the catalog.                 |
| RULE-08: Duplicate Issue Limit    -> A student cannot concurrently hold multiple   |
|                                       copies of the same title.                    |
+------------------------------------------------------------------------------------+
```

### Detailed Business Rule Specifications

* **RULE-01 (Eligibility Requirement)**: Only students with an active, registered, and verified account in the system are eligible to request and borrow library books.
* **RULE-02 (Catalog Governance)**: Students possess read-only catalog access. Only users authenticated with the Librarian role have the authority to add new book records, edit book metadata, or remove books from the library inventory.
* **RULE-03 (Availability Constraint)**: A book can be issued if and only if $\text{Available Copies} \ge 1$. If $\text{Available Copies} = 0$, the system must block issuance and indicate "Unavailable / Out of Stock".
* **RULE-04 (Inventory Reversibility)**: When a book return is verified and accepted by the Librarian, the system must increment $\text{Available Copies}$ by exactly 1, restoring availability for subsequent borrowers.
* **RULE-05 (Audit Integrity)**: All circulation transactions (issues, returns, dates, involved actors) must be permanently logged in the system. Circulation logs must never be deleted or purged during normal operations.
* **RULE-06 (Account Isolation)**: Each student's library activity is strictly private. A student may view their own current issues and history, but is prevented from viewing another student's account or loan records.
* **RULE-07 (Deletion Protection Invariant)**: A book cannot be deleted from the catalog if any copy of that book is currently on loan ($\text{Available Copies} < \text{Total Copies}$). All copies must be accounted for and returned before deletion is permitted.
* **RULE-08 (Single Active Copy Per Title)**: To prevent hoarding of high-demand textbooks, a student cannot borrow multiple copies of the exact same book title concurrently. A student must return their current copy before requesting that title again.

---

## 17. High-Level Functional Expectations

The following end-to-end workflows summarize system behavior across common operational scenarios:

### 17.1 Workflow 1: Student Registration and Account Setup
1. A prospective student accesses the system and navigates to the Registration page.
2. The student enters their Full Name, College ID, Email Address, and chosen Password.
3. The system validates the inputs (ensuring email format is correct and not already registered).
4. The system creates the student profile and redirects the user to the Login screen with a success confirmation.

### 17.2 Workflow 2: Book Discovery and Availability Check
1. An authenticated student accesses the Book Search view.
2. The student inputs search criteria (keyword, book title, author, or category).
3. The system returns matching books with clear availability indicators (e.g., "Available: 3 of 5 copies" or "Out of Stock").
4. The student selects a book to view detailed information (description, category, publisher).

### 17.3 Workflow 3: Book Borrowing and Issuance
1. **Student Request Path**: The student clicks "Request Book" on an available title. The system creates a pending issue record, and the student presents their ID at the library desk.
2. **Librarian Processing**: The Librarian pulls up the student's profile, confirms the book title, and clicks "Issue Book".
3. **System Execution**:
   * Generates a unique transaction record with issue timestamp and calculated due date.
   * Decrements $\text{Available Copies}$ by 1.
   * Adds the title to the student's "Currently Issued Books" dashboard.
   * Updates catalog availability across the system.

### 17.4 Workflow 4: Book Return and Inventory Restoration
1. The student brings the physical book to the library desk and presents it to the Librarian.
2. The Librarian accesses the student's active borrowings or searches the active circulation log.
3. The Librarian clicks "Accept Return" after verifying the physical copy.
4. **System Execution**:
   * Updates transaction status from `ISSUED` to `RETURNED`.
   * Records the return timestamp.
   * Increments the book's $\text{Available Copies}$ by 1.
   * Removes the item from the student's active list and archives it to their borrowing history.

### 17.5 Workflow 5: Catalog Management by Librarian
1. The Librarian authenticates and opens the Book Management Console.
2. To add a title, the Librarian inputs required book metadata and initial total copy count. The system saves the entry with $\text{Available Copies} = \text{Total Copies}$.
3. To update a title, the Librarian edits metadata fields (e.g., correcting an author's name or updating total copies).
4. To delete a title, the Librarian requests deletion. The system verifies that $\text{Available Copies} == \text{Total Copies}$; if verified, the title is removed. If copies are circulating, deletion is blocked with a clear warning.

---

## 18. Non-Functional Business Expectations

To ensure the system meets college-level project standards and provides a reliable operating experience, the following non-functional expectations are established:

```
+------------------------------------------------------------------------------------+
|                         NON-FUNCTIONAL EXPECTATIONS MATRIX                         |
+------------------------------------------------------------------------------------+
|  SECURITY       | Credential hashing, role-based route guards, private data access |
|  PERFORMANCE    | Search responses < 1.0s, issue/return transactions < 1.5s        |
|  AVAILABILITY   | 99.0% uptime during institutional operational and study hours    |
|  USABILITY      | Modern Black & White aesthetic, intuitive zero-training layout   |
|  SCALABILITY    | Up to 5,000 active students, 20,000 books, 50,000 log records    |
|  MAINTAINABILITY| Clean domain separation, modular components, relational schema   |
|  DATA INTEGRITY | ACID-compliant circulation transactions, foreign key constraints |
+------------------------------------------------------------------------------------+
```

### 18.1 Security
* **Authentication Security**: Passwords must be protected using industry-standard one-way cryptographic hashing before storage. Plaintext passwords must never be stored or exposed in logs.
* **Access Control & Authorization**: The system must enforce strict role-based authorization. Administrative endpoints and views must be inaccessible to student accounts.
* **Data Privacy**: Students must never have access to other students' profiles, borrowing records, or contact information.

### 18.2 Performance
* **Search Latency**: Book catalog search and filter queries must return results in under 1.0 second under normal network conditions for a catalog of up to 20,000 entries.
* **Transaction Processing Time**: Submitting an issue or return transaction must complete within 1.5 seconds, providing immediate visual feedback to the user.
* **System Responsiveness**: User interface views must load and render smoothly without noticeable UI stutter.

### 18.3 Availability & Reliability
* **Operational Availability**: The system must achieve a target operational uptime of at least 99.0% during campus library operating and study hours (07:00 to 22:00 local time).
* **Fault Tolerance**: The system must handle input validation errors gracefully, displaying informative error messages rather than unhandled system exceptions or blank screens.

### 18.4 Usability & Aesthetics
* **Modern Black & White Visual Theme**: The user interface must employ a clean, modern, high-contrast monochrome design (deep blacks, crisp whites, and neutral grays). This provides high legibility, professional elegance, and an uncluttered user experience.
* **Intuitive Navigation**: Navigation layouts must be self-explanatory, requiring zero formal training for students to register, search for books, and monitor their borrowings.
* **Responsive Adaptability**: Layouts must render cleanly across standard laptop, desktop, and tablet screen resolutions.

### 18.5 Scalability
* **Institutional Volume Capacity**: The baseline business architecture must comfortably support an institutional scope of at least:
  * 5,000 registered student accounts.
  * 20,000 distinct book titles.
  * 100,000 physical copy inventory items.
  * 50,000 historical circulation transaction records.

### 18.6 Maintainability & Extensibility
* **Clear Domain Separation**: Business logic must maintain clean separation between User Management, Catalog Management, and Circulation Records.
* **Schema Normalization**: Relational data structures must adhere to standard database normalization principles, ensuring ease of maintenance and extensibility for future phases.

### 18.7 Data Integrity & Consistency
* **ACID Compliance for Circulation Transactions**: Book issue and return operations must be executed as atomic transactions. The stock counter update and transaction record insertion must succeed together or fail together, preventing orphan records or miscounted stock.
* **Referential Integrity**: Hard foreign key relationships must protect against orphaned records (e.g., preventing a student profile from being deleted if they currently hold issued books).

---

## 19. Assumptions

The requirements defined in this BRD are predicated on the following project assumptions:

1. **Institutional Setting**: The system will be deployed within a single college or academic institution with one centralized physical library facility.
2. **User Hardware & Connectivity**: Students and librarians have access to personal computers, laptops, or campus terminals equipped with standard modern web browsers and stable campus internet/intranet connectivity.
3. **Physical Handover**: The physical exchange of books occurs at the physical library circulation counter. The system acts as the digital record-keeper and does not replace physical inventory handling.
4. **Verification Authority**: The Librarian is responsible for inspecting physical book conditions (checking for damages or missing pages) before accepting a return in the system.
5. **Initial Administrative Account**: The initial Librarian credential set will be provisioned securely during system deployment/setup to allow immediate administrative access.
6. **Unique Institutional Email/ID**: Students possess unique institutional or personal email addresses and student identification numbers issued by the college.

---

## 20. Constraints

The project operates under the following business and project constraints:

1. **Role Scope Constraint**: The system is strictly constrained to two active application user roles: Student and Librarian. No intermediate roles (e.g., department heads, guest users) will be introduced in this phase.
2. **Technological Direction (Planned Implementation)**: The system's future implementation is planned around React for the frontend, Node.js + Express.js for the backend, MySQL for the relational database, and a Black & White UI theme. The business requirements must align with these technical capabilities.
3. **Academic Project Timeline**: Requirements must remain realistic, scoped, and implementable within the academic semester timeframe without requiring third-party subscription services or proprietary licensing.
4. **Zero Financial Processing**: No monetary fine calculation or online payment gateway is included in Phase 1; overdue fines (if enforced by the college) remain an external, manual process.

---

## 21. Dependencies

The successful rollout and validation of the SLMS depend upon the following factors:

1. **Catalog Seed Data**: Availability of a baseline list of college library books (titles, authors, categories, ISBNs, copy counts) for initial catalog population and testing.
2. **Institutional Rule Approval**: Final sign-off from the college library administration regarding loan periods (e.g., standard 14-day checkout) and borrow limits (e.g., maximum 3 books per student).
3. **Hosting Infrastructure**: Availability of a local or cloud hosting environment (Node.js runtime and MySQL database server) during the upcoming implementation and evaluation phases.

---

## 22. Risks and High-Level Mitigation

| Risk ID | Identified Risk | Impact | Probability | High-Level Mitigation Strategy |
| :--- | :--- | :--- | :--- | :--- |
| **RSK-01** | **Discrepancy Between Digital & Physical Stock**<br>A book is marked available in the system, but the physical copy is misplaced on shelves. | Medium | Medium | Include clear copy count visibility and allow the Librarian to quickly adjust copy counts or mark titles as missing during stock audits. |
| **RSK-02** | **Simultaneous Issue Requests (Race Condition)**<br>Two students attempt to borrow the last available copy of a popular textbook at the same moment. | High | Low | Enforce transactional atomicity and availability verification at the exact instant of issue confirmation. |
| **RSK-03** | **Student Credential Sharing / Unauthorized Access**<br>Students sharing accounts to borrow books on behalf of peers. | Medium | Low | Associate student registration with a unique Student ID Number; require physical ID presentation at the circulation desk during checkout. |
| **RSK-04** | **Accidental Deletion of Circulating Books**<br>A librarian inadvertently attempts to delete a book title currently on loan. | High | Low | Enforce Business Rule RULE-07: The system must hard-block deletion if any copy is currently checked out ($\text{Available} < \text{Total}$). |
| **RSK-05** | **Data Loss Due to System Failure**<br>Loss of active issue records due to unhandled server crashes or database corruption. | High | Low | Implement robust database persistence with foreign key constraints, structured table schemas, and periodic backup procedures. |

---

## 23. Success Criteria

The success of the Student Library Management System project will be evaluated against the following criteria:

| Metric Category | Success Criteria Evaluation Benchmark |
| :--- | :--- |
| **Functional Completeness** | 100% successful execution of all Must-Have requirements (BR-001 through BR-010) across Student and Librarian roles. |
| **Operational Efficiency** | Average transaction completion time for issuing and returning books reduced to under 45 seconds per interaction. |
| **Catalog Transparency** | 100% of available library titles searchable with real-time copy counters and zero phantom stock errors. |
| **Audit Compliance** | Complete, unbroken circulation history logged for every transaction with student ID, book code, issue date, and return status. |
| **UI Usability** | Positive feedback on the modern Black & White interface, with users completing core tasks without formal user manuals. |
| **Academic Standards** | Full compliance with academic project documentation, requirements traceability, and software engineering standards. |

---

## 24. Future Enhancement Possibilities

While out of scope for the current baseline, the following enhancements represent logical extensions for future project iterations:

```
[Future Roadmap Extensions]
 ├── Automated Fine Calculator & Digital Payment Gateway (UPI / Card)
 ├── Barcode / QR-Code Scanning for Instant Counter Checkout
 ├── Automated Email & SMS Notifications for Due Dates & Overdue Alerts
 ├── Book Reservation & Queue System for Out-of-Stock Titles
 ├── Digital Library Integration (PDF / EPUB Academic Paper Repository)
 └── Analytics Dashboard: Student Reading Habits & Departmental Usage Trends
```

1. **Automated Fine Calculation & Online Payments**: Integrated fee calculation rules based on overdue days with payment gateway integration for fine settlement.
2. **Barcode & QR Code Hardware Scanning**: Instant book check-in and check-out via USB barcode/QR scanners reading physical book accession stickers.
3. **Automated Alert & Notification Engine**: Email and SMS dispatch pipelines sending reminders 48 hours prior to due dates and automated overdue notices.
4. **Reservation & Waitlist Queue**: Enabling students to place a "Hold" or reservation on a checked-out book, notifying them when the title is returned.
5. **Digital E-Book & Research Paper Module**: Storing and viewing institutional PDF course packs, research monographs, and past exam papers.
6. **Advanced Analytics & Predictive Recommendations**: Machine learning-assisted book recommendations based on academic branch, course syllabus, and peer reading trends.

---

## 25. Requirements Traceability Summary

The following matrix establishes direct traceability between the high-level Business Objectives, functional Business Requirements, target user roles, and implementation priority:

| Business Objective | Requirement ID | Requirement Summary | User Role | Priority |
| :--- | :--- | :--- | :--- | :--- |
| **BO-01, BO-06** | **BR-001 / BR-STU-001** | Student Self-Registration | Student | Must Have |
| **BO-01, BO-06** | **BR-001 / BR-STU-002** | Student Secure Authentication | Student | Must Have |
| **BO-01, BO-04** | **BR-001 / BR-LIB-001** | Librarian Secure Authentication | Librarian | Must Have |
| **BO-03, BO-06** | **BR-004 / BR-STU-003** | Real-Time Catalog Search & Filter | Student | Must Have |
| **BO-03, BO-06** | **BR-004 / BR-STU-004** | View Comprehensive Book Details | Student | Must Have |
| **BO-02, BO-05** | **BR-005 / BR-STU-005** | Book Issue / Borrow Request | Student | Must Have |
| **BO-04, BO-06** | **BR-007 / BR-STU-006** | View Active Issued Books Dashboard | Student | Must Have |
| **BO-02, BO-04** | **BR-006 / BR-STU-007** | Book Return Initiation | Student | Must Have |
| **BO-04, BO-06** | **BR-007 / BR-STU-008** | View Personal Borrowing History | Student | Must Have |
| **BO-01, BO-05** | **BR-003 / BR-LIB-002** | Add New Book to Catalog | Librarian | Must Have |
| **BO-01, BO-05** | **BR-003 / BR-LIB-003** | Edit Book Information & Stock | Librarian | Must Have |
| **BO-01, BO-05** | **BR-003 / BR-LIB-004** | Delete Book Record (Safe Guarded) | Librarian | Must Have |
| **BO-03, BO-05** | **BR-004 / BR-LIB-005** | Administrative Catalog Search | Librarian | Must Have |
| **BO-01, BO-04** | **BR-009 / BR-LIB-006** | Manage & Inspect Student Records | Librarian | Must Have |
| **BO-02, BO-05** | **BR-005 / BR-LIB-007** | Direct Book Issuance to Students | Librarian | Must Have |
| **BO-02, BO-05** | **BR-006 / BR-LIB-008** | Accept & Verify Book Returns | Librarian | Must Have |
| **BO-04, BO-05** | **BR-008 / BR-LIB-009** | Master Circulation Audit Log | Librarian | Must Have |
| **BO-01, BO-04** | **BR-010 / BR-LIB-010** | Operational Activity Dashboard | Librarian | Must Have |
| **BO-05** | **BR-BKM-001 - 005** | Book Inventory & Counter Invariants | System | Must Have |
| **BO-02, BO-04** | **BR-CIR-001 - 005** | Issue/Return Lifecycle & Logging | System | Must Have |
| **BO-01, BO-04** | **BR-AUT-001 - 005** | Role Partitioning & Session Security| System | Must Have |

---
*End of Business Requirements Document (BRD)*
