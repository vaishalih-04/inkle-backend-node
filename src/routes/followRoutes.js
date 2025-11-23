const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { followUser, unfollowUser } = require('../controllers/followController');

router.post('/:id', protect, followUser);
router.delete('/:id', protect, unfollowUser);

module.exports = router;
