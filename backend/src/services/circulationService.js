const db = require('../config/database');

class CirculationService {
  async issueBook({ book_id, student_id, librarian_id, due_date, notes }) {
    if (!book_id || !student_id || !librarian_id) {
      const err = new Error('Book ID, Student ID, and Librarian ID are required.');
      err.statusCode = 400;
      throw err;
    }

    // 1. Verify student exists and is active
    const students = await db.query(
      "SELECT id, name, email, role, student_id, status FROM users WHERE id = ? AND role = 'student'",
      [student_id]
    );

    if (students.length === 0) {
      const err = new Error('Student record not found.');
      err.statusCode = 404;
      throw err;
    }

    const student = students[0];
    if (student.status !== 'active') {
      const err = new Error('Cannot issue book: Student account is inactive.');
      err.statusCode = 400;
      throw err;
    }

    // 2. Verify book exists and has available copies
    const books = await db.query('SELECT id, title, isbn, available_copies, total_copies FROM books WHERE id = ?', [book_id]);
    if (books.length === 0) {
      const err = new Error('Book not found in catalog.');
      err.statusCode = 404;
      throw err;
    }

    const book = books[0];
    if (book.available_copies <= 0) {
      const err = new Error(`Cannot issue book: "${book.title}" has 0 available copies currently in stock.`);
      err.statusCode = 400;
      throw err;
    }

    // 3. RULE-008: Check duplicate active loan of the same book
    const existingLoans = await db.query(
      `SELECT id FROM circulation_transactions 
       WHERE book_id = ? AND student_id = ? AND status IN ('issued', 'overdue')`,
      [book_id, student_id]
    );

    if (existingLoans.length > 0) {
      const err = new Error(
        `Duplicate loan prohibited: Student "${student.name}" already has an active copy of "${book.title}" on loan.`
      );
      err.statusCode = 409;
      throw err;
    }

    // 4. Validate or compute Due Date
    let dueDateFormatted;
    if (due_date) {
      const parsed = new Date(due_date);
      if (isNaN(parsed.getTime())) {
        const err = new Error('Invalid due date provided.');
        err.statusCode = 400;
        throw err;
      }
      dueDateFormatted = parsed.toISOString().slice(0, 19).replace('T', ' ');
    } else {
      // Default loan period of 14 days
      const d = new Date();
      d.setDate(d.getDate() + 14);
      dueDateFormatted = d.toISOString().slice(0, 19).replace('T', ' ');
    }

    // 5. Execute atomic transaction
    const result = await db.transaction(async (trx) => {
      // Decrement stock
      await trx.execute(
        'UPDATE books SET available_copies = available_copies - 1 WHERE id = ? AND available_copies > 0',
        [book_id]
      );

      // Insert transaction record
      const insRes = await trx.execute(
        `INSERT INTO circulation_transactions 
         (book_id, student_id, librarian_id, due_date, status, notes)
         VALUES (?, ?, ?, ?, 'issued', ?)`,
        [book_id, student_id, librarian_id, dueDateFormatted, notes || null]
      );

      return insRes.insertId;
    });

    return await this.getTransactionById(result);
  }

  async returnBook({ transaction_id, return_notes }) {
    if (!transaction_id) {
      const err = new Error('Transaction ID is required.');
      err.statusCode = 400;
      throw err;
    }

    const txRows = await db.query(
      `SELECT ct.*, b.title as book_title, u.name as student_name
       FROM circulation_transactions ct
       JOIN books b ON ct.book_id = b.id
       JOIN users u ON ct.student_id = u.id
       WHERE ct.id = ?`,
      [transaction_id]
    );

    if (txRows.length === 0) {
      const err = new Error('Circulation transaction record not found.');
      err.statusCode = 404;
      throw err;
    }

    const tx = txRows[0];
    if (tx.status === 'returned') {
      const err = new Error('This book has already been returned.');
      err.statusCode = 400;
      throw err;
    }

    const nowFormatted = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // Execute atomic return transaction
    await db.transaction(async (trx) => {
      // Increment stock
      await trx.execute(
        'UPDATE books SET available_copies = available_copies + 1 WHERE id = ?',
        [tx.book_id]
      );

      // Mark returned
      const appendedNotes = return_notes
        ? (tx.notes ? `${tx.notes} | Return Note: ${return_notes}` : `Return Note: ${return_notes}`)
        : tx.notes;

      await trx.execute(
        `UPDATE circulation_transactions 
         SET status = 'returned', return_date = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`,
        [nowFormatted, appendedNotes, transaction_id]
      );
    });

    return await this.getTransactionById(transaction_id);
  }

