# FUNCTIONAL REQUIREMENTS DOCUMENT (FRD)
## Student Library Management System (SLMS)

---

## 1. Document Control

### 1.1 Document Information
| Field | Details |
| :--- | :--- |
| **Document Name** | Functional Requirements Document (FRD) |
| **Project Name** | Student Library Management System (SLMS) |
| **Document Version** | 1.2 (Strict BRD Alignment Baseline) |
| **Date** | October 4, 2026 |
| **Document Status** | Approved Functional Specification |
| **Source Document** | `BUSINESS_REQUIREMENTS_DOCUMENT.md` (v1.0 Baseline) |
| **Author / Lead** | Senior Business Analyst & Software Requirements Engineer |
| **Target Audience** | Software Architects, UI/UX Designers, Development Team, Academic Project Evaluators |

### 1.2 Revision History
| Version | Date | Author | Description of Change | Status |
| :--- | :--- | :--- | :--- | :--- |
| 1.0 | 2026-10-04 | Senior Requirements Engineer | Initial translation of approved Business Requirements into Functional Requirements. | Superceded |
| 1.1 | 2026-10-04 | Senior Requirements Engineer | Revisions for scope and role alignment. | Superceded |
| 1.2 | 2026-10-04 | Senior Requirements Engineer | Complete elimination of unsupported assumptions (loan duration values, numerical loan limits, counter verification protocols, pre-seeded admin setups). Strict enforcement of two roles (Student and Librarian). Undefined parameters captured under Open Questions / Decisions Required. | Approved Baseline |

### 1.3 Baseline Reference & Compliance
This document derives strictly from the approved **Business Requirements Document (BRD v1.0)**. All functional definitions, validation rules, operational flows, and authorization boundaries defined herein adhere directly to the business rules and constraints established in the BRD. No unauthorized business rules, numerical thresholds, procedural assumptions, or extra user roles are introduced.

---

## 2. Introduction

### 2.1 Purpose of the FRD
The purpose of this Functional Requirements Document (FRD) is to translate the approved business objectives, user capabilities, and operational requirements from the accepted Business Requirements Document (BRD) into clear, rigorous, testable functional specifications.

This document defines **what** the system must do from an operational and behavioral standpoint, specifying:
* Exact user interaction flows for the two authorized roles: **Student** and **Librarian**.
* System inputs, state transitions, validation boundaries, and expected outputs.
* Explicit error handling and user feedback responses.
* Role-based access control and security boundaries.
* Data integrity invariants for the book catalog and circulation records.
* Explicit identification of parameters requiring institutional configuration as Open Questions / Decisions Required.

The FRD serves as the binding functional contract for subsequent system design, user interface development, backend service implementation, and verification testing.

---

## 3. System Overview

The **Student Library Management System (SLMS)** is a centralized digital library management platform designed to replace manual paper-based library processes with a secure, automated system of record.

The system is organized strictly around two primary user roles:
1. **Student**: Interacts through a self-service Student Portal to register an account, log in, search for available books, inspect book details, request/issue books, view books currently issued to them, return issued books, and track their personal library activity history.
2. **Librarian**: Interacts through a secure Librarian Console to log in securely, add new books, edit existing book information, delete books (under strict safeguards), search and view books, manage student records, issue books to students, accept returned books, view issued and returned book records, and monitor overall library activity.

The user interface adheres to a clean, modern, high-contrast **Black & White** visual theme, providing an uncluttered, accessible, and distraction-free academic environment.

---

## 4. User Roles & Permissions

The system operates strictly with two application user roles:
1. **Student**
2. **Librarian**

There is no Administrator role, guest role, or third-party role in the application.

```
+-----------------------------------------------------------------------------------+
|                           ROLE PERMISSION MATRIX                                  |
+-----------------------------------------------------------------------------------+
|  CAPABILITY / ACTION                    | STUDENT ROLE        | LIBRARIAN ROLE    |
+-----------------------------------------+---------------------+-------------------+
|  Account Self-Registration              | PERMITTED           | NOT APPLICABLE    |
|  Login / Authenticate                   | PERMITTED           | PERMITTED         |
|  Logout / Session Termination           | PERMITTED           | PERMITTED         |
|  Search Book Catalog                    | PERMITTED           | PERMITTED         |
|  View Book Details                      | PERMITTED           | PERMITTED         |
|  Request / Issue Book                   | PERMITTED           | NOT APPLICABLE    |
|  View Currently Issued Books            | PERMITTED (Own only)| NOT APPLICABLE    |
|  Return Issued Books                    | PERMITTED (Own only)| NOT APPLICABLE    |
|  View Personal Library Activity/History | PERMITTED (Own only)| NOT APPLICABLE    |
|  Add New Books                          | PROHIBITED          | PERMITTED         |
|  Edit Existing Book Information         | PROHIBITED          | PERMITTED         |
|  Delete Books                           | PROHIBITED          | PERMITTED (Safe)  |
|  Manage Student Records                 | PROHIBITED          | PERMITTED         |
|  Issue Books to Students                | PROHIBITED          | PERMITTED         |
|  Accept Returned Books                  | PROHIBITED          | PERMITTED         |
|  View Issued/Returned Book Records      | PROHIBITED          | PERMITTED         |
|  Monitor Overall Library Activity       | PROHIBITED          | PERMITTED         |
+-----------------------------------------------------------------------------------+
```

### 4.1 Student Role
* **Description**: An enrolled student using the library system.
* **Can Do**:
  * Register an account using email and password.
  * Login using email and password.
  * Search for available books by title, author, category, or ISBN.
  * View detailed book information and real-time copy availability.
  * Request/issue an available book.
  * View all books currently issued to their account.
  * Return issued books.
  * View their complete personal library activity/history.
  * Log out securely.
* **Cannot Do**:
  * Cannot add, edit, or delete books in the catalog.
  * Cannot view, search, or edit other students' accounts, issued books, or history.
  * Cannot accept returned books or modify catalog stock directly.
  * Cannot view global library circulation records or institutional activity metrics.

### 4.2 Librarian Role
* **Description**: An authorized library staff member responsible for collection management and circulation operations.
* **Can Do**:
  * Login securely using email and password.
  * Log out securely.
  * Add new books to the catalog with metadata and copy counts.
  * Edit existing book information and copy counts.
  * Delete books from the catalog (strictly when no copies are currently issued).
  * Search and view all books in the catalog.
  * Manage student records (view student profiles and their library activity).
  * Issue books to students.
  * Accept returned books and update catalog availability.
  * View all issued and returned book records (global circulation log).
  * Monitor overall library activity through the librarian dashboard.
