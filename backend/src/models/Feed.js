const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: String,
  comment: String,
  createdAt: { type: Date, default: Date.now },
});

const supportPostSchema = new mongoose.Schema({
  userId: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
  comments: [commentSchema],
});

module.exports = mongoose.model('SupportPost', supportPostSchema);
