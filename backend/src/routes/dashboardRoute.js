const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Schedule = require('../models/Schedule');
const SupportPost = require('../models/SupportPost');

// GET /api/dashboard/user
router.get('/user', authMiddleware(), async (req, res) => {
  const userId = req.user.id;
  const today = new Date().toISOString().split('T')[0];

  try {
    const schedule = await Schedule.findOne({ userId, date: today });
    const completedTasks = schedule?.completedTasks.length || 0;
    const totalTasks = 15;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const communityPostsToday = await SupportPost.countDocuments({
      createdAt: { $gte: startOfDay, $lte: endOfDay }
    });

    res.json({
      userName: 'Friend', // Replace with real user later
      completedToday: completedTasks,
      totalTasks,
      communityPostsToday,
      tipOfTheDay: 'Drink a glass of water every 2 hours 💧',
      quote: 'You are doing enough. Be proud of yourself.'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load dashboard data' });
  }
});

module.exports = router;
