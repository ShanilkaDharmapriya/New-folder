const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: String, required: true }, 
  completedTasks: [String],
});

scheduleSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Schedule', scheduleSchema);