* **Cannot Do**:
  * Cannot delete a book if any copy is currently issued ($\text{Available Copies} < \text{Total Copies}$).
  * Cannot issue a book if it has zero available copies ($\text{Available Copies} = 0$).
  * Cannot alter or purge historical issue/return transaction records.

---

## 5. Functional Requirements Specifications

The functional requirements are uniquely identified using the format `FR-001` through `FR-020`.

---

### FR-001: Student Account Registration
* **Requirement ID**: `FR-001`
* **Requirement Name**: Student Account Registration
* **Description**: The system must allow a student to register an individual account using their email, password, and student identification details.
* **Actor**: Student (Unauthenticated)
* **Preconditions**: User is on the registration view and not currently logged in.
* **Main Flow**:
  1. The student navigates to the Registration view.
  2. The student enters: Full Name, Student Identification Number, Email Address, and Password.
  3. The student submits the registration form.
  4. The system validates:
     * Full Name is provided (non-empty).
     * Student ID is provided and unique.
     * Email Address is valid in format and not previously registered.
     * Password meets minimum length requirements.
  5. The system hashes the password securely.
  6. The system creates the student record.
  7. The system displays a registration success confirmation and directs the user to the Login view.
* **Alternative / Exception Flow**:
  * **E1 (Duplicate Email or Student ID)**: If the email address or student ID is already registered, the system halts registration and displays: *"An account with this email address or Student ID already exists."*
  * **E2 (Validation Failure)**: If required fields are missing or invalid, the system highlights the invalid inputs with descriptive error messages.
* **Postconditions**: A new student account exists in the system; the student can now authenticate.
* **Priority**: Must Have

---

### FR-002: Student Login
* **Requirement ID**: `FR-002`
* **Requirement Name**: Student Login
* **Description**: The system must authenticate a student using their registered email and password, establishing an authenticated session.
* **Actor**: Student
* **Preconditions**: Student account is registered in the system.
* **Main Flow**:
  1. The student enters their registered Email Address and Password on the login view.
  2. The student clicks "Login".
  3. The system verifies that the email exists, matches a user with the `Student` role, and matches the stored password hash.
  4. Upon successful authentication, the system creates an active session for the student.
  5. The system redirects the student to the Student Portal.
* **Alternative / Exception Flow**:
  * **E1 (Invalid Credentials)**: If email is not found or password does not match, the system rejects login and displays: *"Invalid email or password. Please try again."*
  * **E2 (Missing Fields)**: If email or password is blank, the system prompts: *"Please enter both email and password."*
* **Postconditions**: Student is authenticated and has access to student-specific features.
* **Priority**: Must Have

---

### FR-003: Librarian Login
* **Requirement ID**: `FR-003`
* **Requirement Name**: Librarian Login
* **Description**: The system must authenticate a Librarian securely using their registered email and password.
* **Actor**: Librarian
* **Preconditions**: Librarian account exists in the system.
* **Main Flow**:
  1. The librarian enters their registered Email Address and Password on the librarian login view.
  2. The librarian clicks "Login".
  3. The system verifies that the email exists, matches a user with the `Librarian` role, and matches the stored password hash.
  4. Upon successful authentication, the system creates an active session for the librarian.
  5. The system redirects the librarian to the Librarian Console.
* **Alternative / Exception Flow**:
  * **E1 (Invalid Credentials)**: If credentials fail verification, the system rejects login and displays: *"Invalid librarian credentials. Please try again."*
  * **E2 (Missing Fields)**: If email or password is blank, the system prompts: *"Please enter both email and password."*
* **Postconditions**: Librarian is authenticated and has access to librarian management features.
* **Priority**: Must Have

---

### FR-004: User Logout
* **Requirement ID**: `FR-004`
* **Requirement Name**: User Logout
* **Description**: The system must allow an authenticated user (Student or Librarian) to terminate their active session securely.
* **Actor**: Student, Librarian
* **Preconditions**: User holds an active authenticated session.
* **Main Flow**:
  1. The user clicks "Logout".
  2. The system terminates and invalidates the active session.
  3. The system redirects the user to the Login view with a logout confirmation message.
* **Alternative / Exception Flow**:
  * None.
* **Postconditions**: User session is ended; protected features can no longer be accessed without logging in again.
* **Priority**: Must Have

---

### FR-005: Student Dashboard
* **Requirement ID**: `FR-005`
* **Requirement Name**: Student Dashboard
* **Description**: The system must provide a dedicated dashboard for the logged-in student, summarizing their active library status and navigation.
* **Actor**: Student
* **Preconditions**: Student is authenticated.
* **Main Flow**:
  1. The student accesses the Student Dashboard.
  2. The system retrieves and displays:
     * Student profile summary (Name, Student ID, Email).
     * Count of books currently issued to the student.
     * Summary list of currently issued books with due dates.
     * Navigation links to Search Books, View Issued Books, and View History.
* **Alternative / Exception Flow**:
  * **E1 (No Issued Books)**: If the student currently has no books issued, the system displays an informative message: *"You currently have no books issued."*
* **Postconditions**: Student views their personalized library status.
* **Priority**: Must Have

---

### FR-006: Librarian Dashboard & Activity Monitoring
* **Requirement ID**: `FR-006`
* **Requirement Name**: Librarian Dashboard & Activity Monitoring
* **Description**: The system must provide an overview dashboard for the Librarian to monitor overall library activity and key statistics.
* **Actor**: Librarian
* **Preconditions**: Librarian is authenticated.
* **Main Flow**:
  1. The librarian accesses the Librarian Dashboard.
  2. The system retrieves and displays:
     * Total number of book titles in the catalog.
     * Total physical book copies in the inventory.
     * Total number of books currently issued.
     * Total number of registered students.
     * Recent library activity summary (recently issued and returned books).
     * Quick navigation to Add Book, Search Books, Manage Students, Issue Books, and Accept Returns.
* **Alternative / Exception Flow**:
  * None.
* **Postconditions**: Librarian views real-time overall library activity metrics.
* **Priority**: Must Have

---

