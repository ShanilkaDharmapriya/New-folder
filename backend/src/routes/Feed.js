const express = require('express');
const router = express.Router();
const SupportPost = require('../models/SupportPost')

// Create a new post
router.post('/', async (req, res) => {
  const { userId, message } = req.body;
  try {
    const newPost = new SupportPost({ userId, message });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Get all posts (latest first)
router.get('/', async (req, res) => {
  try {
    const posts = await SupportPost.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Add a comment to a post
router.post('/:postId/comment', async (req, res) => {
  const { postId } = req.params;
  const { userId, comment } = req.body;
  try {
    const post = await SupportPost.findById(postId);
    post.comments.push({ userId, comment });
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

module.exports = router;
