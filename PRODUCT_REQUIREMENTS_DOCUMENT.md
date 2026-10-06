# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Student Library Management System (SLMS)

---

## 1. Document Control

### 1.1 Document Information
| Field | Details |
| :--- | :--- |
| **Document Name** | Product Requirements Document (PRD) |
| **Project Name** | Student Library Management System (SLMS) |
| **Document Version** | 1.0 (Baseline Release) |
| **Date** | October 4, 2026 |
| **Document Status** | Approved Product Baseline |
| **Source Documents** | `BUSINESS_REQUIREMENTS_DOCUMENT.md` (v1.0), `FUNCTIONAL_REQUIREMENTS_DOCUMENT.md` (v1.2) |
| **Product Owner / Role** | Senior Product Manager & Product Requirements Lead |
| **Intended Audience** | Academic Evaluators, Project Mentors, UI/UX Designers, Frontend & Backend Engineers, QA Test Engineers |

### 1.2 Revision History
| Version | Date | Author | Description of Change | Status |
| :--- | :--- | :--- | :--- | :--- |
| 1.0 | 2026-10-04 | Senior Product Manager | Initial release of the Product Requirements Document, fully aligned with the approved BRD and FRD. Enforces strict dual-role scope (Student and Librarian) with no unsupported business rules or invented values. | Approved Baseline |

### 1.3 Baseline Compliance
This PRD represents the product-level translation of the accepted Business Requirements Document (BRD) and Functional Requirements Document (FRD). It defines the product features, user journeys, feature requirements, user experience standards, and product constraints. It introduces no extraneous user roles, loan limits, loan durations, counter verification protocols, or unsupported business rules.

---

## 2. Product Overview

### 2.1 What the Product Is
The **Student Library Management System (SLMS)** is a centralized, digital web application designed to manage the core borrowing, cataloging, and administrative workflows of an academic student library. 

### 2.2 Who Will Use It
The product is built exclusively for two user groups:
1. **Students**: Enrolled students seeking to discover learning resources, check real-time availability, borrow books, track active loans, return books, and view their library reading history.
2. **Librarians**: Library staff members responsible for maintaining the book catalog, tracking physical inventory, managing student records, issuing books, accepting returned items, and monitoring institutional circulation records.

### 2.3 What Problem It Solves
Academic libraries relying on physical ledger books, paper issue slips, and manual card catalogs experience high search latency, inventory inaccuracies, lost loan records, and operational bottlenecks. The SLMS digitizes these manual processes into a unified, responsive platform that eliminates paper records, automates stock tracking, and prevents loan record loss.

### 2.4 How It Provides Value
* **For Students**: Provides instant self-service catalog discovery, transparency into real-time book availability, effortless book requests, and an accessible personal record of currently issued books and past reading history.
* **For Librarians**: Provides complete catalog governance (Add, Edit, Delete with active loan protection), centralized student record inspection, fast issue and return processing, automated stock synchronization, and a complete audit trail of library activities.
* **For the Institution**: Eliminates inventory discrepancies, prevents duplicate checkouts of the same title, ensures complete record accountability, and elevates library service efficiency.

---

## 3. Product Vision

To provide academic institutions with a simple, professional, and reliable digital library platform that streamlines catalog discovery, automates book circulation, and establishes complete operational transparency for students and librarians through a modern, distraction-free Black & White interface.

---

## 4. Product Mission

To replace cumbersome manual library registers with an intuitive, dependable, and centralized software system that empowers students to discover and borrow academic resources effortlessly while enabling librarians to oversee catalog assets, student records, and circulation workflows with total accuracy and minimal administrative overhead.

---

## 5. Problem Statement

Manual library management in educational institutions creates friction for students and librarians alike:
1. **Search Inefficiency**: Students must physically visit the library and manually search physical shelves or card boxes without knowing in advance if a title is in stock.
2. **Circulation Bottlenecks**: Writing names, accession numbers, and dates into physical ledgers is slow, prone to transcription errors, and results in service delays during busy hours.
3. **Inventory Opacity**: Librarians lack real-time visibility into circulating versus available copy counts, making inventory auditing labor-intensive and prone to discrepancies.
4. **Lack of Personal Record Access**: Students have no continuous visibility into their issued titles, due dates, or personal borrowing histories.
5. **Vulnerability of Paper Records**: Physical logbooks are subject to wear, damage, misplacement, and lack of searchable audit trails.

---

## 6. Target Users

The system is strictly designed for two distinct user groups. There is no Administrator role, super-user role, or guest role.

```
+-----------------------------------------------------------------------------------+
|                               TARGET USER GROUPS                                  |
+-----------------------------------------------------------------------------------+
|  USER ROLE  | PRIMARY NEEDS               | EXPECTED EXPERIENCE                   |
+-------------+-----------------------------+---------------------------------------+
|  STUDENT    | • Fast catalog discovery    | • Clean, uncluttered Black & White UI |
|             | • Real-time stock status    | • Frictionless self-registration     |
|             | • Simple borrow & return    | • Instant search & availability view  |
|             | • Clear view of active loans| • Private, persistent loan history    |
+-------------+-----------------------------+---------------------------------------+
|  LIBRARIAN  | • Full catalog control      | • High-productivity control console   |
|             | • Inventory accuracy        | • Fast issue & return workflows       |
|             | • Student record oversight  | • Safe deletion guards for inventory  |
|             | • Complete circulation audit| • Instant operational overview        |
+-----------------------------------------------------------------------------------+
```

### 6.1 Student
* **User Needs**: Fast, reliable access to academic literature; immediate insight into whether a book is available; clear awareness of due dates.
* **Goals**: Find required course materials quickly, borrow and return books without administrative delays, and maintain a clear personal reading history.
* **Expected Experience**: A modern, responsive, high-contrast monochrome interface with zero unnecessary steps, clear availability indicators, and instant feedback.
* **Major Tasks**:
  * Register an account with college details and login securely.
  * Search the catalog by Title, Author, Category, or ISBN.
  * Inspect book details and current copy availability counts.
  * Request/issue an available book.
  * View currently issued books and associated due dates.
  * Return issued books.
  * Review personal borrowing and return history.
  * Logout securely.

