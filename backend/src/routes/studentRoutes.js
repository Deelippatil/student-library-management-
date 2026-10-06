const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { authenticateToken } = require('../middleware/auth');
const { requireRole } = require('../middleware/role');

// All student routes require an authenticated user with role 'student'
router.use(authenticateToken);
router.use(requireRole('student'));

router.get('/dashboard', studentController.getDashboard);
router.get('/loans/active', studentController.getActiveLoans);
router.get('/loans/history', studentController.getBorrowingHistory);

module.exports = router;
