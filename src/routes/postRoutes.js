const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createPost,
  getPosts,
  deletePost,
  likePost,
  unlikePost,
} = require('../controllers/postController');

router.route('/').post(protect, createPost).get(protect, getPosts);
router.route('/:id').delete(protect, deletePost);
router.post('/:id/like', protect, likePost);
router.delete('/:id/like', protect, unlikePost);

module.exports = router;