### FR-007: Book Catalog Search
* **Requirement ID**: `FR-007`
* **Requirement Name**: Book Catalog Search
* **Description**: The system must allow users to search for books by title, author, category, or ISBN, displaying real-time copy availability.
* **Actor**: Student, Librarian
* **Preconditions**: User is authenticated.
* **Main Flow**:
  1. The user enters a search term into the search input.
  2. The system searches across book Title, Author, Category, and ISBN.
  3. The system displays matching results showing:
     * Title
     * Author
     * Category
     * ISBN / Book Code
     * Availability Status:
       * **Available** (when Available Copies $> 0$, showing count)
       * **Unavailable / Out of Stock** (when Available Copies $= 0$)
     * Action to View Details.
* **Alternative / Exception Flow**:
  * **E1 (No Books Found)**: If no books match the query, the system displays: *"No books found matching your search criteria."*
  * **E2 (Empty Search)**: If the search field is blank, the system displays the complete catalog list.
* **Postconditions**: User views filtered or complete book listings with accurate availability.
* **Priority**: Must Have

---

### FR-008: View Book Details
* **Requirement ID**: `FR-008`
* **Requirement Name**: View Book Details
* **Description**: The system must display comprehensive bibliographic details and availability counts for a selected book.
* **Actor**: Student, Librarian
* **Preconditions**: User selects a book from catalog search or listings.
* **Main Flow**:
  1. The user clicks on a book to view details.
  2. The system displays:
     * Book Title
     * Author
     * ISBN / Book Identifier
     * Category / Subject
     * Publisher (if recorded)
     * Total Copies
     * Available Copies
     * Availability Status (Available / Unavailable)
  3. If user is a Student and the book is available, the system provides an option to request/issue the book.
  4. If user is a Librarian, the system provides options to edit, delete, or issue the book.
* **Alternative / Exception Flow**:
  * **E1 (Book Not Found)**: If the selected book ID does not exist, the system displays: *"Book details could not be found."*
* **Postconditions**: User views full book information.
* **Priority**: Must Have

---

### FR-009: Book Request / Issue Flow
* **Requirement ID**: `FR-009`
* **Requirement Name**: Book Request / Issue Flow
* **Description**: The system must process book issues, whether requested by a student or issued by a librarian, ensuring that only available books are issued and stock is accurately decremented.
* **Actor**: Student, Librarian
* **Preconditions**:
  1. Student is registered and has an active account.
  2. Book exists and has $\text{Available Copies} \ge 1$.
  3. Student does not already hold an active issued copy of the exact same book title (BRD Rule 08).
* **Main Flow (Student Request / Issue)**:
  1. The student selects an available book and initiates a request/issue action.
  2. The system verifies:
     * Book $\text{Available Copies} \ge 1$.
     * Student does not currently hold an unreturned copy of this exact title.
  3. The system creates an issue record containing: Student ID, Book ID, Issue Date, Due Date, and Status `ISSUED`.
  4. The system decrements the book's $\text{Available Copies}$ by 1 ($\text{Available} \leftarrow \text{Available} - 1$).
  5. The system confirms the issue and updates the student's currently issued books list.
* **Main Flow (Librarian Direct Issue)**:
  1. The librarian selects a student and an available book.
  2. The system verifies availability ($\text{Available} \ge 1$) and confirms the student has no active copy of this title.
  3. The librarian confirms the issue.
  4. The system creates the issue record with Issue Date, Due Date, and Status `ISSUED`.
  5. The system decrements $\text{Available Copies}$ by 1.
  6. The system displays a confirmation message to the librarian.
* **Alternative / Exception Flow**:
  * **E1 (Book Unavailable)**: If $\text{Available Copies} = 0$, the system blocks issuance and displays: *"Cannot issue book: No copies currently available."*
  * **E2 (Duplicate Active Issue)**: If the student already holds an active copy of the title, the system blocks issuance and displays: *"Student already has an active loan of this book title."*
* **Postconditions**: An active issue record is created; book available copies is decremented by 1; transaction appears in student's issued list and librarian's circulation records.
* **Priority**: Must Have

---

### FR-010: View Currently Issued Books (Student)
* **Requirement ID**: `FR-010`
* **Requirement Name**: View Currently Issued Books (Student)
* **Description**: The system must allow a student to view all books currently issued to them, including issue dates, due dates, and return options.
* **Actor**: Student
* **Preconditions**: Student is authenticated.
* **Main Flow**:
  1. The student navigates to "Currently Issued Books".
  2. The system retrieves all records for the student where status is `ISSUED`.
  3. The system displays: Book Title, Author, ISBN, Issue Date, Due Date, and a "Return Book" action.
* **Alternative / Exception Flow**:
  * **E1 (No Active Loans)**: If no books are currently issued, displays: *"You have no books currently issued."*
* **Postconditions**: Student views their active borrowing obligations.
* **Priority**: Must Have

---

### FR-011: Book Return & Availability Restoration
* **Requirement ID**: `FR-011`
* **Requirement Name**: Book Return & Availability Restoration
* **Description**: The system must process book returns, updating the transaction record to returned and immediately restoring available book copies in the catalog.
* **Actor**: Student, Librarian
* **Preconditions**: An active issue record exists for the student and book with status `ISSUED`.
* **Main Flow (Student Return Action / Librarian Acceptance)**:
  1. The return is processed (initiated by the student or accepted by the librarian).
  2. The system locates the active issue record.
  3. The system updates the record:
     * Status is set to `RETURNED`.
     * Return Date is recorded as the current timestamp.
  4. The system increments the book's $\text{Available Copies}$ by 1 ($\text{Available} \leftarrow \text{Available} + 1$).
  5. The system confirms the return:
     * The book is removed from the student's currently issued books list.
     * The record is archived to the student's personal activity history.
     * The updated copy availability reflects immediately in the catalog.
* **Alternative / Exception Flow**:
  * **E1 (No Active Record)**: If no active issued record matches, the system displays: *"No active issued record found for this book."*
  * **E2 (Stock Overflow Invariant Check)**: If $\text{Available Copies} + 1 > \text{Total Copies}$, the system blocks the increment and alerts the librarian to inspect inventory records.
* **Postconditions**: Transaction status is `RETURNED`; Available Copies is incremented by 1; catalog availability is restored.
* **Priority**: Must Have

---

