const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: String,
  description: String,
  goalAmount: Number,
  currentAmount: Number,
  createdBy: String,
});

module.exports = mongoose.model('Campaign', campaignSchema);