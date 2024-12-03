// models/CompanyHoliday.js
const mongoose = require('mongoose');

const companyHolidaySchema = new mongoose.Schema({
    week: {
        type: String,
        required: true,
        enum: ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'All Weeks']
    },
    day: {
        type: String,
        required: true,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }
});

module.exports = mongoose.model('CompanyHoliday', companyHolidaySchema);
