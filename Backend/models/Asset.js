const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  currentEmployee: {
    type: String,
    default: null,
  },
  previousEmployees: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

const Asset = mongoose.model('Asset', AssetSchema);

module.exports = Asset;
