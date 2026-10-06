const studentService = require('../services/studentService');

class StudentController {
  async getDashboard(req, res, next) {
    try {
      const studentId = req.user.id;
      const data = await studentService.getDashboard(studentId);
      return res.status(200).json({
        success: true,
        data
      });
    } catch (err) {
      next(err);
    }
  }

  async getActiveLoans(req, res, next) {
    try {
      const studentId = req.user.id;
      const loans = await studentService.getActiveLoans(studentId);
      return res.status(200).json({
        success: true,
        count: loans.length,
        data: loans
      });
    } catch (err) {
      next(err);
    }
  }

  async getBorrowingHistory(req, res, next) {
    try {
      const studentId = req.user.id;
      const history = await studentService.getBorrowingHistory(studentId);
      return res.status(200).json({
        success: true,
        count: history.length,
        data: history
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new StudentController();
