const Block = require('../models/Block');

const blockUser = async (req, res) => {
  const targetId = req.params.id;
  if (String(targetId) === String(req.user._id)) {
    return res.status(400).json({ message: 'Cannot block yourself' });
  }

  const existing = await Block.findOne({ blocker: req.user._id, blocked: targetId });
  if (existing) return res.status(400).json({ message: 'Already blocked' });

  const block = await Block.create({ blocker: req.user._id, blocked: targetId });

  res.status(201).json(block);
};

const unblockUser = async (req, res) => {
  const targetId = req.params.id;
  await Block.findOneAndDelete({ blocker: req.user._id, blocked: targetId });
  res.json({ message: 'Unblocked' });
};

module.exports = { blockUser, unblockUser };
