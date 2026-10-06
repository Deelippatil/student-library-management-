const express = require('express');
const router = express.Router();
const librarianController = require('../controllers/librarianController');
const { authenticateToken } = require('../middleware/auth');
const { requireRole } = require('../middleware/role');

// All librarian routes require an authenticated user with role 'librarian'
router.use(authenticateToken);
router.use(requireRole('librarian'));

router.get('/dashboard', librarianController.getDashboard);
router.get('/students', librarianController.getAllStudents);
router.get('/students/:id', librarianController.getStudentById);
router.put('/students/:id/status', librarianController.updateStudentStatus);

module.exports = router;