### 6.2 Librarian
* **User Needs**: Centralized control over book assets; authoritative records of circulating items; reliable student account management.
* **Goals**: Maintain an accurate, up-to-date book catalog; process circulation transactions rapidly; prevent loss of physical inventory.
* **Expected Experience**: An administrative dashboard and management console with clear data tables, intuitive forms, instant stock updates, and protective validation guards.
* **Major Tasks**:
  * Login securely via authenticated credentials.
  * Add new book titles with bibliographic data and copy counts.
  * Edit existing book information and adjust inventory counts.
  * Delete books from the catalog safely (blocked if copies are currently issued).
  * Search and inspect all book titles (including zero-stock items).
  * Search and review registered student profiles and their loan histories.
  * Issue available books to students.
  * Accept returned books and confirm inventory restoration.
  * View global circulation records (all issued and returned books).
  * Monitor overall library operational statistics.
  * Logout securely.

---

## 7. User Personas

### 7.1 Student Persona
* **Name**: Alex Chen
* **Role**: Undergraduate Student
* **Context**: Enrolled in a university degree program, frequently requiring reference textbooks and academic monographs for coursework and exams.
* **Frustrations with Manual Systems**: Arriving at the library only to discover a required book is checked out; standing in ledger-entry lines; losing track of return due dates.
* **Product Expectations**: Wants to open the web application, quickly search for a book, verify its availability status, request it, and see all currently borrowed books and due dates in a clean personal dashboard.

### 7.2 Librarian Persona
* **Name**: Dr. Margaret Davis
* **Role**: College Librarian
* **Context**: Responsible for maintaining thousands of library titles, serving hundreds of students daily, and ensuring inventory accountability.
* **Frustrations with Manual Systems**: Illegible handwriting in loan registers; inventory discrepancies between shelf stock and ledger notes; accidental record deletions; manually compiling activity reports.
* **Product Expectations**: Wants a dependable, distraction-free management console where adding a book takes seconds, issuing/returning books is instantaneous, catalog deletion is protected against active loans, and overall library activity is visible at a glance.

---

## 8. Product Goals

1. **Digital Transition**: Provide a 100% digital alternative to manual library ledgers and paper circulation registers.
2. **Operational Efficiency**: Streamline book search, issue, and return interactions into simple, rapid steps.
3. **Data Accuracy & Stock Invariants**: Enforce strict system invariants ensuring that available copies never exceed total copies or drop below zero, and active loans cannot be silently lost.
4. **Role Integrity**: Deliver strictly separated, purpose-built interfaces for Students and Librarians without administrative complexity or role ambiguity.
5. **Academic Usability**: Provide an intuitive, distraction-free Black & White interface requiring no user training for students or library staff.

---

## 9. Product Objectives

* **OBJ-01**: Enable students to self-register and authenticate securely using email and password.
* **OBJ-02**: Enable librarians to authenticate securely and access an operational management console.
* **OBJ-03**: Deliver a real-time catalog search engine querying Title, Author, Category, and ISBN with live copy availability status.
* **OBJ-04**: Implement a reliable issue and return transaction loop that atomically updates copy availability upon transaction completion.
* **OBJ-05**: Provide students with dedicated dashboard views displaying active loans, due dates, and past borrowing history.
* **OBJ-06**: Provide librarians with full catalog management capabilities (Add, Edit, Delete with active loan protection), student directory inspection, and master circulation logging.

---

## 10. Product Scope

### 10.1 In-Scope Capabilities
The product scope is strictly defined by the approved BRD and FRD:

1. **Authentication & Identity**:
   * Student account self-registration.
   * Student credential-based login (email/password).
   * Librarian credential-based login (email/password).
   * Secure session termination (logout) for both roles.
2. **Student Portal**:
   * Student Dashboard summarizing active library standing.
   * Real-time catalog search and category filtering.
   * Book details view with live availability status.
   * Book request/issue action for available titles.
   * "Currently Issued Books" view showing active loans and due dates.
   * Book return action.
   * Personal library activity/history ledger.
3. **Librarian Console**:
   * Librarian Dashboard monitoring overall library statistics.
   * Book catalog creation (Add Book with metadata and copy counts).
   * Book catalog editing (Edit Book metadata and copy adjustments).
   * Book catalog deletion (Delete Book safeguarded against active loans).
   * Administrative book search and catalog inspection.
   * Student directory inspection (view students, active loans, and history).
   * Book issuance to students.
   * Book return acceptance and stock restoration.
   * Master circulation log (all issued and returned transactions).
4. **User Experience**:
   * Modern, professional Black & White theme.
   * Responsive layout for desktop and laptop devices.

### 10.2 Out-of-Scope Capabilities
To maintain project focus and adhere strictly to the approved baseline, the following features are explicitly out of scope:
* Monetary fines and online payment processing.
* Physical hardware tethering (barcode, QR, or RFID scanners).
* Digital e-book content hosting or PDF readers.
* Third-party email or SMS dispatch gateways.
* Additional user roles (Admin, Super-Admin, Guest, Department Head).
* Inter-library loan systems across multi-campus institutions.

---

## 11. Product Features Summary

```
+-----------------------------------------------------------------------------------+
|                        SLMS PRODUCT FEATURE STRUCTURE                             |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [AUTHENTICATION]                                                                 |
|  ├── Student Registration (Name, Student ID, Email, Password)                     |
|  ├── Student Login & Session Management                                           |
|  ├── Librarian Login & Session Management                                         |
|  └── Secure Logout for both roles                                                 |
|                                                                                   |
|  [STUDENT PORTAL]                       [LIBRARIAN CONSOLE]                       |
|  ├── Student Dashboard                  ├── Librarian Overview Dashboard          |
|  ├── Catalog Search & Availability      ├── Add New Book                          |
|  ├── View Detailed Book Information     ├── Edit Existing Book                    |
|  ├── Request / Issue Book               ├── Delete Book (Safe Deletion Guard)     |
|  ├── View Currently Issued Books        ├── Administrative Book Search            |
|  ├── Return Issued Books                ├── Manage Student Records                |
|  └── Personal Activity History          ├── Issue Books to Students               |
|                                         ├── Accept Returned Books                 |
|                                         └── Master Circulation Records Log        |
+-----------------------------------------------------------------------------------+
```

---

## 12. Feature Requirements

### 12.1 Authentication Features

#### FEAT-01: Student Registration
* **Purpose**: Allow prospective students to register their individual accounts.
* **User**: Prospective Student (Unauthenticated)
* **User Need**: Quick, independent account creation without manual administrative intervention.
* **Expected Behavior**: Student submits Name, Student ID, Email, and Password. System validates unique email and Student ID, hashes password, creates account, and redirects to login.
* **Preconditions**: User is on the registration screen; email and Student ID are not previously registered.
* **Expected Outcome**: Student account is created with `Student` role; student can log in.
* **Priority**: Must Have

