const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { authenticateToken } = require('../middleware/auth');
const { requireRole } = require('../middleware/role');
const { validateBody } = require('../middleware/validation');

// Public or Authenticated catalog search
router.get('/', bookController.getAllBooks);
router.get('/categories', bookController.getCategories);
router.get('/:id', bookController.getBookById);

// Librarian only endpoints
router.post(
  '/',
  authenticateToken,
  requireRole('librarian'),
  validateBody(['isbn', 'title', 'author', 'category', 'total_copies']),
  bookController.addBook
);

router.put(
  '/:id',
  authenticateToken,
  requireRole('librarian'),
  bookController.updateBook
);

router.delete(
  '/:id',
  authenticateToken,
  requireRole('librarian'),
  bookController.deleteBook
);

module.exports = router;
