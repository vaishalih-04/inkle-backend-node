const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { blockUser, unblockUser } = require('../controllers/blockController');

router.post('/:id', protect, blockUser);
router.delete('/:id', protect, unblockUser);

module.exports = router;
