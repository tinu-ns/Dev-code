const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware
app.use(express.json());

const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions)); 

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process on database connection error
  });

// Import routes
const assetRoutes = require('./routes/assets');
const assetBatchRoutes = require('./routes/assetBatchRoutes');
const assetHistoryRoutes = require('./routes/assetHistory'); // Ensure the file path is correct
const assetDashboardRoutes = require('./routes/assetDashboardRoutes');
const holidayRoutes = require('./routes/holidays');
const companyHolidaysRoute = require('./routes/companyHolidays');
const restrictLeaveRoutes = require('./routes/restrictLeaveRoutes');
const faqRoutes = require('./routes/faqRoutes');
const faqCategoryRoutes = require('./routes/faqCategoryRoutes');

// Use the routes
app.use('/api/assets', assetRoutes);
app.use('/api/asset-batches', assetBatchRoutes);
app.use('/api/assetHistory', assetHistoryRoutes); 
app.use('/api/dashboard', assetDashboardRoutes);
app.use('/api/holidays', holidayRoutes);
app.use('/api/companyHolidays', companyHolidaysRoute);
app.use('/api/restrictLeaves', restrictLeaveRoutes);
app.use('/api/faqRoutes', faqRoutes);
app.use('/api/faqCategories', faqCategoryRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Asset Management API is running');
});

// Global error handling middleware for better error management
app.use((err, req, res, next) => {
  console.error('Global Error:', err.message);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