#### FEAT-02: Student Login
* **Purpose**: Authenticate registered students and grant access to the Student Portal.
* **User**: Student
* **User Need**: Secure, simple access to personal library features.
* **Expected Behavior**: Student inputs registered email and password. System validates credentials and redirects to the Student Dashboard.
* **Preconditions**: Student account exists.
* **Expected Outcome**: Authenticated student session initialized; student views their dashboard.
* **Priority**: Must Have

#### FEAT-03: Librarian Login
* **Purpose**: Authenticate authorized librarians and grant access to the Librarian Console.
* **User**: Librarian
* **User Need**: Secure administrative entry to manage library resources.
* **Expected Behavior**: Librarian inputs registered email and password. System validates credentials and redirects to the Librarian Dashboard.
* **Preconditions**: Librarian account exists.
* **Expected Outcome**: Authenticated librarian session initialized; librarian views the management console.
* **Priority**: Must Have

#### FEAT-04: User Logout
* **Purpose**: Terminate an active user session securely.
* **User**: Student, Librarian
* **User Need**: Ensure privacy and security when leaving the application.
* **Expected Behavior**: User clicks Logout; system destroys active session and redirects to Login screen with confirmation.
* **Preconditions**: User is logged in.
* **Expected Outcome**: Session cleared; protected views become inaccessible.
* **Priority**: Must Have

---

### 12.2 Student Features

#### FEAT-05: Student Dashboard
* **Purpose**: Present a personalized overview of the student's active library status.
* **User**: Student
* **User Need**: Immediate clarity on books currently borrowed, due dates, and quick navigation.
* **Expected Behavior**: Displays student profile details, count of currently issued books, list of active issues with due dates, and quick links to catalog search and history.
* **Preconditions**: Student is authenticated.
* **Expected Outcome**: Student sees their current library standing at a glance.
* **Priority**: Must Have

#### FEAT-06: Catalog Search & Availability
* **Purpose**: Enable students to discover books and check real-time stock levels.
* **User**: Student (and Librarian)
* **User Need**: Quickly determine if a required textbook is in the library and available to borrow.
* **Expected Behavior**: User enters query; system filters by Title, Author, Category, or ISBN; results display clear "Available" or "Unavailable / Out of Stock" status.
* **Preconditions**: User is authenticated; catalog contains titles.
* **Expected Outcome**: User views matching books with real-time stock indicators.
* **Priority**: Must Have

#### FEAT-07: View Book Details
* **Purpose**: Expose complete bibliographic metadata and copy numbers for a selected title.
* **User**: Student (and Librarian)
* **User Need**: Review comprehensive information about a book before deciding to borrow.
* **Expected Behavior**: Displays Title, Author, ISBN, Category, Publisher, Total Copies, and Available Copies. Displays "Request Book" button if available for the student.
* **Preconditions**: User selects a book from catalog results.
* **Expected Outcome**: Complete book details displayed clearly.
* **Priority**: Must Have

#### FEAT-08: Request / Issue Book (Student)
* **Purpose**: Allow a student to request or issue an available book title.
* **User**: Student
* **User Need**: Borrow required academic books efficiently.
* **Expected Behavior**: Student clicks Request/Issue on an available title. System checks that Available Copies $\ge 1$ and student has no active copy of this title. System creates issue record and decrements available copies by 1.
* **Preconditions**: Book has Available Copies $\ge 1$; student has no active loan of this title.
* **Expected Outcome**: Book is added to student's currently issued books; catalog available copies decrements by 1.
* **Priority**: Must Have

#### FEAT-09: View Currently Issued Books
* **Purpose**: Allow a student to monitor all books currently checked out under their account.
* **User**: Student
* **User Need**: Track active borrowings and stay aware of due dates.
* **Expected Behavior**: Displays table of active loans with Title, Author, ISBN, Issue Date, Due Date, and Return action.
* **Preconditions**: Student is authenticated.
* **Expected Outcome**: Student views active obligations and can initiate returns.
* **Priority**: Must Have

#### FEAT-10: Return Issued Books (Student)
* **Purpose**: Enable a student to return an issued book and restore catalog availability.
* **User**: Student
* **User Need**: Return finished books and clear their active borrowing record.
* **Expected Behavior**: Student selects Return on an issued book. System marks transaction returned with timestamp, increments available copy count by 1, and archives to history.
* **Preconditions**: Book is currently issued to the student.
* **Expected Outcome**: Active loan closed; book copy restored in catalog; record archived in student history.
* **Priority**: Must Have

#### FEAT-11: View Personal Activity History
* **Purpose**: Maintain a permanent personal ledger of all books borrowed and returned by the student.
* **User**: Student
* **User Need**: Review past reading history and verify that returned books were properly recorded.
* **Expected Behavior**: Displays chronological list of past transactions with Title, Author, ISBN, Issue Date, Due Date, Return Date, and Status.
* **Preconditions**: Student is authenticated.
* **Expected Outcome**: Student inspects their unalterable reading history.
* **Priority**: Must Have

---

### 12.3 Librarian Features

#### FEAT-12: Librarian Dashboard & Operational Monitoring
* **Purpose**: Provide the Librarian with an operational overview of library health and metrics.
* **User**: Librarian
* **User Need**: Assess library circulation volume, stock status, and student usage at a glance.
* **Expected Behavior**: Displays Total Book Titles, Total Inventory Copies, Active Loans Count, Registered Students Count, and a recent circulation activity feed.
* **Preconditions**: Librarian is authenticated.
* **Expected Outcome**: Librarian reviews institutional operational metrics.
* **Priority**: Must Have

#### FEAT-13: Add New Book to Catalog
* **Purpose**: Register a new book title in the library catalog.
* **User**: Librarian
* **User Need**: Expand the library collection with new titles and stock.
* **Expected Behavior**: Librarian inputs Title, Author, ISBN, Category, Publisher (optional), and Total Copies ($\ge 1$). System validates unique ISBN, sets initial Available Copies $=$ Total Copies, and saves record.
* **Preconditions**: Valid book data provided; ISBN is unique.
* **Expected Outcome**: New book appears in the catalog with available copies equal to total copies.
* **Priority**: Must Have

