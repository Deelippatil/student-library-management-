const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');
const { validateBody } = require('../middleware/validation');

// Student registration
router.post('/register', validateBody(['name', 'email', 'password', 'student_id']), authController.register);

// Login (Student or Librarian)
router.post('/login', validateBody(['email', 'password']), authController.login);

// Current user profile
router.get('/me', authenticateToken, authController.getCurrentUser);

module.exports = router;
