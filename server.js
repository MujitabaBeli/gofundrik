const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Campaign = require('./models/Campaign');
const Donation = require('./models/Donation');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/api/campaigns', async (req, res) => {
  const campaigns = await Campaign.find({});
  res.json(campaigns);
});

app.post('/api/campaigns', async (req, res) => {
  const { title, description, goalAmount, createdBy } = req.body;
  const existingDonation = await Donation.findOne({ donor: createdBy });
  if (!existingDonation) {
    return res.status(403).json({ message: 'Donate first to create a campaign' });
  }
  const newCampaign = new Campaign({ title, description, goalAmount, currentAmount: 0, createdBy });
  await newCampaign.save();
  res.json(newCampaign);
});

app.post('/api/donations', async (req, res) => {
  const { campaignId, donor, amount } = req.body;
  const campaign = await Campaign.findById(campaignId);
  if (!campaign) return res.status(404).json({ message: 'Campaign not found' });

  const donation = new Donation({ campaignId, donor, amount });
  await donation.save();

  campaign.currentAmount += amount;
  await campaign.save();

  res.json({ message: 'Donation successful' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});