#### FEAT-14: Edit Existing Book Information
* **Purpose**: Update bibliographic metadata or adjust copy counts for a catalog title.
* **User**: Librarian
* **User Need**: Correct typos, update details, or adjust stock counts as physical books change.
* **Expected Behavior**: Librarian modifies fields. If Total Copies is modified, system validates that new Total Copies is not lower than currently issued copies. System updates record and recalculates available count.
* **Preconditions**: Book exists; new Total Copies $\ge$ currently issued copies.
* **Expected Outcome**: Book details and copy counts updated consistently.
* **Priority**: Must Have

#### FEAT-15: Delete Book from Catalog
* **Purpose**: Remove a decommissioned book record from the active catalog.
* **User**: Librarian
* **User Need**: Prune outdated or lost titles from the catalog.
* **Expected Behavior**: Librarian requests deletion. System checks if Available Copies $==$ Total Copies. If any copies are issued, deletion is blocked with a clear warning. If all copies are available, book is removed from active catalog.
* **Preconditions**: Available Copies $==$ Total Copies (zero active loans).
* **Expected Outcome**: Book removed from active catalog; historical records remain preserved.
* **Priority**: Must Have

#### FEAT-16: Manage Student Records
* **Purpose**: Allow the Librarian to review registered student profiles and their circulation status.
* **User**: Librarian
* **User Need**: Inspect student standing and view their loan records.
* **Expected Behavior**: Displays student directory searchable by Name or Student ID. Clicking a student displays their contact details, currently issued books, and borrowing history.
* **Preconditions**: Librarian is authenticated.
* **Expected Outcome**: Librarian inspects individual student loan records.
* **Priority**: Must Have

#### FEAT-17: Issue Books to Students (Librarian)
* **Purpose**: Allow the Librarian to directly issue an available book to a student.
* **User**: Librarian
* **User Need**: Issue books directly to students during library operations.
* **Expected Behavior**: Librarian selects student and available book. System validates availability ($\ge 1$) and confirms student has no active copy of this title. System creates issue record and decrements available count.
* **Preconditions**: Book has Available Copies $\ge 1$; student has no active copy of this title.
* **Expected Outcome**: Book issued; available count decrements by 1; transaction logged.
* **Priority**: Must Have

#### FEAT-18: Accept Returned Books (Librarian)
* **Purpose**: Allow the Librarian to accept returned books and restore catalog stock.
* **User**: Librarian
* **User Need**: Process returned books and return them to available circulation.
* **Expected Behavior**: Librarian identifies active loan record, confirms return. System sets status to `RETURNED`, logs return date, increments available copies by 1, and archives transaction.
* **Preconditions**: Active issue record exists.
* **Expected Outcome**: Active loan closed; Available Copies incremented by 1.
* **Priority**: Must Have

#### FEAT-19: View Library Records (Circulation Log)
* **Purpose**: Provide a comprehensive, filterable log of all library circulation transactions.
* **User**: Librarian
* **User Need**: Audit circulation events, verify historical checkouts, and monitor returns.
* **Expected Behavior**: Displays master log of all transactions showing Transaction ID, Student, Book, Issue Date, Due Date, Return Date, and Status (`ISSUED` / `RETURNED`). Supports filtering by status and search.
* **Preconditions**: Librarian is authenticated.
* **Expected Outcome**: Complete circulation audit trail accessible to the librarian.
* **Priority**: Must Have

---

## 13. User Journeys

### 13.1 Student User Journey
The student journey follows the exact operational path defined in the approved BRD and FRD:

```
[1. Registration]
  Student opens registration -> Enters Name, Student ID, Email, Password -> Account Created
       │
       ▼
[2. Login]
  Student enters Email & Password -> Authenticated -> Redirected to Student Dashboard
       │
       ▼
[3. Catalog Discovery]
  Student navigates to Search Books -> Enters keyword (Title/Author/Category/ISBN)
  -> Views results with real-time "Available" or "Unavailable" badges
       │
       ▼
[4. Inspect Details]
  Student clicks on book -> Views full bibliographic details and available copy count
       │
       ▼
[5. Request / Issue Book]
  Student clicks "Request Book" (Available >= 1) -> System checks no duplicate active copy
  -> Issue record created with Due Date -> Available copy count decrements by 1
       │
       ▼
[6. Monitor Active Loans]
  Student visits "Currently Issued Books" -> Reviews borrowed titles and due dates
       │
       ▼
[7. Return Book]
  Student initiates/completes return -> Status updated to RETURNED -> Return Date recorded
  -> Available copy count increments by 1 -> Book removed from active loans
       │
       ▼
[8. View History]
  Student visits "Library History" -> Reviews permanent record of past borrowed and returned books
```

### 13.2 Librarian User Journey
The librarian journey provides a complete administrative lifecycle:

```
[1. Login]
  Librarian enters credentials -> Authenticated -> Redirected to Librarian Dashboard
       │
       ▼
[2. Operational Overview]
  Librarian reviews metrics: Total Titles, Inventory Copies, Active Loans, Student Count, Activity Feed
       │
       ▼
[3. Manage Catalog]
  Librarian can:
    • Add New Book (Title, Author, ISBN, Category, Total Copies)
    • Edit Existing Book (Update metadata, adjust copies safely)
    • Delete Book (Safeguarded: Allowed only if Available Copies == Total Copies)
    • Search & View Books across all stock levels
       │
       ▼
[4. Manage Students]
  Librarian searches students by Name/ID -> Views individual active loans & past history
       │
       ▼
[5. Issue Book]
  Librarian selects student & available book -> Confirms issue -> Stock decrements by 1
       │
       ▼
[6. Accept Return]
  Librarian processes returned book -> Status set to RETURNED -> Stock increments by 1
       │
       ▼
[7. Audit Records]
  Librarian inspects master circulation log -> Filters by status, dates, or search terms
```

---

## 14. Product Workflows

### 14.1 Registration Workflow
1. Prospective student accesses registration page.
2. Inputs Full Name, Student ID, Email Address, and Password.
3. System validates non-empty inputs, valid email format, password length, and uniqueness of Email and Student ID.
4. System securely hashes password, stores student record, and confirms success.
5. Student is directed to Login.

### 14.2 Login Workflow
1. User enters Email and Password on appropriate login screen.
2. System validates credentials against stored records.
3. System determines role (`Student` vs. `Librarian`):
   * If `Student` $\rightarrow$ redirected to Student Dashboard.
   * If `Librarian` $\rightarrow$ redirected to Librarian Dashboard.
4. If invalid, displays clear error message without revealing sensitive credential details.

