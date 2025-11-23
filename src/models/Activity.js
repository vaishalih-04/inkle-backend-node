const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    actor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: [
        'POST_CREATED',
        'POST_DELETED',
        'FOLLOWED_USER',
        'LIKED_POST',
        'USER_DELETED',
      ],
      required: true,
    },
    targetUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    targetPost: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Activity', activitySchema);
