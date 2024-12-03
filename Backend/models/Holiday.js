const mongoose = require('mongoose');

const holidaySchema = new mongoose.Schema({
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    recurring: { type: Boolean, default: false }
});

const Holiday = mongoose.model('Holiday', holidaySchema);

module.exports = Holiday;