### 14.3 Book Search Workflow
1. Authenticated user accesses catalog search.
2. User types search terms into the search bar.
3. System matches query against Title, Author, Category, and ISBN.
4. Results display title, author, category, ISBN, and availability indicator:
   * If Available Copies $> 0$ $\rightarrow$ "Available" (with count).
   * If Available Copies $= 0$ $\rightarrow$ "Unavailable / Out of Stock".
5. User can click any title to view full details.

### 14.4 Book Request / Issue Workflow
1. Eligible user initiates issue (Student requests available title or Librarian issues title to student).
2. System checks prerequisites:
   * Book $\text{Available Copies} \ge 1$.
   * Student has an active registered account.
   * Student does not currently hold an unreturned copy of this exact title.
3. System creates circulation record with Issue Date, Due Date, and Status `ISSUED`.
4. System decrements book $\text{Available Copies}$ by 1.
5. System displays confirmation; book appears in student's issued list.

### 14.5 Book Return Workflow
1. Return is processed for an actively issued book (`Status = 'ISSUED'`).
2. System locates active transaction.
3. System updates transaction:
   * Status changes to `RETURNED`.
   * Return Date recorded as current timestamp.
4. System increments book $\text{Available Copies}$ by 1.
5. System updates student's active loans, moves record to history, and restores catalog availability.

### 14.6 Book Management Workflow
1. Librarian accesses book management.
2. **To Add**: Inputs title, author, ISBN, category, publisher, and total copies ($\ge 1$). System initializes Available Copies $=$ Total Copies and saves.
3. **To Edit**: Updates fields or adjusts total copies. System ensures new Total Copies $\ge$ currently issued copies.
4. **To Delete**: Requests deletion. System checks if $\text{Available Copies} == \text{Total Copies}$. If any copy is issued, deletion is blocked. If all copies are available, book is removed.

### 14.7 Student Management Workflow
1. Librarian accesses student management directory.
2. Librarian views list of all registered students with active loan counts.
3. Librarian searches by Name or Student ID.
4. Librarian opens student profile to view contact information, active issued books, and historical returned books.

---

## 15. Product Requirements

The product requirements are cataloged below under unique identifiers `PR-001` through `PR-020`:

| PR ID | Product Requirement Statement | User / Actor | Priority | Related FRD ID |
| :--- | :--- | :--- | :--- | :--- |
| **PR-001** | The product must allow prospective students to self-register an account using their Name, Student ID, Email, and Password. | Student | Must Have | `FR-001` |
| **PR-002** | The product must authenticate students via email and password, establishing a secure session and routing to the Student Portal. | Student | Must Have | `FR-002` |
| **PR-003** | The product must authenticate librarians securely via email and password, routing to the Librarian Console. | Librarian | Must Have | `FR-003` |
| **PR-004** | The product must provide a reliable logout action that invalidates the active session for both roles. | Student, Librarian | Must Have | `FR-004` |
| **PR-005** | The product must provide students with a personalized dashboard displaying profile details, active issued counts, and navigation. | Student | Must Have | `FR-005` |
| **PR-006** | The product must provide librarians with an overview dashboard displaying catalog counts, active loans, student counts, and recent activity. | Librarian | Must Have | `FR-006` |
| **PR-007** | The product must provide catalog search across Title, Author, Category, and ISBN with real-time copy availability indicators. | Student, Librarian | Must Have | `FR-007` |
| **PR-008** | The product must display a comprehensive book details view showing complete bibliographic metadata and available copy numbers. | Student, Librarian | Must Have | `FR-008` |
| **PR-009** | The product must allow students to request/issue an available book, creating an issue record and decrementing available copies by 1. | Student | Must Have | `FR-009` |
| **PR-010** | The product must allow librarians to directly issue an available book to a registered student. | Librarian | Must Have | `FR-009` |
| **PR-011** | The product must prevent issuing a book if Available Copies $= 0$ or if the student already holds an active copy of that title. | System | Must Have | `FR-009` |
| **PR-012** | The product must provide a dedicated view for students to review all books currently issued to them with due dates. | Student | Must Have | `FR-010` |
| **PR-013** | The product must process book returns, updating status to `RETURNED`, recording return timestamp, and incrementing available copies by 1. | Student, Librarian | Must Have | `FR-011` |
| **PR-014** | The product must maintain an immutable, permanent library activity history view for each student. | Student | Must Have | `FR-012` |
| **PR-015** | The product must allow librarians to add new books to the catalog with unique ISBNs and positive total copy counts. | Librarian | Must Have | `FR-013` |
| **PR-016** | The product must allow librarians to edit book details and adjust copy counts, ensuring total copies is never lower than circulating copies. | Librarian | Must Have | `FR-014` |
| **PR-017** | The product must block deletion of any book that has active circulating copies, permitting deletion only when Available $==$ Total. | Librarian | Must Have | `FR-015` |
| **PR-018** | The product must allow librarians to search registered students and inspect their profiles, active loans, and history. | Librarian | Must Have | `FR-016` |
| **PR-019** | The product must provide librarians with a master circulation log of all issued and returned transactions with filtering capabilities. | Librarian | Must Have | `FR-017` |
| **PR-020** | The product must enforce strict role authorization, ensuring students cannot access librarian features and cannot view other students' records. | System | Must Have | `FR-019`, `FR-020` |

---

## 16. User Experience Requirements

The user experience of the SLMS is central to its academic adoption and project evaluation:

```
+------------------------------------------------------------------------------------+
|                         UX DESIGN PRINCIPLES & GUIDELINES                          |
+------------------------------------------------------------------------------------+
|  THEME         | Modern Black & White: High contrast, deep blacks, crisp whites    |
|  TYPOGRAPHY    | Clean, highly legible sans-serif type hierarchy                   |
|  LAYOUT        | Uncluttered, structured data tables and card layouts              |
|  RESPONSIVENESS| Seamless experience across laptop, desktop, and tablet displays   |
|  NAVIGATION    | Intuitive top navigation bar with clear role-specific links       |
|  FEEDBACK      | Immediate confirmation alerts, inline validation, and clear badges|
+------------------------------------------------------------------------------------+
```

