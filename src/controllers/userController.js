const User = require('../models/User');
const Activity = require('../models/Activity');

const getUsers = async (req, res) => {
  const users = await User.find({ isDeleted: false }).select('-password');
  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user || user.isDeleted) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user || user.isDeleted) return res.status(404).json({ message: 'User not found' });

  user.isDeleted = true;
  await user.save();

  await Activity.create({
    actor: req.user._id,
    type: 'USER_DELETED',
    targetUser: user._id,
    description: `${req.user.name} deleted user ${user.name}`,
  });

  res.json({ message: 'User deleted' });
};

const updateUserRole = async (req, res) => {
  const { role } = req.body;
  if (!['USER', 'ADMIN'].includes(role)) {
    return res.status(400).json({ message: 'Role must be USER or ADMIN' });
  }

  const user = await User.findById(req.params.id);
  if (!user || user.isDeleted) return res.status(404).json({ message: 'User not found' });

  if (user.role === 'OWNER') {
    return res.status(400).json({ message: 'Cannot change OWNER role' });
  }

  user.role = role;
  await user.save();

  res.json({ message: 'Role updated', user });
};

module.exports = { getUsers, getUserById, deleteUser, updateUserRole };
