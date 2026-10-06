const db = require('../config/database');

class BookService {
  async getAllBooks({ search, category, available_only } = {}) {
    let sql = 'SELECT * FROM books WHERE 1=1';
    const params = [];

    if (search && search.trim() !== '') {
      const term = `%${search.trim()}%`;
      sql += ' AND (title LIKE ? OR author LIKE ? OR isbn LIKE ? OR category LIKE ?)';
      params.push(term, term, term, term);
    }

    if (category && category.trim() !== '' && category.toLowerCase() !== 'all') {
      sql += ' AND category = ?';
      params.push(category.trim());
    }

    if (available_only === 'true' || available_only === true) {
      sql += ' AND available_copies > 0';
    }

    sql += ' ORDER BY title ASC';

    const books = await db.query(sql, params);
    return books.map(book => ({
      ...book,
      is_available: book.available_copies > 0,
      issued_copies: book.total_copies - book.available_copies
    }));
  }

  async getBookById(id) {
    const rows = await db.query('SELECT * FROM books WHERE id = ?', [id]);
    if (rows.length === 0) {
      const err = new Error('Book not found.');
      err.statusCode = 404;
      throw err;
    }

    const book = rows[0];
    return {
      ...book,
      is_available: book.available_copies > 0,
      issued_copies: book.total_copies - book.available_copies
    };
  }

  async addBook({ isbn, title, author, category, total_copies }) {
    if (!isbn || !title || !author || !category) {
      const err = new Error('ISBN, title, author, and category are required.');
      err.statusCode = 400;
      throw err;
    }

    const total = parseInt(total_copies, 10);
    if (isNaN(total) || total < 1) {
      const err = new Error('Total copies must be a positive integer (at least 1).');
      err.statusCode = 400;
      throw err;
    }

    // Check ISBN uniqueness
    const existing = await db.query('SELECT id FROM books WHERE isbn = ?', [isbn.trim()]);
    if (existing.length > 0) {
      const err = new Error(`A book with ISBN "${isbn.trim()}" already exists in the catalog.`);
      err.statusCode = 409;
      throw err;
    }

    const result = await db.execute(
      `INSERT INTO books (isbn, title, author, category, total_copies, available_copies)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [isbn.trim(), title.trim(), author.trim(), category.trim(), total, total]
    );

    return await this.getBookById(result.insertId);
  }

  async updateBook(id, { isbn, title, author, category, total_copies }) {
    const existingBook = await this.getBookById(id);

    const updatedTotal = parseInt(total_copies !== undefined ? total_copies : existingBook.total_copies, 10);
    if (isNaN(updatedTotal) || updatedTotal < 1) {
      const err = new Error('Total copies must be a positive integer (at least 1).');
      err.statusCode = 400;
      throw err;
    }

    // Check ISBN collision if changed
    const updatedIsbn = (isbn || existingBook.isbn).trim();
    if (updatedIsbn !== existingBook.isbn) {
      const isbnCheck = await db.query('SELECT id FROM books WHERE isbn = ? AND id != ?', [updatedIsbn, id]);
      if (isbnCheck.length > 0) {
        const err = new Error(`Another book with ISBN "${updatedIsbn}" already exists.`);
        err.statusCode = 409;
        throw err;
      }
    }

    // Invariant check: cannot reduce total copies below currently issued copies
    const issuedCopies = existingBook.total_copies - existingBook.available_copies;
    if (updatedTotal < issuedCopies) {
      const err = new Error(
        `Cannot reduce total copies to ${updatedTotal}. There are currently ${issuedCopies} copy/copies issued to students.`
      );
      err.statusCode = 400;
      throw err;
    }

    const updatedAvailable = updatedTotal - issuedCopies;

    await db.execute(
      `UPDATE books
       SET isbn = ?, title = ?, author = ?, category = ?, total_copies = ?, available_copies = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [
        updatedIsbn,
        (title || existingBook.title).trim(),
        (author || existingBook.author).trim(),
        (category || existingBook.category).trim(),
        updatedTotal,
        updatedAvailable,
        id
      ]
    );

    return await this.getBookById(id);
  }

  async deleteBook(id) {
    const book = await this.getBookById(id);

    // RULE-007: Safe Deletion check
    const activeLoans = await db.query(
      `SELECT COUNT(*) as count FROM circulation_transactions 
       WHERE book_id = ? AND status IN ('issued', 'overdue')`,
      [id]
    );

    const activeLoanCount = activeLoans[0]?.count || 0;
    if (activeLoanCount > 0) {
      const err = new Error(
        `Cannot delete "${book.title}". There are ${activeLoanCount} active loan(s) currently outstanding for this book.`
      );
      err.statusCode = 400;
      throw err;
    }

    if (book.available_copies !== book.total_copies) {
      const err = new Error(
        `Cannot delete "${book.title}". Available copies (${book.available_copies}) does not equal total copies (${book.total_copies}).`
      );
      err.statusCode = 400;
      throw err;
    }

    await db.execute('DELETE FROM books WHERE id = ?', [id]);
    return { id, title: book.title, message: 'Book deleted successfully.' };
  }

  async getCategories() {
    const rows = await db.query('SELECT DISTINCT category FROM books ORDER BY category ASC');
    return rows.map(r => r.category);
  }
}

module.exports = new BookService();
