const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Schedule = require('../models/Schedule');
const Journal = require('../models/Journal');
const SupportPost = require('../models/SupportPost');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/admin/users
router.get('/users', authMiddleware('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// GET /api/admin/activity
router.get('/activity', authMiddleware('admin'), async (req, res) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);

  try {
    const postsToday = await SupportPost.countDocuments({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    const journalsToday = await Journal.countDocuments({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    const routinesToday = await Schedule.countDocuments({
      date: new Date().toISOString().split('T')[0]  // match today
    });

    const loginsLast24h = await User.countDocuments({
      updatedAt: { $gte: last24h } // assumes login updates user.updatedAt
    });

    res.json({
      postsToday,
      journalsToday,
      routinesToday,
      loginsLast24h,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load activity analytics' });
  }
});

router.get('/posts', authMiddleware('admin'), async (req, res) => {
    const { date } = req.query;
    const filter = {};
  
    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      filter.createdAt = { $gte: start, $lte: end };
    }
  
    try {
      const posts = await SupportPost.find(filter).sort({ createdAt: -1 });
      res.json(posts);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch support posts' });
    }
  });
  
  // ✅ Route: Delete a support post
  router.delete('/posts/:id', authMiddleware('admin'), async (req, res) => {
    try {
      await SupportPost.findByIdAndDelete(req.params.id);
      res.json({ message: 'Post deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete post' });
    }
  });

  module.exports = router;