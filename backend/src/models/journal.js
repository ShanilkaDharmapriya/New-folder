const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: { type: String, enum: ['journal', 'gratitude'], default: 'journal' },
  content: { type: String, required: true },
  shared: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JournalEntry', journalSchema);