### FR-012: View Personal Library Activity / History (Student)
* **Requirement ID**: `FR-012`
* **Requirement Name**: View Personal Library Activity / History (Student)
* **Description**: The system must maintain and display a permanent chronological log of all books borrowed and returned by the logged-in student.
* **Actor**: Student
* **Preconditions**: Student is authenticated.
* **Main Flow**:
  1. The student navigates to "Library Activity / History".
  2. The system retrieves all circulation records belonging to the student.
  3. The system renders the history showing: Book Title, Author, ISBN, Issue Date, Due Date, Return Date, and Status.
* **Alternative / Exception Flow**:
  * **E1 (No History)**: If the student has not yet borrowed or returned any books, the system displays: *"No library activity history found."*
* **Postconditions**: Student reviews their personal borrowing history.
* **Priority**: Must Have

---

### FR-013: Add New Book to Catalog
* **Requirement ID**: `FR-013`
* **Requirement Name**: Add New Book to Catalog
* **Description**: The system must allow a Librarian to add a new book record to the catalog with metadata and initial total copies.
* **Actor**: Librarian
* **Preconditions**: Librarian is authenticated.
* **Main Flow**:
  1. The librarian navigates to "Add Book".
  2. The librarian enters: Title, Author, ISBN / Book Code, Category, Publisher (optional), and Total Copies.
  3. The librarian submits the form.
  4. The system validates:
     * Title, Author, Category, and ISBN are non-empty.
     * ISBN is unique in the catalog.
     * Total Copies is a positive integer ($\ge 1$).
  5. The system sets initial $\text{Available Copies} = \text{Total Copies}$.
  6. The system saves the new book to the catalog.
  7. The system displays a confirmation message: *"Book successfully added to the catalog."*
* **Alternative / Exception Flow**:
  * **E1 (Duplicate ISBN)**: If the ISBN already exists, the system rejects addition and displays: *"A book with this ISBN already exists."*
  * **E2 (Invalid Total Copies)**: If Total Copies $< 1$, the system displays: *"Total copies must be at least 1."*
* **Postconditions**: New book record is added; initial available copies equals total copies; book is searchable.
* **Priority**: Must Have

---

### FR-014: Edit Existing Book Information
* **Requirement ID**: `FR-014`
* **Requirement Name**: Edit Existing Book Information
* **Description**: The system must allow a Librarian to edit bibliographic information and copy counts for an existing book in the catalog.
* **Actor**: Librarian
* **Preconditions**: Librarian is authenticated; target book exists in the catalog.
* **Main Flow**:
  1. The librarian locates the book and selects "Edit Book".
  2. The system populates the current details (Title, Author, Category, Publisher, Total Copies).
  3. The librarian modifies details and submits updates.
  4. The system validates:
     * Mandatory fields remain valid.
     * If Total Copies is modified, new $\text{Total Copies} \ge (\text{Total Copies} - \text{Available Copies})$ (cannot be less than currently circulating copies).
     * Recalculates $\text{Available Copies}$ appropriately based on the change in total copies.
  5. The system saves the updated book information.
  6. The system displays: *"Book information updated successfully."*
* **Alternative / Exception Flow**:
  * **E1 (Total Copies Less Than Circulating)**: If the librarian sets Total Copies below the number of currently issued copies, the system blocks the update with: *"Total copies cannot be less than the number of copies currently issued to students."*
* **Postconditions**: Book metadata and copy counts are updated consistently.
* **Priority**: Must Have

---

### FR-015: Delete Book from Catalog
* **Requirement ID**: `FR-015`
* **Requirement Name**: Delete Book from Catalog
* **Description**: The system must allow a Librarian to delete a book from the catalog only when no copies are currently issued.
* **Actor**: Librarian
* **Preconditions**: Librarian is authenticated; target book exists in catalog.
* **Main Flow**:
  1. The librarian selects "Delete Book" on a book entry.
  2. The system verifies the safe deletion invariant:
     * Checks if $\text{Available Copies} == \text{Total Copies}$ (meaning zero copies are currently issued).
  3. If all copies are available, the system displays a confirmation dialog: *"Are you sure you want to delete this book?"*
  4. The librarian confirms deletion.
  5. The system removes the book from the active catalog (preserving referential integrity for past history).
  6. The system displays: *"Book deleted successfully."*
* **Alternative / Exception Flow**:
  * **E1 (Copies Currently Issued — Deletion Blocked)**: If $\text{Available Copies} < \text{Total Copies}$, the system blocks deletion and displays: *"Cannot delete book: One or more copies are currently issued to students. All copies must be returned before deleting."*
* **Postconditions**: Book is removed from the active catalog; historical records remain intact.
* **Priority**: Must Have

---

### FR-016: Manage Student Records
* **Requirement ID**: `FR-016`
* **Requirement Name**: Manage Student Records
* **Description**: The system must allow a Librarian to view and search registered student records, inspect their current loan status, and view their borrowing history.
* **Actor**: Librarian
* **Preconditions**: Librarian is authenticated.
* **Main Flow**:
  1. The librarian navigates to "Manage Students".
  2. The system displays a directory of registered students showing: Student ID, Full Name, Email, and Current Issued Books Count.
  3. The librarian can search students by Name or Student ID.
  4. The librarian clicks on a student to view detailed records:
     * Student profile details.
     * List of books currently issued to the student.
     * History of previously returned books.
* **Alternative / Exception Flow**:
  * **E1 (No Students Found)**: If a search query yields no matches, the system displays: *"No students found matching the search criteria."*
* **Postconditions**: Librarian inspects student accounts and their circulation standing.
* **Priority**: Must Have

---

### FR-017: View Issued / Returned Book Records (Circulation Log)
* **Requirement ID**: `FR-017`
* **Requirement Name**: View Issued / Returned Book Records (Circulation Log)
* **Description**: The system must provide the Librarian with a comprehensive log of all issued and returned book transactions across the library.
* **Actor**: Librarian
* **Preconditions**: Librarian is authenticated.
* **Main Flow**:
  1. The librarian navigates to "Circulation Records".
  2. The system displays all issue and return records showing:
     * Transaction ID
     * Student Name & Student ID
     * Book Title & ISBN
     * Issue Date
     * Due Date
     * Return Date (if returned)
     * Status (`ISSUED` / `RETURNED`)
  3. The librarian can filter records by status (`All`, `Issued`, `Returned`) or search by student or book identifier.
* **Alternative / Exception Flow**:
  * **E1 (No Records)**: Displays: *"No circulation records found."*
