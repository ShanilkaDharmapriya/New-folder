const express = require('express');
const router = express.Router();
const JournalEntry = require('../models/Journal');

// Create new journal or gratitude entry
router.post('/', async (req, res) => {
  try {
    const newEntry = new JournalEntry(req.body);
    const saved = await newEntry.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all entries for a user
router.get('/:userId', async (req, res) => {
  try {
    const entries = await JournalEntry.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router
