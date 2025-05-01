const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
  },
  donor: String,
  amount: Number,
});

module.exports = mongoose.model('Donation', donationSchema);