  async getTransactionById(id) {
    const rows = await db.query(
      `SELECT 
         ct.id, ct.book_id, ct.student_id, ct.librarian_id,
         ct.issue_date, ct.due_date, ct.return_date, ct.status, ct.notes,
         b.title as book_title, b.isbn as book_isbn, b.author as book_author, b.category as book_category,
         s.name as student_name, s.email as student_email, s.student_id as student_code,
         l.name as librarian_name
       FROM circulation_transactions ct
       JOIN books b ON ct.book_id = b.id
       JOIN users s ON ct.student_id = s.id
       LEFT JOIN users l ON ct.librarian_id = l.id
       WHERE ct.id = ?`,
      [id]
    );

    if (rows.length === 0) return null;
    return this.enrichTransactionStatus(rows[0]);
  }

  async getAllRecords({ search, status, book_id, student_id } = {}) {
    let sql = `
      SELECT 
        ct.id, ct.book_id, ct.student_id, ct.librarian_id,
        ct.issue_date, ct.due_date, ct.return_date, ct.status, ct.notes,
        b.title as book_title, b.isbn as book_isbn, b.author as book_author, b.category as book_category,
        s.name as student_name, s.email as student_email, s.student_id as student_code,
        l.name as librarian_name
      FROM circulation_transactions ct
      JOIN books b ON ct.book_id = b.id
      JOIN users s ON ct.student_id = s.id
      LEFT JOIN users l ON ct.librarian_id = l.id
      WHERE 1=1
    `;
    const params = [];

    if (search && search.trim() !== '') {
      const term = `%${search.trim()}%`;
      sql += ' AND (b.title LIKE ? OR b.isbn LIKE ? OR s.name LIKE ? OR s.student_id LIKE ?)';
      params.push(term, term, term, term);
    }

    if (status && status !== 'all') {
      if (status === 'overdue') {
        sql += " AND ct.status = 'issued' AND ct.due_date < datetime('now', 'localtime')";
      } else {
        sql += ' AND ct.status = ?';
        params.push(status);
      }
    }

    if (book_id) {
      sql += ' AND ct.book_id = ?';
      params.push(book_id);
    }

    if (student_id) {
      sql += ' AND ct.student_id = ?';
      params.push(student_id);
    }

    sql += ' ORDER BY ct.issue_date DESC';

    const rows = await db.query(sql, params);
    return rows.map(r => this.enrichTransactionStatus(r));
  }

  enrichTransactionStatus(record) {
    if (!record) return null;
    const now = new Date();
    const dueDate = new Date(record.due_date);

    let isOverdue = false;
    let daysOverdue = 0;
    let daysRemaining = 0;

    if (record.status !== 'returned') {
      if (now > dueDate) {
        isOverdue = true;
        const diffMs = now.getTime() - dueDate.getTime();
        daysOverdue = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      } else {
        const diffMs = dueDate.getTime() - now.getTime();
        daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      }
    }

    return {
      ...record,
      is_overdue: isOverdue,
      days_overdue: daysOverdue,
      days_remaining: daysRemaining,
      display_status: record.status === 'returned' ? 'Returned' : (isOverdue ? 'Overdue' : 'Issued')
    };
  }
}

module.exports = new CirculationService();
