const db = require('../config/database');
const circulationService = require('./circulationService');

class StudentService {
  async getDashboard(studentId) {
    // 1. All loans for student
    const allLoans = await circulationService.getAllRecords({ student_id: studentId });

    const activeLoans = allLoans.filter(l => l.status === 'issued');
    const overdueLoans = activeLoans.filter(l => l.is_overdue);
    const returnedLoans = allLoans.filter(l => l.status === 'returned');

    // Find next upcoming due date among active non-overdue loans
    const upcomingLoans = activeLoans
      .filter(l => !l.is_overdue)
      .sort((a, b) => new Date(a.due_date) - new Date(b.due_date));

    const nextDueDate = upcomingLoans.length > 0 ? upcomingLoans[0].due_date : null;

    return {
      active_loans_count: activeLoans.length,
      overdue_loans_count: overdueLoans.length,
      returned_loans_count: returnedLoans.length,
      total_borrowed_count: allLoans.length,
      next_due_date: nextDueDate,
      recent_loans: allLoans.slice(0, 5)
    };
  }

  async getActiveLoans(studentId) {
    const loans = await circulationService.getAllRecords({ student_id: studentId, status: 'issued' });
    return loans;
  }

  async getBorrowingHistory(studentId) {
    const loans = await circulationService.getAllRecords({ student_id: studentId });
    return loans;
  }
}

module.exports = new StudentService();
