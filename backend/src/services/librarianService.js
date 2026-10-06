const db = require('../config/database');
const circulationService = require('./circulationService');

class LibrarianService {
  async getDashboard() {
    // 1. Books stats
    const bookStats = await db.query(`
      SELECT 
        COUNT(*) as total_titles,
        COALESCE(SUM(total_copies), 0) as total_copies,
        COALESCE(SUM(available_copies), 0) as available_copies
      FROM books
    `);

    const titles = bookStats[0]?.total_titles || 0;
    const totalCopies = bookStats[0]?.total_copies || 0;
    const availableCopies = bookStats[0]?.available_copies || 0;
    const issuedCopies = totalCopies - availableCopies;

    // 2. Student count
    const studentCountRes = await db.query(
      "SELECT COUNT(*) as count FROM users WHERE role = 'student'"
    );
    const studentCount = studentCountRes[0]?.count || 0;

    // 3. Circulation stats
    const allRecords = await circulationService.getAllRecords();
    const activeLoans = allRecords.filter(r => r.status === 'issued');
    const overdueLoans = activeLoans.filter(r => r.is_overdue);

    return {
      total_titles: titles,
      total_inventory_copies: totalCopies,
      available_copies: availableCopies,
      issued_copies: issuedCopies,
      registered_students: studentCount,
      active_loans_count: activeLoans.length,
      overdue_loans_count: overdueLoans.length,
      recent_transactions: allRecords.slice(0, 7)
    };
  }

  async getAllStudents({ search } = {}) {
    let sql = `
      SELECT id, name, email, student_id, status, created_at
      FROM users
      WHERE role = 'student'
    `;
    const params = [];

    if (search && search.trim() !== '') {
      const term = `%${search.trim()}%`;
      sql += ' AND (name LIKE ? OR email LIKE ? OR student_id LIKE ?)';
      params.push(term, term, term);
    }

    sql += ' ORDER BY name ASC';

    const students = await db.query(sql, params);

    // Enrich each student with active loans & overdue count
    const enriched = await Promise.all(
      students.map(async (student) => {
        const loans = await circulationService.getAllRecords({ student_id: student.id });
        const active = loans.filter(l => l.status === 'issued');
        const overdue = active.filter(l => l.is_overdue);

        return {
          ...student,
          active_loans_count: active.length,
          overdue_loans_count: overdue.length,
          total_borrowed_count: loans.length
        };
      })
    );

    return enriched;
  }

  async getStudentById(id) {
    const students = await db.query(
      "SELECT id, name, email, student_id, status, created_at FROM users WHERE id = ? AND role = 'student'",
      [id]
    );

    if (students.length === 0) {
      const err = new Error('Student not found.');
      err.statusCode = 404;
      throw err;
    }

    const student = students[0];
    const allLoans = await circulationService.getAllRecords({ student_id: id });
    const activeLoans = allLoans.filter(l => l.status === 'issued');
    const overdueLoans = activeLoans.filter(l => l.is_overdue);
    const historyLoans = allLoans.filter(l => l.status === 'returned');

    return {
      student,
      summary: {
        active_loans_count: activeLoans.length,
        overdue_loans_count: overdueLoans.length,
        returned_count: historyLoans.length,
        total_history_count: allLoans.length
      },
      active_loans: activeLoans,
      history_loans: historyLoans
    };
  }

  async updateStudentStatus(id, { status }) {
    if (!['active', 'inactive'].includes(status)) {
      const err = new Error('Status must be either "active" or "inactive".');
      err.statusCode = 400;
      throw err;
    }

    const students = await db.query("SELECT id FROM users WHERE id = ? AND role = 'student'", [id]);
    if (students.length === 0) {
      const err = new Error('Student not found.');
      err.statusCode = 404;
      throw err;
    }

    await db.execute('UPDATE users SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [status, id]);
    return await this.getStudentById(id);
  }
}

module.exports = new LibrarianService();
