const bookService = require('../services/bookService');

class BookController {
  async getAllBooks(req, res, next) {
    try {
      const { search, category, available_only } = req.query;
      const books = await bookService.getAllBooks({ search, category, available_only });
      return res.status(200).json({
        success: true,
        count: books.length,
        data: books
      });
    } catch (err) {
      next(err);
    }
  }

  async getBookById(req, res, next) {
    try {
      const { id } = req.params;
      const book = await bookService.getBookById(id);
      return res.status(200).json({
        success: true,
        data: book
      });
    } catch (err) {
      next(err);
    }
  }

  async addBook(req, res, next) {
    try {
      const { isbn, title, author, category, total_copies } = req.body;
      const newBook = await bookService.addBook({ isbn, title, author, category, total_copies });
      return res.status(201).json({
        success: true,
        message: 'Book added to catalog successfully.',
        data: newBook
      });
    } catch (err) {
      next(err);
    }
  }

  async updateBook(req, res, next) {
    try {
      const { id } = req.params;
      const { isbn, title, author, category, total_copies } = req.body;
      const updated = await bookService.updateBook(id, { isbn, title, author, category, total_copies });
      return res.status(200).json({
        success: true,
        message: 'Book updated successfully.',
        data: updated
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteBook(req, res, next) {
    try {
      const { id } = req.params;
      const result = await bookService.deleteBook(id);
      return res.status(200).json({
        success: true,
        message: result.message,
        data: { id: result.id, title: result.title }
      });
    } catch (err) {
      next(err);
    }
  }

  async getCategories(req, res, next) {
    try {
      const categories = await bookService.getCategories();
      return res.status(200).json({
        success: true,
        data: categories
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new BookController();