* **Postconditions**: Librarian reviews the library-wide circulation ledger.
* **Priority**: Must Have

---

### FR-018: Inventory Availability Synchronization
* **Requirement ID**: `FR-018`
* **Requirement Name**: Inventory Availability Synchronization
* **Description**: The system must automatically synchronize book availability counts upon every issue and return transaction.
* **Actor**: System
* **Preconditions**: An issue or return operation is executed.
* **Main Flow**:
  1. Upon confirming an issue: $\text{Available Copies} \leftarrow \text{Available Copies} - 1$.
  2. Upon confirming a return: $\text{Available Copies} \leftarrow \text{Available Copies} + 1$.
  3. The system enforces that:
     $$0 \le \text{Available Copies} \le \text{Total Copies}$$
  4. The catalog search and details views immediately reflect the updated available count.
* **Alternative / Exception Flow**:
  * **E1 (Integrity Violation)**: If any operation would cause Available Copies to drop below 0 or exceed Total Copies, the transaction is aborted and an error is returned.
* **Postconditions**: Available copy count is strictly consistent with circulating and returned physical items.
* **Priority**: Must Have

---

### FR-019: Student Data Privacy & Isolation
* **Requirement ID**: `FR-019`
* **Requirement Name**: Student Data Privacy & Isolation
* **Description**: The system must isolate each student's data so that a student can only view their own account details, issued books, and borrowing history.
* **Actor**: System / Student
* **Preconditions**: Student is authenticated.
* **Main Flow**:
  1. Student requests their dashboard, issued books, or history.
  2. System enforces user identity from the authenticated session.
  3. System returns only data matching the student's own identifier.
* **Alternative / Exception Flow**:
  * **E1 (Cross-Account Access Attempt)**: Any attempt by a student to query another student's records is blocked with an access denied response.
* **Postconditions**: Student privacy is strictly maintained.
* **Priority**: Must Have

---

### FR-020: Role-Based Route & Access Authorization
* **Requirement ID**: `FR-020`
* **Requirement Name**: Role-Based Route & Access Authorization
* **Description**: The system must restrict access to routes and actions based strictly on the user's role (Student vs. Librarian).
* **Actor**: System
* **Preconditions**: User attempts to access a view or trigger an operation.
* **Main Flow**:
  1. System checks the authenticated role of the requesting user.
  2. If a Student accesses Student Portal routes $\rightarrow$ Access Granted.
  3. If a Librarian accesses Librarian Console routes $\rightarrow$ Access Granted.
  4. If a Student attempts to access Librarian routes (e.g., add book, manage students, delete book) $\rightarrow$ Access Denied.
* **Alternative / Exception Flow**:
  * **E1 (Unauthorized Access)**: System rejects unauthorized requests with an access denied message and redirects the user to their appropriate dashboard.
  * **E2 (Unauthenticated Access)**: If an unauthenticated user accesses protected pages, the system redirects to the Login view.
* **Postconditions**: Strict role boundaries are maintained across the application.
* **Priority**: Must Have

---

## 6. Authentication & Account Management

### 6.1 Student Account Management
1. **Registration**:
   * Input Fields: Full Name, Student ID, Email Address, Password.
   * Format Validation: Non-empty name; valid alphanumeric student ID; standard email format; secure password minimum length.
   * Unique Constraints: Email and Student ID must be unique.
2. **Login**:
   * Input Fields: Email Address, Password.
   * Authentication: Matches email and verifies password hash.
   * Redirection: Redirects to Student Portal upon successful login.
3. **Logout**:
   * Terminates active session; redirects to login view.
4. **Invalid Login Handling**:
   * Displays clear feedback: *"Invalid email or password. Please try again."*
   * Does not reveal whether the email exists.
5. **Account Validation**:
   * Ensures account is properly registered before granting portal access.

### 6.2 Librarian Account Management
1. **Login**:
   * Input Fields: Email Address, Password.
   * Authentication: Matches librarian credentials and role.
   * Redirection: Redirects to Librarian Console upon successful login.
2. **Logout**:
   * Terminates active librarian session; redirects to login view.
3. **Invalid Login Handling**:
   * Displays clear feedback: *"Invalid librarian credentials. Please try again."*

---

## 7. Student Functional Requirements Summary

The Student Portal encompasses the following core features:

| Feature | Description | Associated Requirement ID |
| :--- | :--- | :--- |
| **Student Login** | Authenticate with email and password | `FR-002` |
| **Student Dashboard** | Personalized dashboard with issued count, due dates, quick links | `FR-005` |
| **Search Books** | Search catalog by title, author, category, ISBN with live availability | `FR-007` |
| **View Book Details** | View bibliographic metadata and copy availability counts | `FR-008` |
| **Request / Issue Book**| Request or issue an available book | `FR-009` |
| **View Issued Books** | Review currently issued books with issue dates and due dates | `FR-010` |
| **Return Books** | Return currently held books | `FR-011` |
| **View Activity / History**| Permanent personal record of all past borrowed and returned books | `FR-012` |
| **Logout** | Securely exit student session | `FR-004` |

---

## 8. Book Search and Book Details

### 8.1 Search Behavior
* **Search Input**: Unified search input supporting keywords.
* **Fields Evaluated**:
  1. Title
  2. Author
  3. Category
  4. ISBN / Book Code
* **Search Results**:
  * Displays list of matching books with Title, Author, Category, ISBN, and Availability Status.
  * Availability Status clearly indicates:
    * **Available** (when $\text{Available Copies} > 0$)
    * **Unavailable / Out of Stock** (when $\text{Available Copies} = 0$)
* **No Books Found Behavior**:
  * When no books match, displays: *"No books found matching your search criteria."* with an option to reset search.

### 8.2 Book Details Displayed
* When a book is selected, the system displays:
  * Full Title
  * Author(s)
  * ISBN / Identifier
  * Category / Subject
  * Publisher (if recorded)
  * Total Copies in library inventory
  * Copies Currently Available
  * Context-appropriate action:
    * For Student: Request/Issue button (active if Available $> 0$, disabled if Available $= 0$).
    * For Librarian: Edit, Delete, and Issue controls.

---

## 9. Book Issue / Request Process

The circulation process connects student borrowing requests with librarian catalog management:

