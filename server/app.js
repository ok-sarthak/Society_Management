import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import errorHandler from './middlewares/errorHandler.js';
import logger from './utils/logger.js';

// Import routes
import memberRoutes from './routes/member/index.js';
import maintenanceRoutes from './routes/maintenance/index.js';
import visitorRoutes from './routes/visitor/index.js';
import supportStaffRoutes from './routes/supportStaff/index.js';
import authRoutes from './routes/auth.js';
import accountsRoutes from './routes/accounts/index.js';
import buildingRoutes from './routes/buildings/index.js';
import eventsRoutes from './routes/events/index.js';
import complaintsRoutes from './routes/complaints/index.js';
import noticesRoutes from './routes/notices/index.js';
import healthRoutes from './routes/health/index.js';
import servicesRoutes from './routes/services/index.js';
import supportContactsRoutes from './routes/supportContacts/index.js';
import systemSecurityRoutes from './routes/systemSecurity/index.js';
import staffManagementRoutes from './routes/staffManagement/index.js';
import shoppingRoutes from './routes/shopping/index.js';
import coCurricularRoutes from './routes/coCurricular/index.js';
import reportsRoutes from './routes/reports/index.js';
import adminSettingsRoutes from './routes/adminSettings/index.js';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Logging middleware
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/support-staff', supportStaffRoutes);
app.use('/api/accounts', accountsRoutes);
app.use('/api/buildings', buildingRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/complaints', complaintsRoutes);
app.use('/api/notices', noticesRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/support-contacts', supportContactsRoutes);
app.use('/api/system-security', systemSecurityRoutes);
app.use('/api/staff-management', staffManagementRoutes);
app.use('/api/shopping', shoppingRoutes);
app.use('/api/co-curricular', coCurricularRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/admin-settings', adminSettingsRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use(errorHandler);

export default app;