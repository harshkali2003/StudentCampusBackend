const mongoose = require('mongoose');

let commentData = new mongoose.Schema({
  postId: {
    type: String, 
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('comment', commentData);
