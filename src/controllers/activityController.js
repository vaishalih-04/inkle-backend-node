const Activity = require('../models/Activity');
const Block = require('../models/Block');

const getActivityFeed = async (req, res) => {
  const blocks = await Block.find({
    $or: [{ blocker: req.user._id }, { blocked: req.user._id }],
  });

  const blockedIds = new Set();
  blocks.forEach((b) => {
    blockedIds.add(String(b.blocker));
    blockedIds.add(String(b.blocked));
  });

  const activities = await Activity.find({})
    .sort({ createdAt: -1 })
    .populate('actor', 'name')
    .populate('targetUser', 'name')
    .populate('targetPost');

  const visible = activities.filter((a) => !blockedIds.has(String(a.actor?._id || '')));

  const formatted = visible.map((a) => ({
    id: a._id,
    type: a.type,
    description:
      a.description ||
      `${a.actor?.name || 'Someone'} did ${a.type}`,
    createdAt: a.createdAt,
  }));

  res.json(formatted);
};

module.exports = { getActivityFeed };
