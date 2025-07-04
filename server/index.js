import express, { json } from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';

config();

const app = express();
app.use(cors());
app.use(json());

// Routes
import userRoutes from './routes/userRoutes.js';
app.use('/api/users', userRoutes);

// Set PORT from environment or default to 3001
const PORT = process.env.PORT || 3001;

// Connect to MongoDB Atlas
connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 URL: http://localhost:${PORT}`);
      console.log(`📊 API: http://localhost:${PORT}/api/users`);
    });
  })
  .catch(err => console.error('❌ MongoDB conjnection error:', err));