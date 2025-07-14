import express from 'express';
import {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
  enrollParticipant,
  updateParticipantStatus,
  markAttendance,
  addFeedback,
  getActivityStats,
  getCoCurricularDashboard
} from '../../controllers/coCurricular/coCurricularController.js';
import { authenticateToken, authorizeRoles } from '../../middlewares/auth.js';

const router = express.Router();

// Activity Routes
router.get('/activities', authenticateToken, getActivities);
router.get('/activities/:id', authenticateToken, getActivityById);
router.post('/activities', authenticateToken, authorizeRoles(['admin', 'manager', 'instructor']), createActivity);
router.put('/activities/:id', authenticateToken, authorizeRoles(['admin', 'manager', 'instructor']), updateActivity);
router.delete('/activities/:id', authenticateToken, authorizeRoles(['admin']), deleteActivity);

// Enrollment Routes
router.post('/activities/:id/enroll', authenticateToken, enrollParticipant);
router.put('/activities/:id/participants/:participantId', authenticateToken, authorizeRoles(['admin', 'manager', 'instructor']), updateParticipantStatus);

// Attendance Routes
router.post('/activities/:id/attendance', authenticateToken, authorizeRoles(['admin', 'manager', 'instructor']), markAttendance);

// Feedback Routes
router.post('/activities/:id/feedback', authenticateToken, addFeedback);

// Statistics Routes
router.get('/activities/:id/stats', authenticateToken, authorizeRoles(['admin', 'manager', 'instructor']), getActivityStats);

// Dashboard Routes
router.get('/dashboard', authenticateToken, authorizeRoles(['admin', 'manager']), getCoCurricularDashboard);

export default router;
