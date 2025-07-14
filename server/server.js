import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import app from './app.js';
import logger from './utils/logger.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5002;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/society-management';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB successfully');
    console.log('✅ Connected to MongoDB');
  })
  .catch((error) => {
    logger.error('MongoDB connection error:', error);
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  });

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  logger.error('Unhandled Rejection:', error);
  process.exit(1);
});