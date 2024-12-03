const mongoose = require('mongoose');

const AssetHistorySchema = new mongoose.Schema({
  assetName: { type: String, required: true },
  category: { type: String, required: true },
  allottedDate: { type: Date, required: true },
  returnDate: { type: Date },
  status: { 
    type: String, 
    enum: ['In Use', 'Returned', 'Under Service', 'Available'], 
    required: true 
  },
});

module.exports = mongoose.model('AssetHistory', AssetHistorySchema);
