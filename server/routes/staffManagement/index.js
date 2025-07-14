import express from 'express';
import {
  getStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
  updateStaffPerformance,
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getAttendance,
  markAttendance,
  getAttendanceSummary,
  updateAttendance,
  getStaffDashboard
} from '../../controllers/staffManagement/staffManagementController.js';
import { authenticateToken, authorizeRoles } from '../../middlewares/auth.js';

const router = express.Router();

// Staff Routes
router.get('/staff', authenticateToken, authorizeRoles(['admin', 'hr', 'manager']), getStaff);
router.get('/staff/:id', authenticateToken, authorizeRoles(['admin', 'hr', 'manager']), getStaffById);
router.post('/staff', authenticateToken, authorizeRoles(['admin', 'hr']), createStaff);
router.put('/staff/:id', authenticateToken, authorizeRoles(['admin', 'hr']), updateStaff);
router.delete('/staff/:id', authenticateToken, authorizeRoles(['admin']), deleteStaff);
router.post('/staff/:id/performance', authenticateToken, authorizeRoles(['admin', 'hr', 'manager']), updateStaffPerformance);

// Department Routes
router.get('/departments', authenticateToken, getDepartments);
router.post('/departments', authenticateToken, authorizeRoles(['admin', 'hr']), createDepartment);
router.put('/departments/:id', authenticateToken, authorizeRoles(['admin', 'hr']), updateDepartment);
router.delete('/departments/:id', authenticateToken, authorizeRoles(['admin']), deleteDepartment);

// Attendance Routes
router.get('/attendance', authenticateToken, authorizeRoles(['admin', 'hr', 'manager']), getAttendance);
router.post('/attendance/mark', authenticateToken, markAttendance);
router.get('/attendance/summary', authenticateToken, getAttendanceSummary);
router.put('/attendance/:id', authenticateToken, authorizeRoles(['admin', 'hr']), updateAttendance);

// Dashboard Routes
router.get('/dashboard', authenticateToken, authorizeRoles(['admin', 'hr', 'manager']), getStaffDashboard);

export default router;
