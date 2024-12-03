const express = require('express');
const router = express.Router();
const Faq = require('../models/Faq');
const FaqCategory = require('../models/FaqCategory');

// Get all categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await FaqCategory.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new category
router.post('/categories', async (req, res) => {
    try {
        const newCategory = new FaqCategory({
            name: req.body.name,
            description: req.body.description,
        });
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get FAQs by category
router.get('/faqs/category/:categoryId', async (req, res) => {
    try {
        const faqs = await Faq.find({ category: req.params.categoryId });
        res.json(faqs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new FAQ to a category
router.post('/faqs/category/:categoryId', async (req, res) => {
    try {
        const newFaq = new Faq({
            category: req.params.categoryId,
            question: req.body.question,
            answer: req.body.answer
        });
        const savedFaq = await newFaq.save();
        res.status(201).json(savedFaq);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update an FAQ
router.put('/faqs/:id', async (req, res) => {
    try {
        const updatedFaq = await Faq.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedFaq);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an FAQ
router.delete('/faqs/:id', async (req, res) => {
    try {
        await Faq.findByIdAndDelete(req.params.id);
        res.json({ message: 'FAQ deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
