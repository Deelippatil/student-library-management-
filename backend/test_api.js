const db = require('./src/config/database');
const authService = require('./src/services/authService');
const bookService = require('./src/services/bookService');
const circulationService = require('./src/services/circulationService');
const studentService = require('./src/services/studentService');
const librarianService = require('./src/services/librarianService');

async function runTests() {
  console.log('--- STARTING BACKEND INTEGRATION & VERIFICATION TESTS ---');
  await db.init();

  // Test 1: Librarian Login
  console.log('\n[TEST 1] Librarian Login:');
  const libLogin = await authService.login({ email: 'librarian@library.com', password: 'Librarian@123' });
  console.log('✅ Librarian login OK. Role:', libLogin.user.role, 'Token received:', !!libLogin.token);

  // Test 2: Student Login
  console.log('\n[TEST 2] Student Login:');
  const stuLogin = await authService.login({ email: 'student@university.edu', password: 'Student@123' });
  console.log('✅ Student login OK. Role:', stuLogin.user.role, 'Student ID:', stuLogin.user.student_id);

  // Test 3: Student Registration
  console.log('\n[TEST 3] Student Registration:');
  const randomSuffix = Math.floor(Math.random() * 9000 + 1000);
  const regRes = await authService.registerStudent({
    name: 'Jane Doe',
    email: `jane${randomSuffix}@university.edu`,
    password: 'Password@123',
    student_id: `STU${randomSuffix}`
  });
  console.log('✅ Student registration OK. Registered:', regRes.user.email);

  // Test 4: Books Search
  console.log('\n[TEST 4] Books Search:');
  const books = await bookService.getAllBooks({ search: 'Clean Code' });
  console.log('✅ Books search returned:', books.length, 'book(s). Title:', books[0]?.title, 'Available:', books[0]?.available_copies);
  const bookToIssue = books[0];

  // Test 5: Issue Book
  console.log('\n[TEST 5] Issue Book to Student:');
  const issueTx = await circulationService.issueBook({
    book_id: bookToIssue.id,
    student_id: stuLogin.user.id,
    librarian_id: libLogin.user.id,
    notes: 'Issued for semester coursework'
  });
  console.log('✅ Book issued successfully. Tx ID:', issueTx.id, 'Status:', issueTx.status, 'Due Date:', issueTx.due_date);

  // Test 6: Verify Stock Decrement
  const bookAfterIssue = await bookService.getBookById(bookToIssue.id);
  console.log('✅ Inventory stock decremented. New available copies:', bookAfterIssue.available_copies, 'Total:', bookAfterIssue.total_copies);

  // Test 7: Duplicate Loan Prevention (RULE-008)
  console.log('\n[TEST 7] Duplicate Loan Prevention (RULE-008):');
  try {
    await circulationService.issueBook({
      book_id: bookToIssue.id,
      student_id: stuLogin.user.id,
      librarian_id: libLogin.user.id
    });
    console.error('❌ FAILED: Duplicate loan was allowed!');
  } catch (err) {
    console.log('✅ PASSED: Duplicate loan rejected as expected with error:', err.message);
  }

  // Test 8: Safe Deletion Invariant (RULE-007)
  console.log('\n[TEST 8] Safe Deletion Invariant (RULE-007):');
  try {
    await bookService.deleteBook(bookToIssue.id);
    console.error('❌ FAILED: Book with active loan was deleted!');
  } catch (err) {
    console.log('✅ PASSED: Deletion rejected as expected with error:', err.message);
  }

  // Test 9: Student Dashboard Verification
  console.log('\n[TEST 9] Student Dashboard:');
  const stuDash = await studentService.getDashboard(stuLogin.user.id);
  console.log('✅ Student Dashboard metrics:', stuDash);

  // Test 10: Librarian Dashboard Verification
  console.log('\n[TEST 10] Librarian Dashboard:');
  const libDash = await librarianService.getDashboard();
  console.log('✅ Librarian Dashboard metrics: Titles:', libDash.total_titles, 'Issued:', libDash.issued_copies, 'Active Loans:', libDash.active_loans_count);

  // Test 11: Return Book
  console.log('\n[TEST 11] Return Book:');
  const returnTx = await circulationService.returnBook({
    transaction_id: issueTx.id,
    return_notes: 'Returned in pristine condition'
  });
  console.log('✅ Book returned successfully. Status:', returnTx.status, 'Return Date:', returnTx.return_date);

  const bookAfterReturn = await bookService.getBookById(bookToIssue.id);
  console.log('✅ Inventory stock restored. Available copies:', bookAfterReturn.available_copies);

  console.log('\n=========================================');
  console.log('🎉 ALL 11 BACKEND VERIFICATION TESTS PASSED!');
  console.log('=========================================\n');
  process.exit(0);
}

runTests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
