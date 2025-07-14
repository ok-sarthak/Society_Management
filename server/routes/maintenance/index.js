import express from 'express';
import maintenanceController from '../../controllers/maintenance/maintenanceController.js';
import maintenanceRequestRoutes from './requests.js';
import { authenticate, adminOrWatchman } from '../../middlewares/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Include maintenance request routes
router.use('/', maintenanceRequestRoutes);

// Get all maintenance records
router.get('/', adminOrWatchman, maintenanceController.getAllMaintenance);

// Get maintenance by ID
router.get('/:id', adminOrWatchman, maintenanceController.getMaintenanceById);

// Create new maintenance record
router.post('/', adminOrWatchman, maintenanceController.createMaintenance);

// Update maintenance record
router.put('/:id', adminOrWatchman, maintenanceController.updateMaintenance);

// Pay maintenance
router.put('/:id/pay', adminOrWatchman, maintenanceController.payMaintenance);

// Get maintenance by member
router.get('/member/:memberId', adminOrWatchman, maintenanceController.getMaintenanceByMember);

// Get overdue maintenance
router.get('/status/overdue', adminOrWatchman, maintenanceController.getOverdueMaintenance);

// Get maintenance statistics
router.get('/stats/summary', adminOrWatchman, maintenanceController.getMaintenanceStats);

// Generate maintenance for all members
router.post('/generate/:month', adminOrWatchman, maintenanceController.generateMaintenanceForAll);

// Send payment reminders
router.post('/send-reminders', adminOrWatchman, maintenanceController.sendPaymentReminders);

export default router;
