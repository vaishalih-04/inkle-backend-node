const Follow = require('../models/Follow');
const Activity = require('../models/Activity');

const followUser = async (req, res) => {
  const targetId = req.params.id;
  if (String(targetId) === String(req.user._id)) {
    return res.status(400).json({ message: 'Cannot follow yourself' });
  }

  const existing = await Follow.findOne({ follower: req.user._id, following: targetId });
  if (existing) return res.status(400).json({ message: 'Already following' });

  const follow = await Follow.create({ follower: req.user._id, following: targetId });

  await Activity.create({
    actor: req.user._id,
    type: 'FOLLOWED_USER',
    targetUser: targetId,
    description: `${req.user.name} followed a user`,
  });

  res.status(201).json(follow);
};

const unfollowUser = async (req, res) => {
  const targetId = req.params.id;
  await Follow.findOneAndDelete({ follower: req.user._id, following: targetId });
  res.json({ message: 'Unfollowed' });
};

module.exports = { followUser, unfollowUser };