* **Modern Black & White Aesthetic**: High-contrast monochrome palette (pure blacks `#000000`/`#111111`, crisp white `#FFFFFF`, subtle gray borders `#E0E0E0`, and light gray backgrounds `#F9F9F9`). Provides academic elegance and avoids distracting color clutter.
* **Simplicity & Speed**: Clean layouts with minimal ornamentation; primary actions (Search, Request, Return, Add Book) prominent and accessible within 1–2 clicks.
* **Information Hierarchy**: Bold titles, distinct metadata labels, and high-contrast status badges ("Available" vs. "Out of Stock").
* **Responsive Layout**: Designed to adapt cleanly across screen widths from standard mobile devices to desktop monitors.
* **Predictable Feedback**: Every user action (login, registration, book issue, return, edit) must present clear, descriptive confirmation or error feedback.
* **Consistency**: Unified header navigation, card styling, and table formats shared across both Student and Librarian portals.

---

## 17. Dashboard Requirements

### 17.1 Student Dashboard Requirements
The Student Dashboard provides a focused summary of the student's current library obligations:
* **Student Identity Card**: Displays Student Full Name, Student ID Number, and Registered Email.
* **Active Loans Counter**: Summarizes the total number of books currently issued to the student.
* **Active Loans Quick-List**: A clean table showing:
  * Book Title and Author
  * Issue Date
  * Expected Due Date
  * Direct action link to return the book
* **Quick Navigation**: Direct buttons to "Search Books" and "View Full History".
* **Empty State**: If no books are currently borrowed, displays: *"You currently have no books issued. Browse the catalog to find books."*

### 17.2 Librarian Dashboard Requirements
The Librarian Dashboard serves as the central administrative overview:
* **Key Library Metric Cards**:
  * **Total Book Titles**: Count of unique book records in the catalog.
  * **Total Inventory Copies**: Total physical books owned by the library.
  * **Active Issued Books**: Total books currently checked out across all students.
  * **Registered Students**: Total number of registered student accounts.
* **Recent Activity Feed**: A list of the most recent circulation transactions (issues and returns) showing student name, book title, date, and status.
* **Quick Management Actions**: Prominent buttons to "Add New Book", "Search Books", "Manage Students", "Issue Book", and "Accept Returns".

---

## 18. Search Experience Requirements

* **Unified Search Input**: A prominent, accessible search bar on catalog views.
* **Multi-Field Matching**: Evaluates queries against Title, Author, Category, and ISBN simultaneously.
* **Availability Feedback**:
  * Titles with Available Copies $> 0$ display a high-contrast badge: **"Available"** with the remaining copy count.
  * Titles with Available Copies $= 0$ display a muted badge: **"Unavailable / Out of Stock"**.
* **Zero Results State**: When a query produces no matches, the system displays: *"No books found matching your search criteria."* alongside an option to clear search filters.
* **Search Performance**: Results must render rapidly without page refreshes, providing instant feedback as users search.

---

## 19. Book Management Product Requirements

The Librarian manages the catalog through complete, safeguarded lifecycle actions:
1. **Add Book**: Form capturing Title, Author, ISBN, Category, Publisher (optional), and Total Copies ($\ge 1$). Initial Available Copies is automatically set to Total Copies.
2. **Edit Book**: Form allowing updates to bibliographic text and copy counts. System blocks any reduction of Total Copies below the count of currently circulating copies.
3. **Delete Book**: Action to remove a book record. System checks that $\text{Available Copies} == \text{Total Copies}$ and active loans $= 0$. If any copy is issued, deletion is blocked with a clear warning explaining that all copies must be returned first.
4. **View & Search**: Librarians have access to inspect all books in the catalog, including titles that are currently out of stock.
5. **Availability Invariant**: The system guarantees that Available Copies is always between 0 and Total Copies ($0 \le \text{Available} \le \text{Total}$).

---

## 20. Student Management Product Requirements

The Librarian oversees student library standing with focused capabilities:
1. **Student Directory View**: Master table showing all registered students, their Student ID, Full Name, Email Address, and current active issued books count.
2. **Search Students**: Real-time search filter by Student Name or Student ID.
3. **Student Profile Inspection**: Clicking a student displays:
   * Full contact and identity details.
   * Table of currently issued books with due dates.
   * Complete historical log of previously returned books.
4. **Circulation Context**: Enables the librarian to check student borrowing standing when processing issues or returns.

---

## 21. Issue and Return Product Requirements

The circulation lifecycle operates under strict business rules:

```
+-----------------------------------------------------------------------------------+
|                        CIRCULATION LIFECYCLE INVARIANTS                           |
+-----------------------------------------------------------------------------------+
|  ISSUE EVENT   | • Available Copies >= 1 verified                                 |
|                | • Student has no active unreturned copy of this title            |
|                | • Issue record created (Issue Date, Due Date, Status: ISSUED)    |
|                | • Available Copies decrements by 1                               |
+----------------+------------------------------------------------------------------+
|  RETURN EVENT  | • Active issue record identified                                 |
|                | • Status updated to RETURNED; Return Date recorded               |
|                | • Available Copies increments by 1                               |
|                | • Active loan archived to student's permanent history            |
+-----------------------------------------------------------------------------------+
```

### 21.1 Issue Rules
* A book can only be issued if its available copy count is at least 1.
* A student cannot be issued a book if they already hold an active copy of the exact same title (BRD Rule 08).
* Every issue transaction permanently records the Transaction ID, Student ID, Book ID, Issue Timestamp, Expected Due Date, and Status `ISSUED`.
* Stock availability decrements by 1 immediately upon issue.

### 21.2 Return Rules
* Returning a book requires an existing active issue record.
* The transaction status updates from `ISSUED` to `RETURNED`, and the Return Timestamp is recorded.
* Stock availability increments by 1 immediately upon return.
* Returned books are archived to the student's personal activity history.

### 21.3 Unresolved Policies (Decision Required)
* **Loan Duration Policy**: The exact method for calculating or setting the due date (e.g., standard duration set by policy vs. librarian-specified at issue) is an institutional policy decision: **[Decision Required]**.
* **Overall Borrowing Limit**: Whether an overall limit on total concurrent books exists beyond the single-copy-per-title rule is an institutional decision: **[Decision Required]**.
* **Request & Return Workflows**: The exact operational interaction between student request/return and librarian issue/acceptance is documented under **[Decision Required]**.

---

## 22. Permissions & Access Matrix

The system strictly enforces role-based access control across all product features:

