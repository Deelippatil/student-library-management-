const circulationService = require('../services/circulationService');

class CirculationController {
  async issueBook(req, res, next) {
    try {
      const { book_id, student_id, due_date, notes } = req.body;
      const librarian_id = req.user.id;

      const record = await circulationService.issueBook({
        book_id,
        student_id,
        librarian_id,
        due_date,
        notes
      });

      return res.status(201).json({
        success: true,
        message: 'Book issued successfully.',
        data: record
      });
    } catch (err) {
      next(err);
    }
  }

  async returnBook(req, res, next) {
    try {
      const { transaction_id, return_notes } = req.body;
      const record = await circulationService.returnBook({
        transaction_id,
        return_notes
      });

      return res.status(200).json({
        success: true,
        message: 'Book returned successfully and stock updated.',
        data: record
      });
    } catch (err) {
      next(err);
    }
  }

  async getAllRecords(req, res, next) {
    try {
      const { search, status, book_id, student_id } = req.query;
      const records = await circulationService.getAllRecords({ search, status, book_id, student_id });
      return res.status(200).json({
        success: true,
        count: records.length,
        data: records
      });
    } catch (err) {
      next(err);
    }
  }

  async getTransactionById(req, res, next) {
    try {
      const { id } = req.params;
      const record = await circulationService.getTransactionById(id);
      if (!record) {
        return res.status(404).json({
          success: false,
          message: 'Transaction not found.'
        });
      }
      return res.status(200).json({
        success: true,
        data: record
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new CirculationController();