```
+-----------------------------------------------------------------------------------+
|                           BOOK ISSUE / REQUEST PROCESS                            |
+-----------------------------------------------------------------------------------+

  [Student Request or Librarian Issue]
       │
       ▼
  System checks availability: Available Copies >= 1
       │
       ▼
  System checks duplicate loan: Student has no active unreturned copy of this title
       │
       ▼
  System creates Issue Record:
    • Student ID & Name
    • Book ID & Title
    • Issue Date (Current Timestamp)
    • Due Date (Recorded per library policy)
    • Status: ISSUED
       │
       ▼
  System decrements Available Copies by 1:
    Available Copies = Available Copies - 1
       │
       ▼
  Catalog and Student Dashboard update immediately
```

### 9.1 Issue Processing Rules
1. A book can only be issued if $\text{Available Copies} \ge 1$.
2. Only registered students with active accounts can be issued books.
3. A student cannot be issued a book if they already hold an active, unreturned copy of the exact same title (BRD Rule 08).
4. Upon issue, the system generates an issue transaction containing:
   * Unique Transaction ID
   * Student ID & Name
   * Book ID, Title, and ISBN
   * Issue Date (current timestamp)
   * Due Date (recorded per library policy)
   * Status (`ISSUED`)
5. The system immediately decrements $\text{Available Copies}$ by 1.

---

## 10. Book Return Process

The return process closes an active loan and restores the book to active circulation:

```
+-----------------------------------------------------------------------------------+
|                               BOOK RETURN PROCESS         P                        |
+-----------------------------------------------------------------------------------+

  [Book Return Action Initiated / Accepted]
       │
       ▼
  System locates active loan record (Status:P ISSUED)
       │
       ▼
  System updates Transaction Record:
    • Status updated to: RETURNEDP
    • Return Date recorded as Current Timestamp
       │
       ▼
  System increments Available Copies by 1:
    Available Copies = Available Copies + 1
       │
       ▼
  Book is removed from Student's Issued List -> Archived in History
  Catalog immediately reflects restored availability
```

### 10.1 Return Processing Rules
1. An active issue record must exist for the book and student.
2. The transaction record is updated:
   * Status changes from `ISSUED` $\rightarrow$ `RETURNED`.
   * `ReturnDate` is set to the current timestamp.
3. The book's $\text{Available Copies}$ is incremented by 1.
4. The system validates that $\text{Available Copies} \le \text{Total Copies}$.
5. The returned book is archived to the student's borrowing history and removed from currently issued books.

---

## 11. Librarian Functional Requirements Summary

The Librarian Console encompasses the following core capabilities:

| Capability | Description | Associated Requirement ID |
| :--- | :--- | :--- |
| **Librarian Login** | Authenticate with librarian email and password | `FR-003` |
| **Librarian Dashboard** | Monitor overall library metrics (titles, copies, active loans, students) | `FR-006` |
| **Add Book** | Add new book with title, author, ISBN, category, total copies | `FR-013` |
| **Edit Book** | Update metadata and adjust copy counts safely | `FR-014` |
| **Delete Book** | Delete book from catalog (only when Available == Total) | `FR-015` |
| **Search & View Books**| Search across all books and stock levels | `FR-007`, `FR-008` |
| **Manage Students** | Search students, inspect active loans, and view history | `FR-016` |
| **Issue Books** | Issue available books to students | `FR-009` |
| **Accept Returned Books**| Process returns, record return date, restore stock | `FR-011` |
| **View Library Records** | Master circulation log of all issued and returned books | `FR-017` |
| **Logout** | Securely exit librarian session | `FR-004` |

---

## 12. Book Management

The Librarian performs complete catalog management under strict data integrity rules:

### 12.1 Adding Books
* Captures: Title, Author, ISBN, Category, Publisher (optional), and Total Copies.
* Validates unique ISBN and positive total copies ($\ge 1$).
* Initializes $\text{Available Copies} = \text{Total Copies}$.

### 12.2 Editing Books
* Allows updating bibliographic fields (Title, Author, Category, Publisher).
* Allows adjusting Total Copies with the constraint that Total Copies cannot be lower than the number of copies currently issued:
  $$\text{Total Copies (New)} \ge (\text{Total Copies (Old)} - \text{Available Copies (Old)})$$

### 12.3 Deleting Books
* Safe Deletion Constraint: A book can **only** be deleted if:
  $$\text{Available Copies} == \text{Total Copies}$$
* If any copies are currently issued, deletion is blocked with a clear warning.

### 12.4 Viewing & Searching Books
* Librarians can search and view all books in the catalog, including titles currently out of stock.

### 12.5 Availability Management
* Availability is managed automatically by the system:
  * On Issue: Decrement Available Copies by 1.
  * On Return: Increment Available Copies by 1.
  * Invariant: $0 \le \text{Available Copies} \le \text{Total Copies}$.

---

## 13. Student Management

The Librarian's student management capabilities are focused on library operations:

1. **Student Directory**:
   * View list of all registered students with Student ID, Name, Email, and Active Issued Count.
   * Search students by Name or Student ID.
2. **Student Profile Inspection**:
   * View individual student details.
   * View books currently issued to that student with due dates.
   * View that student's past returned books history.
3. **Operational Context**:
   * Enables the librarian to review student borrowing records when issuing or receiving books.

---

## 14. Library Transaction Management

Circulation transactions follow a deterministic lifecycle:

| Transaction State | Trigger / Description | Available Copies Effect |
| :--- | :--- | :--- |
| **`ISSUED`** | Book is issued to student (via request or librarian issue) | Decremented by 1 ($\text{Available} \leftarrow \text{Available} - 1$) |
| **`RETURNED`** | Book is returned and accepted | Incremented by 1 ($\text{Available} \leftarrow \text{Available} + 1$) |

### Transaction Record Specifications
* Every circulation record must capture:
  * Transaction ID
  * Student Identifier & Name
  * Book Identifier, Title, and ISBN
  * Issue Date (Timestamp)
  * Due Date
  * Return Date (Timestamp, populated upon return)
  * Status (`ISSUED` / `RETURNED`)
* Transaction records are permanent and immutable.

---

## 15. Validation Requirements