| Feature / Action | Student Role | Librarian Role |
| :--- | :--- | :--- |
| **Account Self-Registration** | Permitted | Prohibited |
| **Login / Authenticate** | Permitted | Permitted |
| **Logout / Session Termination** | Permitted | Permitted |
| **View Student Dashboard** | Permitted | Prohibited (Redirected to Librarian Console) |
| **Search Catalog & View Book Details** | Permitted | Permitted |
| **Request / Issue Book** | Permitted | Permitted (Direct counter issuance) |
| **View Own Issued Books** | Permitted (Own only) | Prohibited |
| **Return Own Issued Books** | Permitted (Own only) | Prohibited |
| **View Own Activity History** | Permitted (Own only) | Prohibited |
| **View Librarian Dashboard** | Prohibited (Access Denied) | Permitted |
| **Add New Book to Catalog** | Prohibited (Access Denied) | Permitted |
| **Edit Existing Book Information** | Prohibited (Access Denied) | Permitted |
| **Delete Book from Catalog** | Prohibited (Access Denied) | Permitted (Safe Deletion) |
| **Search & View Student Directory**| Prohibited (Access Denied) | Permitted |
| **Accept Returned Books** | Prohibited (Access Denied) | Permitted |
| **View Master Circulation Records** | Prohibited (Access Denied) | Permitted |

---

## 23. Product Success Metrics

Product success will be evaluated through verifiable project-level milestones and operational benchmarks:

| Success Metric Category | Evaluation Benchmark / Target |
| :--- | :--- |
| **Registration & Authentication** | 100% successful account registration for eligible students; zero unauthorized cross-role logins. |
| **Catalog Transparency** | 100% of book titles searchable with real-time copy availability counts and zero phantom stock errors. |
| **Circulation Reliability** | 100% of issue and return transactions correctly update inventory copy counts with zero counter desynchronization. |
| **Safe Deletion Compliance** | Zero deletions permitted for books with active circulating copies; 100% adherence to Rule 07. |
| **Audit Completeness** | 100% of circulation events permanently logged with timestamps, student identifiers, and book codes. |
| **User Interface Usability** | Positive usability feedback on the Black & White UI, with students and librarians completing tasks without formal training. |

---

## 24. Acceptance Criteria

The major product features must satisfy the following testable acceptance criteria:

### AC-01: Student Registration
* **Given** a prospective student is on the registration screen,
* **When** they enter a valid Full Name, unique Student ID, valid unique Email, and password, and submit,
* **Then** the system creates their student account, displays a success confirmation, and redirects them to the login screen.

### AC-02: User Authentication
* **Given** a registered user (Student or Librarian) is on their login view,
* **When** they enter their correct registered email and password,
* **Then** the system authenticates the user and redirects them directly to their role-specific dashboard.

### AC-03: Invalid Login Prevention
* **Given** a user is on the login view,
* **When** they submit incorrect credentials or an unregistered email,
* **Then** the system denies access, keeps them on the login view, and displays an informative error message.

### AC-04: Book Catalog Search
* **Given** an authenticated user is on the catalog view,
* **When** they enter a keyword matching a book's Title, Author, Category, or ISBN,
* **Then** the system displays all matching titles with their current availability status.

### AC-05: Book Availability Status Display
* **Given** an authenticated user views catalog search results or book details,
* **When** a book has Available Copies $> 0$,
* **Then** the system displays the status as "Available" with the remaining copy count; if Available Copies $= 0$, it displays "Unavailable / Out of Stock".

### AC-06: Book Issue Execution
* **Given** a book has Available Copies $\ge 1$ and a student does not hold an active copy of that title,
* **When** an issue is processed for that book and student,
* **Then** the system creates an active issue record with due date, decrements Available Copies by 1, and lists the title under the student's issued books.

### AC-07: Duplicate Active Loan Prevention
* **Given** a student currently holds an active issued copy of a book title,
* **When** an attempt is made to issue another copy of the same title to that student,
* **Then** the system blocks the transaction and displays a message stating the student already has an active loan of this title.

### AC-08: Zero Stock Issue Prevention
* **Given** a book has Available Copies $= 0$,
* **When** an issue is attempted for that title,
* **Then** the system blocks the issue and displays a notification that no copies are available.

### AC-09: Book Return Processing
* **Given** a book is currently listed as issued to a student,
* **When** the return is processed in the system,
* **Then** the transaction status updates to `RETURNED`, return timestamp is saved, the book's Available Copies increments by 1, and the record moves to history.

### AC-10: Safe Book Deletion
* **Given** a book has one or more copies currently issued ($\text{Available Copies} < \text{Total Copies}$),
* **When** the Librarian attempts to delete the book,
* **Then** the system hard-blocks deletion and displays an error explaining that all copies must be returned before deleting.

### AC-11: Successful Book Deletion
* **Given** a book has all copies present in the library ($\text{Available Copies} == \text{Total Copies}$),
* **When** the Librarian confirms deletion,
* **Then** the system removes the book from the active catalog while preserving referential integrity in past circulation history.

### AC-12: Role Access Authorization
* **Given** a student is logged into their account,
* **When** they attempt to access any Librarian Console view (e.g., Add Book or Manage Students),
* **Then** the system denies access and redirects them to their Student Dashboard.

---

## 25. Non-Functional Product Expectations

* **Security**:
  * Passwords must be protected using one-way cryptographic hashing before storage.
  * Role-based access control must be enforced across all views and API endpoints.
  * Student data privacy must be guaranteed; students cannot access other students' records.
* **Usability**:
  * Clean, modern Black & White visual aesthetic with high contrast and intuitive navigation.
  * Zero training required for core student tasks (register, search, borrow, return).
* **Performance**:
  * Catalog search responses should return within 1.0 second under normal conditions.
  * Issue and return transactions should complete within 1.5 seconds.
* **Reliability & Availability**:
  * Target operational availability during academic operating hours.
  * Robust input validation to prevent crashes from invalid data entries.
* **Maintainability**:
  * Modular design with clean separation between student operations, catalog management, and circulation records.
* **Scalability**:
  * System architecture capable of handling academic volumes (thousands of students, tens of thousands of books).
* **Responsiveness**:
  * User interface must adapt smoothly across laptop, desktop, and tablet screen dimensions.
* **Data Integrity**:
  * ACID transaction compliance for all issue and return operations to prevent miscounted stock.
  * Relational integrity preventing orphaned records.

---

## 26. Product Constraints

1. **Role Scope Constraint**: The product is strictly restricted to two user roles: **Student** and **Librarian**. No Administrator or third role is supported.
2. **Technology Direction**: Future implementation is planned using **React** for the frontend, **Node.js + Express.js** for the backend, and **MySQL** for the relational database.
3. **Authentication Mechanism**: Authentication is strictly based on **Email and Password**.
4. **Visual Theme**: The UI is constrained to a modern, high-contrast **Black & White** theme.
5. **No Financial Processing**: No fine calculation or payment gateway integration is included in this scope.

