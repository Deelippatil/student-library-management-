const express = require('express');
const router = express.Router();
const circulationController = require('../controllers/circulationController');
const { authenticateToken } = require('../middleware/auth');
const { requireRole } = require('../middleware/role');
const { validateBody } = require('../middleware/validation');

// All circulation actions are restricted to authenticated librarians
router.use(authenticateToken);
router.use(requireRole('librarian'));

router.post('/issue', validateBody(['book_id', 'student_id']), circulationController.issueBook);
router.post('/return', validateBody(['transaction_id']), circulationController.returnBook);
router.get('/records', circulationController.getAllRecords);
router.get('/records/:id', circulationController.getTransactionById);

module.exports = router;