| Feature / Operation | Validation Rules | Error Response |
| :--- | :--- | :--- |
| **Student Registration** | Full Name: Non-empty string | *"Full Name is required."* |
| **Student Registration** | Student ID: Non-empty, unique | *"Student ID is required and must be unique."* |
| **Student Registration** | Email: Valid email format, unique | *"Please provide a valid, unique email address."* |
| **Student Registration** | Password: Minimum length required | *"Password does not meet required length."* |
| **Login** | Email & Password: Both non-empty | *"Please enter both email and password."* |
| **Add Book** | Title, Author, Category: Non-empty | *"Please fill in all required book fields."* |
| **Add Book** | ISBN: Non-empty, unique in catalog | *"A book with this ISBN already exists."* |
| **Add Book** | Total Copies: Positive integer $\ge 1$ | *"Total copies must be at least 1."* |
| **Edit Book** | Total Copies: $\ge \text{Currently Issued Copies}$ | *"Total copies cannot be less than currently issued copies."* |
| **Delete Book** | Available Copies $==$ Total Copies | *"Cannot delete book: Copies are currently issued."* |
| **Issue Book** | Available Copies $\ge 1$ | *"Cannot issue book: No copies currently available."* |
| **Issue Book** | Student has no active copy of this title | *"Student already has an active loan of this book title."* |
| **Return Book** | Active issued record exists | *"No active loan record found for this book."* |

---

## 16. Error Handling

| Scenario | System Response |
| :--- | :--- |
| **Invalid Login** | Display: *"Invalid email or password. Please try again."* |
| **Duplicate Registration** | Display: *"An account with this email or Student ID already exists."* |
| **Book Unavailable** | Display: *"Cannot issue book: No copies currently available."* |
| **Book Not Found** | Display: *"The requested book record was not found."* |
| **Student Not Found** | Display: *"Student record not found."* |
| **Invalid Book Data** | Highlight invalid fields with descriptive guidance messages. |
| **Duplicate Book Issue** | Display: *"Student already has an active loan of this book title."* |
| **Unauthorized Operation** | Deny action and display: *"Access denied: You do not have permission to perform this operation."* |
| **Unauthenticated Access** | Redirect user to the login view with prompt to log in. |

---

## 17. Authorization Requirements

The system enforces strict role-based access control between the two application roles:

| Operation / View | Student Role | Librarian Role |
| :--- | :--- | :--- |
| **View Student Dashboard** | Permitted | Prohibited (Redirect to Librarian Console) |
| **Search Catalog & View Details** | Permitted | Permitted |
| **Request / Issue Book** | Permitted | Not Applicable (Librarian issues directly) |
| **View Own Issued Books** | Permitted (Own only) | Prohibited |
| **Return Own Issued Books** | Permitted (Own only) | Prohibited |
| **View Own History** | Permitted (Own only) | Prohibited |
| **View Librarian Dashboard** | Prohibited (Access Denied) | Permitted |
| **Add Book to Catalog** | Prohibited (Access Denied) | Permitted |
| **Edit Book Information** | Prohibited (Access Denied) | Permitted |
| **Delete Book from Catalog** | Prohibited (Access Denied) | Permitted (Safe Deletion) |
| **Manage Student Records** | Prohibited (Access Denied) | Permitted |
| **Issue Book to Student** | Prohibited (Access Denied) | Permitted |
| **Accept Returned Books** | Prohibited (Access Denied) | Permitted |
| **View Master Circulation Records** | Prohibited (Access Denied) | Permitted |

---

## 18. Functional Business Rules

The following system-level functional rules translate the approved business rules from Section 16 of the BRD:

* **RULE-001 (Student Eligibility)**: Only registered students with an active account can request or borrow books.
* **RULE-002 (Catalog Management Authority)**: Only authorized Librarians can add, edit, or delete book records in the catalog.
* **RULE-003 (Availability Invariant)**: A book can only be issued when its available copy count is at least 1 ($\text{Available Copies} \ge 1$). When $\text{Available Copies} = 0$, issuance is blocked.
* **RULE-004 (Inventory Restoration Invariant)**: A returned book must immediately increment $\text{Available Copies}$ by 1, making it available again in the catalog.
* **RULE-005 (Audit History Invariant)**: The system must maintain a permanent, immutable issue and return history. Historical circulation records cannot be deleted.
* **RULE-006 (Account & Data Isolation)**: Each student has their own private account and library records. A student cannot access or view another student's library records or history.
* **RULE-007 (Catalog Safe Deletion Invariant)**: A book record cannot be deleted from the catalog if any copy is currently issued ($\text{Available Copies} < \text{Total Copies}$).
* **RULE-008 (Single Active Copy Per Title)**: A student cannot concurrently hold multiple copies of the exact same book title.

---

## 19. Use Cases Summary

| Use Case ID | Use Case Name | Actor | Description |
| :--- | :--- | :--- | :--- |
| **UC-01** | **Register Student Account** | Student | Student registers an account using name, student ID, email, and password. |
| **UC-02** | **Student Login** | Student | Student authenticates with email and password to access Student Portal. |
| **UC-03** | **Librarian Login** | Librarian | Librarian authenticates with email and password to access Librarian Console. |
| **UC-04** | **User Logout** | Student, Librarian | User terminates active session. |
| **UC-05** | **Search Books** | Student, Librarian | User searches book catalog by title, author, category, or ISBN. |
| **UC-06** | **View Book Details** | Student, Librarian | User inspects detailed bibliographic information and copy availability. |
| **UC-07** | **Request / Issue Book** | Student | Student requests or issues an available book title. |
| **UC-08** | **View Issued Books** | Student | Student views all books currently issued to them with due dates. |
| **UC-09** | **Return Issued Book** | Student | Student initiates or processes return of an issued book. |
| **UC-10** | **View Personal Activity History**| Student | Student reviews their complete borrowing and return history. |
| **UC-11** | **Monitor Library Activity** | Librarian | Librarian views overall library metrics on the Librarian Dashboard. |
| **UC-12** | **Add Book to Catalog** | Librarian | Librarian creates a new book record with metadata and total copy count. |
| **UC-13** | **Edit Book Details** | Librarian | Librarian modifies book metadata or adjusts copy counts. |
| **UC-14** | **Delete Book Record** | Librarian | Librarian removes a book from the catalog if all copies are returned. |
| **UC-15** | **Manage Student Records** | Librarian | Librarian searches students, views active loans, and checks loan histories. |
| **UC-16** | **Issue Book to Student** | Librarian | Librarian issues an available book to a student. |
| **UC-17** | **Accept Returned Book** | Librarian | Librarian processes return, marks record returned, and restores available stock. |
| **UC-18** | **View Circulation Records** | Librarian | Librarian inspects the global log of all issued and returned books. |

