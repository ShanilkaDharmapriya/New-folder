const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');

// Get schedule for a specific date
router.get('/:date', async (req, res) => {
  const { date } = req.params;
  const userId = 'user123'; // Replace with auth user ID in future

  try {
    const schedule = await Schedule.findOne({ userId, date });
    res.json(schedule || { userId, date, completedTasks: [] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch schedule' });
  }
});

// Save or update completed tasks
router.post('/:date', async (req, res) => {
  const { date } = req.params;
  const { completedTasks } = req.body;
  const userId = 'user123';

  try {
    const schedule = await Schedule.findOneAndUpdate(
      { userId, date },
      { completedTasks },
      { upsert: true, new: true }
    );
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save schedule' });
  }
});

module.exports = router;
