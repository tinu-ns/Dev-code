// models/restrictLeave.js
const mongoose = require('mongoose');

const restrictLeaveSchema = new mongoose.Schema({
    title: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    department: { type: String, required: true, enum: ['Cloud team', 'Development team'] },
    jobPosition: { type: String, required: true, enum: ['Associate Engineer', 'Senior Engineer', 'Manager'] },
    description: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('RestrictLeave', restrictLeaveSchema);
