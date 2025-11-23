const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const {
  getUsers,
  getUserById,
  deleteUser,
  updateUserRole,
} = require('../controllers/userController');

router.get('/', protect, authorizeRoles('ADMIN', 'OWNER'), getUsers);
router.get('/:id', protect, getUserById);
router.delete('/:id', protect, authorizeRoles('ADMIN', 'OWNER'), deleteUser);
router.patch('/:id/role', protect, authorizeRoles('OWNER'), updateUserRole);

module.exports = router;
