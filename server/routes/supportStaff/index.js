import express from 'express';
import supportStaffController from '../../controllers/supportStaff/supportStaffController.js';
import { authenticate, adminOrWatchman } from '../../middlewares/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get all support staff
router.get('/', adminOrWatchman, supportStaffController.getAllSupportStaff);

// Get support staff by ID
router.get('/:id', adminOrWatchman, supportStaffController.getSupportStaffById);

// Create new support staff
router.post('/', adminOrWatchman, supportStaffController.createSupportStaff);

// Update support staff
router.put('/:id', adminOrWatchman, supportStaffController.updateSupportStaff);

// Delete support staff
router.delete('/:id', adminOrWatchman, supportStaffController.deleteSupportStaff);

// Get support staff by role
router.get('/role/:role', adminOrWatchman, supportStaffController.getSupportStaffByRole);

// Get support staff statistics
router.get('/stats/summary', adminOrWatchman, supportStaffController.getSupportStaffStats);

// Mark attendance
router.post('/:id/attendance', adminOrWatchman, supportStaffController.markAttendance);

// Get attendance records
router.get('/:id/attendance', adminOrWatchman, supportStaffController.getAttendanceRecords);

export default router;