---

## 20. Functional Requirements Traceability Matrix

| BRD Requirement ID | BRD Requirement Description | Traced FRD Requirement(s) | Compliance Verification |
| :--- | :--- | :--- | :--- |
| **BR-001** | User Credential Management | `FR-001`, `FR-002`, `FR-003`, `FR-004` | Full coverage of student registration, login, librarian login, and logout. |
| **BR-002** | Role-Based Portal Access | `FR-005`, `FR-006`, `FR-020` | Full coverage of student dashboard, librarian console, and route access guards. |
| **BR-003** | Centralized Catalog Administration | `FR-013`, `FR-014`, `FR-015` | Full coverage of add, edit, and safeguarded delete book operations. |
| **BR-004** | Real-Time Catalog Search | `FR-007`, `FR-008` | Full coverage of search by title/author/category/ISBN and book details. |
| **BR-005** | Managed Book Issuance | `FR-009`, `FR-018` | Full coverage of student issue request, librarian issue, and stock decrement. |
| **BR-006** | Automated Stock Restoration | `FR-011`, `FR-018` | Full coverage of return processing and automatic stock increment. |
| **BR-007** | Personal Student Activity Tracking | `FR-005`, `FR-010`, `FR-012` | Full coverage of student dashboard, active issued list, and personal history. |
| **BR-008** | Comprehensive Library Activity Audit| `FR-006`, `FR-017` | Full coverage of operational metrics and master circulation records log. |
| **BR-009** | Student Record Administration | `FR-016` | Full coverage of librarian managing student profiles and loan records. |
| **BR-010** | Operational Monitoring Dashboard | `FR-006` | Full coverage of librarian monitoring overall library activity. |
| **BR-STU-001** | Student Self-Registration | `FR-001` | Detailed registration inputs, validations, and hashing specifications. |
| **BR-STU-002** | Student Authentication | `FR-002` | Credential validation and student portal redirection. |
| **BR-STU-003** | Catalog Discovery & Search | `FR-007` | Real-time search with availability indicators. |
| **BR-STU-004** | Book Information Inspection | `FR-008` | Detailed information card with bibliographic metadata. |
| **BR-STU-005** | Book Borrow/Issue Request | `FR-009` | Borrow request processing with availability and single-title check. |
| **BR-STU-006** | Active Borrowings Review | `FR-010` | Dedicated active loans table with issue and due dates. |
| **BR-STU-007** | Book Return Initiation | `FR-011` | Return processing for issued books. |
| **BR-STU-008** | Personal Activity & History | `FR-012` | Permanent historical reading ledger for each student. |
| **BR-LIB-001** | Librarian Secure Login | `FR-003` | Protected librarian login gateway. |
| **BR-LIB-002** | Add New Book Record | `FR-013` | Catalog addition with metadata and copy count. |
| **BR-LIB-003** | Modify Book Information | `FR-014` | Book modification with stock reduction protections. |
| **BR-LIB-004** | Delete Book Entry | `FR-015` | Safeguarded deletion verifying zero active loans. |
| **BR-LIB-005** | Search & View Books | `FR-007`, `FR-008` | Search across all books in catalog. |
| **BR-LIB-006** | Manage Student Records | `FR-016` | Student directory and profile inspection. |
| **BR-LIB-007** | Issue Books to Students | `FR-009` | Book issuance by librarian. |
| **BR-LIB-008** | Accept Returned Books | `FR-011` | Return acceptance and stock restoration. |
| **BR-LIB-009** | View Issued/Returned Records | `FR-017` | Master circulation log. |
| **BR-LIB-010** | Monitor Overall Library Activity | `FR-006` | Consolidated librarian activity dashboard. |
| **BR-BKM-001–005**| Book Management Invariants | `FR-013`, `FR-014`, `FR-015`, `FR-018` | Invariants: $\text{Available} \le \text{Total}$, uniqueness, deletion guards. |
| **BR-CIR-001–005**| Circulation Invariants | `FR-009`, `FR-011`, `FR-018` | Atomic transactions, immutable history, status transitions. |
| **BR-AUT-001–005**| Authentication & Session Security| `FR-001`, `FR-002`, `FR-003`, `FR-004`, `FR-019`, `FR-020` | Role partitioning, session guards, account isolation. |

---

## 21. Assumptions & Open Questions / Decisions Required

### 21.1 Approved Baseline Assumptions
The following fundamental assumptions are derived strictly from the approved BRD:
1. **Single Facility**: The system serves a single library for an academic institution.
2. **Two Roles Only**: The system contains only two user roles: **Student** and **Librarian**. There is no Admin role.
3. **Physical Stock Consistency**: The digital system manages records of physical books; issue and return transactions in the system correspond to physical circulation events.
4. **Data Persistence**: Issue and return transaction records are stored permanently to maintain an unbroken audit trail.

---

### 21.2 Open Questions / Decisions Required
The following operational parameters and workflow interactions are not defined in the approved BRD and require explicit decision before technical implementation:

| Decision ID | Item Requiring Decision | Description & Alternatives |
| :--- | :--- | :--- |
| **DEC-01** | **Default Loan Period Duration** | The BRD requires that an issue record capture an expected due date, but does not define a fixed duration.<br>• How should the loan duration and due date be established (e.g., standard duration set by library policy vs. specified by the librarian during issuance)? |
| **DEC-02** | **Maximum Concurrent Loan Limit Per Student** | The BRD specifies that a student cannot borrow multiple copies of the exact same title (Rule 08), but does not define an overall numerical limit on total borrowed books.<br>• Is there an institutional limit on the total number of books a student can borrow concurrently, or does the policy rely solely on Rule 08? |
| **DEC-03** | **Student Request & Librarian Issue Interaction** | The BRD states both that students can request/issue books and that librarians issue books to students.<br>• Does a student request directly issue the book in the system, or does it create a request that a librarian confirms? |
| **DEC-04** | **Student Return & Librarian Acceptance Interaction** | The BRD states both that students can return issued books and that librarians accept returned books.<br>• Does a student initiate a return that the librarian then accepts, or can either party process the return directly? |
| **DEC-05** | **Initial Librarian Account Setup** | Because there are only Student and Librarian roles (and students self-register), how should the first Librarian account be created in the system? |

---
*End of Functional Requirements Document (FRD)*