---

## 27. Assumptions

The PRD is based strictly on the approved baseline assumptions from the BRD and FRD:
1. **Single Facility**: The application manages a single physical library for an academic institution.
2. **Two Roles Only**: Only Student and Librarian roles exist in the product.
3. **Physical Stock Consistency**: Digital issue and return operations correspond directly to the physical movement of books.
4. **Data Persistence**: Issue and return transaction logs are preserved permanently to maintain an unbroken audit trail.

---

## 28. Open Product Decisions

The following operational policies are not defined in the approved BRD or FRD and require institutional decision before technical implementation:

| Decision ID | Item Requiring Decision | Description & Alternatives | Status |
| :--- | :--- | :--- | :--- |
| **DEC-01** | **Default Loan Period Duration** | The BRD/FRD requires an expected due date for every issue, but does not define a fixed duration.<br>• *Decision Required*: How should loan duration be determined (e.g., standard duration set by policy vs. librarian-specified at issue)? | Open Decision |
| **DEC-02** | **Overall Concurrent Borrowing Limit** | The BRD/FRD enforces Rule 08 (no multiple copies of the same title), but defines no overall numerical limit on total borrowed books.<br>• *Decision Required*: Is there an institutional limit on total concurrent books per student, or does policy rely solely on Rule 08? | Open Decision |
| **DEC-03** | **Student Request Workflow Interaction** | The BRD states students can request/issue books and librarians issue books.<br>• *Decision Required*: Does a student request directly issue the book, or does it queue for librarian confirmation? | Open Decision |
| **DEC-04** | **Student Return Workflow Interaction** | The BRD states students can return books and librarians accept returned books.<br>• *Decision Required*: Does a student initiate a return that the librarian confirms, or can either party process the return directly? | Open Decision |
| **DEC-05** | **Initial Librarian Account Setup** | Because only Student and Librarian roles exist and students self-register, how is the first Librarian account provisioned? | Open Decision |

---

## 29. Future Enhancements

The following features are explicitly excluded from the current product scope and reserved for future project iterations:

* **[FUTURE] Automated Fine Calculator & Online Payments**: Integrated fine calculation based on overdue days with payment gateway integration.
* **[FUTURE] Hardware Scanning Integration**: Barcode, QR, or RFID scanning for automated counter check-in/out.
* **[FUTURE] Automated Email / SMS Notifications**: Reminder notifications sent prior to due dates and overdue notices.
* **[FUTURE] Reservation & Waitlist System**: Enabling students to reserve currently out-of-stock titles.
* **[FUTURE] Digital Library & E-Book Reader**: In-browser viewing of institutional PDFs and digital research materials.

---

## 30. Requirements Traceability Matrix

The following matrix confirms 100% end-to-end traceability across the approved BRD, FRD, and this PRD:

| BRD Requirement ID | FRD Requirement ID | PRD Requirement ID | Feature Name |
| :--- | :--- | :--- | :--- |
| **BR-001** / **BR-STU-001** | `FR-001` | **PR-001** | Student Account Registration |
| **BR-001** / **BR-STU-002** | `FR-002` | **PR-002** | Student Login & Session Access |
| **BR-001** / **BR-LIB-001** | `FR-003` | **PR-003** | Librarian Login & Session Access |
| **BR-001** / **BR-AUT-004** | `FR-004` | **PR-004** | User Logout & Session Termination |
| **BR-007** / **BR-STU-006** | `FR-005` | **PR-005** | Student Dashboard |
| **BR-008** / **BR-LIB-010** | `FR-006` | **PR-006** | Librarian Dashboard & Activity Monitoring |
| **BR-004** / **BR-STU-003** | `FR-007` | **PR-007** | Catalog Search & Availability Status |
| **BR-004** / **BR-STU-004** | `FR-008` | **PR-008** | View Book Details |
| **BR-005** / **BR-STU-005** | `FR-009` | **PR-009** | Student Book Request / Issue |
| **BR-005** / **BR-LIB-007** | `FR-009` | **PR-010** | Librarian Direct Book Issue |
| **BR-BKM-003** / **RULE-008** | `FR-009` | **PR-011** | Availability & Duplicate Title Check |
| **BR-007** / **BR-STU-006** | `FR-010` | **PR-012** | View Currently Issued Books |
| **BR-006** / **BR-LIB-008** | `FR-011` | **PR-013** | Book Return & Stock Restoration |
| **BR-007** / **BR-STU-008** | `FR-012` | **PR-014** | View Personal Activity History |
| **BR-003** / **BR-LIB-002** | `FR-013` | **PR-015** | Add New Book to Catalog |
| **BR-003** / **BR-LIB-003** | `FR-014` | **PR-016** | Edit Existing Book Information |
| **BR-003** / **BR-LIB-004** | `FR-015` | **PR-017** | Safe Book Deletion (Active Loan Guard) |
| **BR-009** / **BR-LIB-006** | `FR-016` | **PR-018** | Manage Student Records |
| **BR-008** / **BR-LIB-009** | `FR-017` | **PR-019** | Master Circulation Records Log |
| **BR-002** / **BR-AUT-003** | `FR-019`, `FR-020` | **PR-020** | Role-Based Access Control & Privacy |

---

## 31. Final Product Summary

* **Product Purpose**: To deliver an academic Student Library Management System that eliminates paper ledgers, provides real-time catalog discovery, automates book issue and return workflows, and ensures complete operational transparency.
* **Target Users**: Strictly two user groups — **Students** and **Librarians**. No Admin role exists.
* **Core Capabilities**:
  * **Students**: Self-registration, login, real-time book search with availability, book details inspection, book request/issue, active issued books review, book returns, and personal library history tracking.
  * **Librarians**: Secure login, executive dashboard monitoring, book catalog management (Add, Edit, Safe Deletion), student directory inspection, book issuance, return acceptance, and master circulation logging.
* **Product Value**: Replaces labor-intensive, error-prone manual library books with a modern, high-contrast Black & White digital platform that guarantees stock consistency and audit integrity.
* **Current Scope**: Strictly aligned with the approved BRD and FRD. Undefined institutional rules are cataloged as Open Decisions (`DEC-01` through `DEC-05`) and future capabilities are clearly delineated under Future Enhancements.

---
*End of Product Requirements Document (PRD)*
