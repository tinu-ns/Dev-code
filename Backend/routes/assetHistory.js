// routes/assetHistory.js
const express = require('express');
const router = express.Router();
const Asset = require('../models/AssetHistory'); // Corrected import

// GET all assets
router.get('/', async (req, res) => {
  try {
    const assets = await Asset.find();
    res.json(assets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create a new asset
router.post('/', async (req, res) => {
  const { assetName, category, allottedDate, returnDate, status } = req.body;
  const asset = new Asset({ assetName, category, allottedDate, returnDate, status });
  
  try {
    const newAsset = await asset.save();
    res.status(201).json(newAsset);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update an asset
router.put('/:id', async (req, res) => {
  const { status, returnDate } = req.body;
  
  try {
    const asset = await Asset.findByIdAndUpdate(
      req.params.id,
      { status, returnDate },
      { new: true, runValidators: true }
    );

    if (!asset) return res.status(404).json({ message: 'Asset not found' });
    res.json(asset);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE an asset
router.delete('/:id', async (req, res) => {
  try {
    const asset = await Asset.findByIdAndDelete(req.params.id);
    if (!asset) return res.status(404).json({ message: 'Asset not found' });
    res.json({ message: 'Asset deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET summary data for the dashboard
router.get('/summary', async (req, res) => {
  try {
    const totalAssets = await Asset.countDocuments();
    const assetsInUse = await Asset.countDocuments({ status: "In Use" });
    const categoryData = await Asset.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);
    const statusData = await Asset.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    res.json({ totalAssets, assetsInUse, categoryData, statusData });
  } catch (error) {
    res.status(500).json({ message: "Error fetching summary data" });
  }
});

module.exports = router;
