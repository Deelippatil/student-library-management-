const librarianService = require('../services/librarianService');

class LibrarianController {
  async getDashboard(req, res, next) {
    try {
      const data = await librarianService.getDashboard();
      return res.status(200).json({
        success: true,
        data
      });
    } catch (err) {
      next(err);
    }
  }

  async getAllStudents(req, res, next) {
    try {
      const { search } = req.query;
      const students = await librarianService.getAllStudents({ search });
      return res.status(200).json({
        success: true,
        count: students.length,
        data: students
      });
    } catch (err) {
      next(err);
    }
  }

  async getStudentById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await librarianService.getStudentById(id);
      return res.status(200).json({
        success: true,
        data
      });
    } catch (err) {
      next(err);
    }
  }

  async updateStudentStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updated = await librarianService.updateStudentStatus(id, { status });
      return res.status(200).json({
        success: true,
        message: `Student status updated to '${status}'.`,
        data: updated
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new LibrarianController();
