const Post = require('../models/Post');
const Like = require('../models/Like');
const Activity = require('../models/Activity');
const Block = require('../models/Block');

const createPost = async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ message: 'Content required' });

  const post = await Post.create({ author: req.user._id, content });

  await Activity.create({
    actor: req.user._id,
    type: 'POST_CREATED',
    targetPost: post._id,
    description: `${req.user.name} created a post`,
  });

  res.status(201).json(post);
};

const getPosts = async (req, res) => {
  const blocks = await Block.find({
    $or: [{ blocker: req.user._id }, { blocked: req.user._id }],
  });

  const blockedIds = new Set();
  blocks.forEach((b) => {
    blockedIds.add(String(b.blocker));
    blockedIds.add(String(b.blocked));
  });

  const posts = await Post.find({ isDeleted: false })
    .populate('author', 'name')
    .sort({ createdAt: -1 });

  const visible = posts.filter(
    (p) => !blockedIds.has(String(p.author._id))
  );

  res.json(visible);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate('author');

  if (!post) return res.status(404).json({ message: 'Post not found' });

  const isOwner = String(post.author._id) === String(req.user._id);
  const isAdminOrOwner = ['ADMIN', 'OWNER'].includes(req.user.role);

  if (!isOwner && !isAdminOrOwner) {
    return res.status(403).json({ message: 'Not authorized to delete post' });
  }

  post.isDeleted = true;
  await post.save();

  await Activity.create({
    actor: req.user._id,
    type: 'POST_DELETED',
    targetPost: post._id,
    targetUser: post.author._id,
    description: `${req.user.name} deleted a post by ${post.author.name}`,
  });

  res.json({ message: 'Post deleted' });
};

const likePost = async (req, res) => {
  const { id } = req.params;

  const existing = await Like.findOne({ user: req.user._id, post: id });
  if (existing) return res.status(400).json({ message: 'Already liked' });

  const like = await Like.create({ user: req.user._id, post: id });

  await Activity.create({
    actor: req.user._id,
    type: 'LIKED_POST',
    targetPost: id,
    description: `${req.user.name} liked a post`,
  });

  res.status(201).json(like);
};

const unlikePost = async (req, res) => {
  const { id } = req.params;
  await Like.findOneAndDelete({ user: req.user._id, post: id });
  res.json({ message: 'Unliked' });
};

module.exports = { createPost, getPosts, deletePost, likePost, unlikePost };
