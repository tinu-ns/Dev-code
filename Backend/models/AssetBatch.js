const mongoose = require('mongoose');

const assetBatchSchema = new mongoose.Schema({
  batchNumber: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  numberOfAssets: { type: Number, required: true }
});

module.exports = mongoose.model('AssetBatch', assetBatchSchema);
