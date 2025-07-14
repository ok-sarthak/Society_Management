import express from 'express';
import {
  getSecurityLogs,
  createSecurityLog,
  getSecurityLogById,
  getSecurityDashboard,
  clearOldLogs,
  getSystemSettings,
  updateSystemSetting,
  createSystemSetting,
  deleteSystemSetting,
  getSettingHistory,
  resetSystemSetting,
  getSystemStatus
} from '../../controllers/systemSecurity/systemSecurityController.js';
import { authenticateToken, authorizeRoles } from '../../middlewares/auth.js';

const router = express.Router();

// Security Logs Routes
router.get('/logs', authenticateToken, authorizeRoles(['admin', 'security']), getSecurityLogs);
router.post('/logs', authenticateToken, createSecurityLog);
router.get('/logs/:id', authenticateToken, authorizeRoles(['admin', 'security']), getSecurityLogById);
router.get('/dashboard/security', authenticateToken, authorizeRoles(['admin', 'security']), getSecurityDashboard);
router.delete('/logs/cleanup', authenticateToken, authorizeRoles(['admin']), clearOldLogs);

// System Settings Routes
router.get('/settings', authenticateToken, authorizeRoles(['admin']), getSystemSettings);
router.post('/settings', authenticateToken, authorizeRoles(['admin']), createSystemSetting);
router.put('/settings/:id', authenticateToken, authorizeRoles(['admin']), updateSystemSetting);
router.delete('/settings/:id', authenticateToken, authorizeRoles(['admin']), deleteSystemSetting);
router.get('/settings/:id/history', authenticateToken, authorizeRoles(['admin']), getSettingHistory);
router.put('/settings/:id/reset', authenticateToken, authorizeRoles(['admin']), resetSystemSetting);

// System Status Routes
router.get('/status', authenticateToken, authorizeRoles(['admin', 'manager']), getSystemStatus);

export default router;
